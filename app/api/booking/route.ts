import { NextResponse } from 'next/server';
import { DEPTS, HMOS } from '@/lib/data';

export const runtime = 'nodejs';

const str = (v: unknown, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  if (!b || typeof b !== 'object') return NextResponse.json({ error: 'Invalid request' }, { status: 400 });

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

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from, to: to.split(',').map(s => s.trim()).filter(Boolean),
      subject: `Appointment request ${ref}: ${clinic!.name}, ${d.day}`,
      html, text, ...(d.email ? { reply_to: d.email } : {}),
    }),
  }).catch(() => null);
  if (!r || !r.ok) {
    console.error('[booking] email send failed', r?.status);
    return NextResponse.json({ error: 'Could not send' }, { status: 502 });
  }
  console.log('[booking] sent', ref);
  return NextResponse.json({ ref });
}
