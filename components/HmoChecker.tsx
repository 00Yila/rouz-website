'use client';
import { useState } from 'react';
import { DEPTS, HMOS, WA_URL } from '@/lib/data';
import { useBooking } from './Booking';
export default function HmoChecker() {
  const [hmo, setHmo] = useState(''); const [svc, setSvc] = useState(''); const [res, setRes] = useState<{ hmo: string; svc: string } | null>(null); const { openBook } = useBooking();
  const sel = { width: '100%', height: 52, border: '1px solid #D8D0C2', borderRadius: 6, padding: '0 12px', fontSize: 16, background: '#fff', color: '#1F4FB4' } as const;
  let r = null;
  if (res) {
    const s = DEPTS.find(d => d.id === res.svc)!; const n = s.name.toLowerCase();
    const code = s.id === 'elmaor' ? 2 : ((HMOS.indexOf(res.hmo) + DEPTS.indexOf(s)) % 4 === 3 ? 1 : 0);
    r = [
      { t: 'Usually covered', b: `Most ${res.hmo} plans cover ${n} at Rouz. Bring your HMO card and enrollee ID.`, bg: '#E8F1EA', fg: '#1E5B33', icon: 'ph-check-circle' },
      { t: 'Pre-authorisation needed', b: `${res.hmo} usually needs a pre-authorisation code for ${n}. We can request it for you; allow one working day.`, bg: '#FBF1DD', fg: '#7A5200', icon: 'ph-clock' },
      { t: 'Not usually covered', b: `${s.name} is not covered on most ${res.hmo} plans. Ask us for self-pay rates.`, bg: '#F8E4E5', fg: '#8A1A24', icon: 'ph-x-circle' },
    ][code];
  }
  return (<>
    <div className="hero-band"><div className="crumbs"><a href="/">Home</a>/<span>HMOs</span></div><h1 className="h1">Check your HMO cover</h1><p className="lead">Choose your HMO and the service you need. Plans differ, so we always confirm before treatment.</p></div>
    <div style={{ padding: 'clamp(40px,5vw,72px) var(--px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,400px),1fr))', gap: 'clamp(32px,5vw,64px)', alignItems: 'start' }}>
      <div style={{ border: '1px solid #E6E0D4', borderRadius: 12, padding: 'clamp(22px,3vw,36px)' }}>
        <label htmlFor="hmo" style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Your HMO</label>
        <select id="hmo" value={hmo} onChange={e => { setHmo(e.target.value); setRes(null); }} style={{ ...sel, marginBottom: 18 }}><option value="">Choose an HMO</option>{HMOS.map(h => <option key={h}>{h}</option>)}</select>
        <label htmlFor="svc" style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Service</label>
        <select id="svc" value={svc} onChange={e => { setSvc(e.target.value); setRes(null); }} style={{ ...sel, marginBottom: 22 }}><option value="">Choose a service</option>{DEPTS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}</select>
        <button className="btn" style={{ width: '100%', background: hmo && svc ? '#B1232F' : '#B9B0A0' }} disabled={!hmo || !svc} onClick={() => setRes({ hmo, svc })}>Check cover</button>
        {r && <div style={{ marginTop: 20, borderRadius: 10, padding: 20, background: r.bg, color: r.fg }} aria-live="polite">
          <div style={{ fontSize: 18, fontWeight: 700, display: 'flex', gap: 10, alignItems: 'center' }}><i className={`ph ${r.icon}`} style={{ fontSize: 22 }} />{r.t}</div>
          <p style={{ fontSize: 15, lineHeight: 1.55, margin: '8px 0 14px', color: '#1F4FB4' }}>{r.b}</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}><button className="btn sm" onClick={() => openBook(res!.svc)}>Book this clinic</button><a href={WA_URL} className="btn ghost sm" style={{ background: '#fff' }}>Confirm on WhatsApp</a></div></div>}
        <p style={{ fontSize: 12, color: '#7A7468', margin: '16px 0 0', fontFamily: 'ui-monospace,Menlo,monospace' }}>Sample data. Final HMO list and rules from Rouz billing.</p>
      </div>
      <div><h2 className="serif" style={{ fontSize: 'clamp(24px,2.2vw,30px)', margin: '0 0 18px', fontWeight: 400 }}>HMOs we work with</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>{HMOS.map(h => <div key={h} style={{ height: 72, border: '1px solid #E6E0D4', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', font: '12px ui-monospace,Menlo,monospace', color: '#7A7468' }}>{h} logo</div>)}</div>
        <div style={{ marginTop: 24, background: '#F7F3EC', borderRadius: 10, padding: 20, fontSize: 15, lineHeight: 1.6 }}>Not listed? <a href={WA_URL} style={{ color: '#B1232F', fontWeight: 600 }}>Send us a photo of your HMO card</a> and we will check for you.</div></div>
    </div></>);
}
