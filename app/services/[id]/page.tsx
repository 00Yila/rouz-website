import Link from 'next/link';
import { notFound } from 'next/navigation';
import BookButton from '@/components/BookButton';
import { Crumbs, Split } from '@/components/Bits';
import { DEPTS, DOCS, WA_URL } from '@/lib/data';

const plain = DEPTS.filter(d => !d.href);
export const dynamicParams = false;
export const generateStaticParams = () => plain.map(d => ({ id: d.id }));
export default async function Dept({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const d = plain.find(x => x.id === id); if (!d) notFound();
  const docs = DOCS.filter(x => x.dept === d.id);
  return (<>
    <Split bg="#F7F3EC" img={d.img} alt={d.name} left={<>
      <Crumbs trail={[['Services', '/services'], [d.name]]} />
      <i className={`ph ${d.icon}`} style={{ fontSize: 34, color: '#B1232F', display: 'block', marginTop: 22 }} />
      <h1 className="h1" style={{ margin: '12px 0 16px' }}>{d.name}</h1>
      <p className="lead" style={{ margin: '0 0 28px', maxWidth: 520 }}>{d.desc}</p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}><BookButton clinic={d.id}>Book this clinic</BookButton><a href={WA_URL} className="btn ghost">Ask a question</a></div>
    </>} />
    <div className="sec" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap: 'clamp(32px,5vw,72px)' }}>
      <div><h2 className="serif" style={{ fontSize: 'clamp(26px,2.4vw,34px)', margin: '0 0 20px', fontWeight: 400 }}>What this department covers</h2>
        {d.items.map(it => <div key={it} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '16px 0', borderTop: '1px solid #E6E0D4', fontSize: 17 }}><i className="ph ph-check-circle" style={{ color: '#B1232F', fontSize: 22 }} />{it}</div>)}</div>
      <div><h2 className="serif" style={{ fontSize: 'clamp(26px,2.4vw,34px)', margin: '0 0 20px', fontWeight: 400 }}>Doctors in this clinic</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {docs.map((x, i) => <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center', background: '#F7F3EC', borderRadius: 10, padding: 14 }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', flex: 'none', background: 'repeating-linear-gradient(135deg,#E6DDCC 0 6px,#F1EBE0 6px 12px)' }} />
            <div><div style={{ fontWeight: 600, fontSize: 17 }}>Doctor name</div><div style={{ fontSize: 14, color: '#4A5468', marginTop: 2 }}>{x.role} · {x.days.join(' · ')}</div></div></div>)}
          {!docs.length && <p style={{ fontSize: 15, color: '#4A5468', margin: 0 }}>Doctor list to be added.</p>}
          <Link href="/doctors" style={{ color: '#B1232F', fontWeight: 600, fontSize: 15, padding: '6px 0' }}>All doctors and clinic days →</Link></div></div>
    </div></>);
}
