'use client';
import { createContext, useContext, useState, useMemo } from 'react';
import { DEPTS, HMOS, RED, PUR } from '@/lib/data';

const Ctx = createContext<{ openBook: (clinic?: string) => void }>({ openBook: () => {} });
export const useBooking = () => useContext(Ctx);

type Bk = { clinic: string; patient: string; day: string; slot: string; first: string; last: string; phone: string; email: string; dob: string; pay: string; hmo: string; hmoId: string; reason: string; notEmerg: boolean };
const empty = (clinic = ''): Bk => ({ clinic, patient: 'New patient', day: '', slot: '', first: '', last: '', phone: '', email: '', dob: '', pay: '', hmo: '', hmoId: '', reason: '', notEmerg: false });
const STEPS = ['Clinic & time', 'Your details', 'Payment & reason', 'Review'];
type Errs = Partial<Record<keyof Bk, string>>;

function validate(step: number, d: Bk): Errs {
  const e: Errs = {};
  if (step === 1) { if (!d.clinic) e.clinic = 'Choose a clinic.'; if (!d.day) e.day = 'Choose a day.'; if (!d.slot) e.slot = 'Choose morning or afternoon.'; }
  if (step === 2) {
    if (d.first.trim().length < 2) e.first = 'Enter a first name.';
    if (d.last.trim().length < 2) e.last = 'Enter a surname.';
    if (!/^(0[789][01]\d{8}|234[789][01]\d{8})$/.test(d.phone.replace(/\D/g, ''))) e.phone = 'Enter an 11-digit Nigerian number, e.g. 0803 123 4567.';
    if (d.email && !/^\S+@\S+\.\S+$/.test(d.email)) e.email = 'Check the email address.';
    if (!d.dob) e.dob = 'Enter a date of birth.';
  }
  if (step === 3) {
    if (!d.pay) e.pay = 'Choose how you will pay.';
    if (d.pay === 'HMO') { if (!d.hmo) e.hmo = 'Choose your HMO.'; if (d.hmoId.trim().length < 4) e.hmoId = 'Enter your enrollee ID.'; }
    if (d.reason.trim().length < 5) e.reason = 'Tell us briefly why you are coming in.';
    if (!d.notEmerg) e.notEmerg = 'Please confirm this is not an emergency.';
  }
  return e;
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [d, setD] = useState<Bk>(empty());
  const [err, setErr] = useState<Errs>({});
  const [ref, setRef] = useState('');
  const [busy, setBusy] = useState(false);
  const [sendErr, setSendErr] = useState('');

  const openBook = (clinic = '') => { setD(empty(clinic)); setStep(1); setErr({}); setRef(''); setSendErr(''); setOpen(true); };
  const set = <K extends keyof Bk>(k: K, v: Bk[K]) => { setD(p => ({ ...p, [k]: v })); setErr(p => ({ ...p, [k]: undefined })); };
  const days = useMemo(() => {
    const out: string[] = []; const dt = new Date();
    while (out.length < 6) { dt.setDate(dt.getDate() + 1); if (dt.getDay() !== 0) out.push(dt.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })); }
    return out;
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const next = async () => {
    const e = validate(step, d);
    if (Object.keys(e).length) { setErr(e); return; }
    if (step < 4) { setStep(step + 1); return; }
    setBusy(true); setSendErr('');
    try {
      const r = await fetch('/api/booking', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) });
      if (!r.ok) throw new Error();
      setRef((await r.json()).ref); setStep(5);
    } catch { setSendErr('Could not send your request. Please try again, or call us.'); }
    setBusy(false);
  };

  const clinic = DEPTS.find(x => x.id === d.clinic);
  const chip = (on: boolean, c = '') => `chip ${on ? 'on ' + c : ''}`;
  const F = ({ k, label, type = 'text', ph, ac }: { k: keyof Bk & string; label: string; type?: string; ph?: string; ac?: string }) => (
    <label className={`field ${err[k] ? 'bad' : ''}`}>{label}
      <input type={type} placeholder={ph} autoComplete={ac} value={d[k] as string} onChange={e => set(k, e.target.value as never)} />
      {err[k] && <span className="err">{err[k]}</span>}
    </label>
  );
  const Err = ({ k }: { k: keyof Bk }) => err[k] ? <div className="err" style={{ marginTop: 8 }}>{err[k]}</div> : null;
  const lbl = (t: string, first = false) => <div style={{ fontSize: 15, fontWeight: 600, margin: first ? '0 0 10px' : '22px 0 10px' }}>{t}</div>;
  const review: [string, string, number][] = [
    ['Clinic', clinic?.name ?? '', 1], ['When', `${d.day}, ${d.slot.toLowerCase()}`, 1], ['Patient', `${d.first} ${d.last} · ${d.patient.toLowerCase()}`, 2],
    ['Phone', d.phone, 2], ['Email', d.email || 'Not given', 2], ['Date of birth', d.dob, 2],
    ['Payment', d.pay === 'HMO' ? `${d.hmo} · ${d.hmoId}` : d.pay, 3], ['Reason', d.reason, 3],
  ];

  return (
    <Ctx.Provider value={{ openBook }}>
      {children}
      {open && (
        <div role="dialog" aria-modal="true" aria-label="Book an appointment" style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(14,23,48,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(0px,3vw,40px)' }}>
          <div style={{ background: '#fff', width: '100%', maxWidth: 680, maxHeight: '100%', height: 'auto', borderRadius: 14, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,.25)' }} className="bk-modal">
            <style>{`@media(max-width:600px){.bk-modal{height:100%!important;border-radius:0!important}}`}</style>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #ECE6DA', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <div><div className="serif" style={{ fontSize: 22 }}>Book an appointment</div>
                {step < 5 && <div style={{ fontSize: 13, color: '#4A5468', marginTop: 2 }}>Step {step} of 4 · {STEPS[step - 1]}</div>}</div>
              <button onClick={() => setOpen(false)} aria-label="Close" style={{ width: 44, height: 44, borderRadius: 6, border: '1px solid #E6E0D4', background: '#fff', fontSize: 20, color: '#1F4FB4' }}><i className="ph ph-x" /></button>
            </div>
            {step < 5 && <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, padding: '14px 24px 0' }}>
              {STEPS.map((t, i) => <div key={t}><div style={{ height: 4, borderRadius: 2, background: step > i ? RED : '#E6E0D4' }} /><div style={{ fontSize: 12, marginTop: 6, fontWeight: 600, color: step === i + 1 ? '#1F4FB4' : '#7A8194' }}>{t}</div></div>)}
            </div>}
            <div style={{ flex: 1, overflowY: 'auto', padding: '22px 24px' }}>
              {step === 1 && <>
                {lbl('Which clinic?', true)}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{DEPTS.map(x => <button key={x.id} className={chip(d.clinic === x.id, x.id === 'elmaor' ? 'pur' : 'red')} onClick={() => set('clinic', x.id)}>{x.name}</button>)}</div><Err k="clinic" />
                {lbl('Have you been to Rouz before?')}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{['New patient', 'Returning patient'].map(x => <button key={x} className={chip(d.patient === x)} onClick={() => set('patient', x)}>{x}</button>)}</div>
                {lbl('Preferred day')}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{days.map(x => <button key={x} className={chip(d.day === x, 'red') + ' sq'} onClick={() => set('day', x)}>{x}</button>)}</div><Err k="day" />
                {lbl('Time of day')}
                <div style={{ display: 'flex', gap: 8 }}>{['Morning', 'Afternoon'].map(x => <button key={x} className={chip(d.slot === x, 'red') + ' sq'} onClick={() => set('slot', x)}>{x}</button>)}</div><Err k="slot" />
                <p style={{ fontSize: 13, color: '#4A5468', margin: '18px 0 0' }}>This is a request. Reception calls you to agree an exact time.</p>
              </>}
              {step === 2 && <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 16 }}>
                  <F k="first" label="First name" ac="given-name" /><F k="last" label="Surname" ac="family-name" />
                  <F k="phone" label="Phone number" type="tel" ph="0803 123 4567" ac="tel" /><F k="email" label="Email (optional)" type="email" ac="email" />
                  <F k="dob" label="Date of birth" type="date" />
                </div>
                <p style={{ fontSize: 13, color: '#4A5468', margin: '18px 0 0' }}>Booking for a child? Enter the child&apos;s name and date of birth, and a parent&apos;s phone number.</p>
              </>}
              {step === 3 && <>
                {lbl('How will you pay?', true)}
                <div style={{ display: 'flex', gap: 8 }}>{['HMO', 'Self-pay'].map(x => <button key={x} className={chip(d.pay === x) + ' sq'} onClick={() => set('pay', x)}>{x}</button>)}</div><Err k="pay" />
                {d.pay === 'HMO' && <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 16, marginTop: 18 }}>
                  <label className={`field ${err.hmo ? 'bad' : ''}`}>HMO<select value={d.hmo} onChange={e => set('hmo', e.target.value)}><option value="">Choose</option>{HMOS.map(h => <option key={h}>{h}</option>)}</select>{err.hmo && <span className="err">{err.hmo}</span>}</label>
                  <F k="hmoId" label="Enrollee ID" />
                </div>}
                <label className={`field ${err.reason ? 'bad' : ''}`} style={{ marginTop: 22 }}>Reason for your visit
                  <textarea rows={4} placeholder="For example: first antenatal visit, 12 weeks pregnant" value={d.reason} onChange={e => set('reason', e.target.value)} />
                  {err.reason && <span className="err">{err.reason}</span>}</label>
                <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginTop: 20, padding: 14, borderRadius: 8, background: '#FBEDEE', fontSize: 14, lineHeight: 1.5, cursor: 'pointer' }}>
                  <input type="checkbox" checked={d.notEmerg} onChange={e => set('notEmerg', e.target.checked)} style={{ width: 20, height: 20, margin: 0, accentColor: RED, flex: 'none' }} />
                  <span>This is not an emergency. For heavy bleeding, severe pain or broken waters, I will call or come straight in.</span>
                </label><Err k="notEmerg" />
              </>}
              {step === 4 && <>
                <div style={{ fontSize: 15, color: '#4A5468', marginBottom: 12 }}>Check your request before sending.</div>
                {review.map(([k, v, n]) => <div key={k} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,130px) minmax(0,1fr) auto', gap: 12, padding: '14px 0', borderTop: '1px solid #EFE9DE', fontSize: 15, alignItems: 'start' }}>
                  <span style={{ color: '#4A5468' }}>{k}</span><span style={{ fontWeight: 500, overflowWrap: 'anywhere' }}>{v}</span>
                  <button onClick={() => setStep(n)} style={{ background: 'none', border: 0, padding: 0, color: RED, fontWeight: 600, fontSize: 14 }}>Edit</button></div>)}
                {sendErr && <div className="err" style={{ marginTop: 12 }}>{sendErr}</div>}
              </>}
              {step === 5 && <div style={{ textAlign: 'center', padding: '24px 4px' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#E8F1EA', color: '#1E5B33', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38, margin: '0 auto 18px' }}><i className="ph ph-check" /></div>
                <div className="serif" style={{ fontSize: 28, marginBottom: 10 }}>Request sent</div>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: '#4A5468', margin: '0 auto 22px', maxWidth: 420 }}>We will call {d.first} on {d.phone} to agree a time for {clinic?.name ?? 'your clinic'} on {d.day}.</p>
                <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 4, background: '#F7F3EC', borderRadius: 10, padding: '16px 28px' }}><span style={{ fontSize: 13, color: '#4A5468' }}>Your reference</span><span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 22, fontWeight: 600, letterSpacing: '.06em' }}>{ref}</span></div>
              </div>}
            </div>
            <div style={{ padding: '16px 24px', borderTop: '1px solid #ECE6DA', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              {step > 1 && step < 5 ? <button className="btn ghost" style={{ height: 50 }} onClick={() => setStep(step - 1)}>Back</button> : <span />}
              {step < 5 ? <button className="btn" style={{ height: 50 }} disabled={busy} onClick={next}>{step === 4 ? (busy ? 'Sending…' : 'Send request') : 'Continue'}</button>
                : <button className="btn" style={{ height: 50, background: '#1F4FB4' }} onClick={() => setOpen(false)}>Done</button>}
            </div>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
