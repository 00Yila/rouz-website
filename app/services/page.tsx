import Link from 'next/link';
import BookButton from '@/components/BookButton';
import { Crumbs } from '@/components/Bits';
import { DEPTS, deptHref, PUR, RED } from '@/lib/data';
export const metadata = { title: 'Departments and services · Rouz Hospital' };
export default function Services() {
  return (<>
    <div className="hero-band"><Crumbs trail={[['Services']]} />
      <h1 className="h1">Departments and services</h1>
      <p className="lead">Tests, scans and medicines happen in the same building as your consultation, so you are not sent elsewhere to start again.</p></div>
    <div style={{ padding: 'clamp(40px,5vw,72px) var(--px) clamp(48px,6.5vw,96px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 16 }}>
      {DEPTS.map(d => { const el = d.id === 'elmaor'; return (
        <div key={d.id} style={{ border: '1px solid #E6E0D4', borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: el ? '#F3EDF7' : '#fff' }}>
          <img src={d.img} alt={d.name} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
          <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><i className={`ph ${d.icon}`} style={{ fontSize: 24, color: el ? PUR : RED }} /><span style={{ fontSize: 20, fontWeight: 600 }}>{d.name}</span></div>
            <span style={{ fontSize: 15, lineHeight: 1.55, color: '#4A5468' }}>{d.desc}</span>
            <div style={{ display: 'flex', gap: 10, marginTop: 'auto', paddingTop: 14, flexWrap: 'wrap' }}>
              <Link href={deptHref(d)} className="btn ghost sm">Details</Link>
              <BookButton clinic={d.id} className="btn sm" style={{ background: el ? PUR : RED }}>Book this clinic</BookButton></div>
          </div></div>); })}
    </div></>);
}
