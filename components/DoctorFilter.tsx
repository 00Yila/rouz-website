'use client';
import { useState } from 'react';
import { DEPTS, DOCS, PUR, RED } from '@/lib/data';
import { useBooking } from './Booking';
export default function DoctorFilter() {
  const [dept, setDept] = useState('all'); const [day, setDay] = useState('Any'); const { openBook } = useBooking();
  const docs = DOCS.filter(d => (dept === 'all' || d.dept === dept) && (day === 'Any' || d.days.includes(day)));
  const depts = [{ id: 'all', name: 'All' }, ...DEPTS.map(d => ({ id: d.id, name: d.id === 'elmaor' ? 'Elmaor' : d.name }))];
  const lab = { fontSize: 13, fontWeight: 600, color: '#4A5468', marginBottom: 10 } as const;
  return (<>
    <div className="hero-band" style={{ paddingBottom: 32 }}>
      <div className="crumbs"><a href="/">Home</a>/<span>Doctors</span></div>
      <h1 className="h1" style={{ margin: '16px 0 28px' }}>Who you will see, and when.</h1>
      <div style={lab}>Department</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>{depts.map(d => <button key={d.id} className={`chip ${dept === d.id ? 'on' : ''}`} onClick={() => setDept(d.id)}>{d.name}</button>)}</div>
      <div style={lab}>Clinic day</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{['Any', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <button key={d} className={`chip ${day === d ? 'on' : ''}`} onClick={() => setDay(d)}>{d}</button>)}</div>
    </div>
    <div style={{ padding: '28px var(--px) clamp(48px,6.5vw,96px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18, gap: 12 }}><span style={{ fontSize: 15, color: '#4A5468' }} aria-live="polite">{docs.length} {docs.length === 1 ? 'doctor' : 'doctors'}</span><span style={{ fontSize: 12, color: '#7A7468', fontFamily: 'ui-monospace,Menlo,monospace' }}>placeholder doctors</span></div>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,250px),1fr))' }}>
        {docs.map((d, i) => <div key={i} style={{ border: '1px solid #E6E0D4', borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: 200, background: 'repeating-linear-gradient(135deg,#EFE8DB 0 10px,#F7F3EC 10px 20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '12px ui-monospace,Menlo,monospace', color: '#7A7468' }}>doctor portrait</div>
          <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 600 }}>Doctor name</div><div style={{ fontSize: 15, fontWeight: 500, color: d.dept === 'elmaor' ? PUR : RED }}>{d.role}</div>
            <div style={{ fontSize: 14, color: '#4A5468', marginTop: 8, display: 'flex', gap: 8, alignItems: 'center' }}><i className="ph ph-calendar-blank" />{d.days.join(' · ')}</div>
            <button className="btn ghost sm" style={{ marginTop: 14, background: '#fff' }} onClick={() => openBook(d.dept)}>Book this clinic</button></div></div>)}
      </div>
      {!docs.length && <div style={{ textAlign: 'center', padding: '48px 20px', background: '#F7F3EC', borderRadius: 12 }}><div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>No doctors match those filters.</div><p style={{ fontSize: 15, color: '#4A5468', margin: '0 0 18px' }}>Try another day, or ask us who is available.</p><button className="btn sm" onClick={() => { setDept('all'); setDay('Any'); }}>Clear filters</button></div>}
    </div></>);
}
