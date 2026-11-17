import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { DEPTS, HMOS } from '@/lib/data';

export const runtime = 'nodejs';

const str = (v: unknown, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

// Best-effort per-instance limiter. On serverless each instance has its own memory, so this slows
// casual abuse only; use a shared store (e.g. Upstash/Vercel KV) or Vercel's firewall for a hard limit.
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60_000, MAX = 5;
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(t => now - t < WINDOW);
  recent.push(now); hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some(t => now - t < WINDOW)) hits.delete(k);
  return recent.length > MAX;
}

export async function POST(req: Request) {
  const origin = req.headers.get('origin');
  if (origin && origin !== new URL(req.url).origin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const ip = (req.headers.get('x-forwarded-for') ?? 'unknown').split(',')[0].trim();
  if (limited(ip)) return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: { 'Retry-After': '600' } });

  const b = await req.json().catch(() => null);
  if (!b || typeof b !== 'object') return NextResponse.json({ error: 'Invalid request' }, { status: 400 });

  // Bots submit instantly. Pretend success so they do not retry; send nothing.
  if (!(Number(b.elapsedMs) >= 4000)) {
    return NextResponse.json({ ref: 'RZ-' + Math.floor(10000 + Math.random() * 89999) });
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (secret) {
    const token = str(b.turnstileToken, 2048);
    const v = token ? await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ secret, response: token, remoteip: ip }),
    }).then(r => r.json() as Promise<{ success?: boolean }>).catch(() => null) : null;
    if (!v?.success) return NextResponse.json({ error: 'Captcha failed' }, { status: 403 });
  } else {
    console.warn('[booking] TURNSTILE_SECRET_KEY is not set: captcha check skipped');
  }

  const d = {
    clinic: str(b.clinic, 40), patient: str(b.patient, 40), day: str(b.day, 40), slot: str(b.slot, 20),
    first: str(b.first, 80), last: str(b.last, 80), phone: str(b.phone, 30), email: str(b.email, 120), dob: str(b.dob, 20),
    pay: str(b.pay, 20), hmo: str(b.hmo, 40), hmoId: str(b.hmoId, 60), reason: str(b.reason, 1000), notEmerg: b.notEmerg === true,
  };
  const clinic = DEPTS.find(x => x.id === d.clinic);
  const bad =
    !clinic || !d.day || !['Morning', 'Afternoon'].includes(d.slot) || d.first.length < 2 || d.last.length < 2 ||
    !/^(0[789][01]\d{8}|234[789][01]\d{8})$/.test(d.phone.replace(/\D/g, '')) ||
    (d.email && !/^\S+@\S+\.\S+$/.test(d.email)) || !d.dob || !['HMO', 'Self-pay'].includes(d.pay) ||
    (d.pay === 'HMO' && (!HMOS.includes(d.hmo) || d.hmoId.length < 4)) || d.reason.length < 5 || !d.notEmerg;
  if (bad) return NextResponse.json({ error: 'Invalid request' }, { status: 400 });

  const key = process.env.RESEND_API_KEY, to = process.env.BOOKING_TO_EMAIL, from = process.env.BOOKING_FROM_EMAIL;
  if (!key || !to || !from) {
    console.error('[booking] RESEND_API_KEY, BOOKING_TO_EMAIL or BOOKING_FROM_EMAIL is not set');
    return NextResponse.json({ error: 'Booking email is not configured' }, { status: 503 });
  }

  const ref = 'RZ-' + Math.floor(10000 + Math.random() * 89999);
  const rows: [string, string][] = [
    ['Reference', ref], ['Clinic', clinic!.name], ['Preferred time', `${d.day}, ${d.slot.toLowerCase()}`], ['Patient type', d.patient],
    ['Name', `${d.first} ${d.last}`], ['Phone', d.phone], ['Email', d.email || 'Not given'], ['Date of birth', d.dob],
    ['Payment', d.pay === 'HMO' ? `HMO: ${d.hmo}, enrollee ID ${d.hmoId}` : 'Self-pay'], ['Reason', d.reason],
  ];
  const html = `<h2>New appointment request ${esc(ref)}</h2><table cellpadding="6">${rows.map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v)}</td></tr>`).join('')}</table><p>Call the patient to agree an exact time.</p>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');

  const resend = new Resend(key);
  const { data, error } = await resend.emails.send(
    {
      from, to: to.split(',').map(s => s.trim()).filter(Boolean),
      subject: `Appointment request ${ref}: ${clinic!.name}, ${d.day}`,
      html, text, ...(d.email ? { replyTo: d.email } : {}),
    },
    { idempotencyKey: `booking/${ref}` },
  ).catch(e => ({ data: null, error: { name: 'network', message: String(e?.message ?? e) } }));
  if (error) {
    console.error('[booking] email send failed', error.name);
    return NextResponse.json({ error: 'Could not send' }, { status: 502 });
  }
  console.log('[booking] sent', ref, 'email id', data?.id);
  return NextResponse.json({ ref });
}
