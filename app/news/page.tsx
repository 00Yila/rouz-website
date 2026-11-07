import { Crumbs } from '@/components/Bits';
export const metadata = { title: 'Research & News · Rouz Hospital' };
export default function News() {
  return (<>
    <div className="hero-band"><Crumbs trail={[['Research & News']]} /><h1 className="h1">Research &amp; News</h1><p className="lead">The Rouz Weekly, and work from the Rouz Research &amp; Publications unit.</p></div>
    <div style={{ padding: 'clamp(40px,5vw,72px) var(--px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,400px),1fr))', gap: 'clamp(32px,5vw,64px)' }}>
      <div><h2 className="serif" style={{ fontSize: 'clamp(26px,2.4vw,34px)', margin: '0 0 20px', fontWeight: 400 }}>The Rouz Weekly</h2>
        {[4, 3, 2, 1].map(n => <div key={n} style={{ display: 'grid', gridTemplateColumns: '96px 1fr', gap: 18, padding: '18px 0', borderTop: '1px solid #E6E0D4' }}>
          <div style={{ height: 120, borderRadius: 6, background: 'repeating-linear-gradient(135deg,#EFE8DB 0 8px,#F7F3EC 8px 16px)' }} />
          <div><div style={{ fontSize: 13, color: '#4A5468' }}>Issue {n} · date</div><div style={{ fontSize: 18, fontWeight: 600, margin: '6px 0' }}>Issue headline goes here</div><div style={{ fontSize: 14, color: '#4A5468', lineHeight: 1.5 }}>Health tips, hospital news and updates.</div></div></div>)}</div>
      <div><h2 className="serif" style={{ fontSize: 'clamp(26px,2.4vw,34px)', margin: '0 0 12px', fontWeight: 400 }}>Rouz Research &amp; Publications</h2>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: '#4A5468', margin: '0 0 20px' }}>An in-house unit turning clinical work into published research and patient education, with written patient consent and ethics review before any study begins.</p>
        {['Neonatal outcomes', 'Maternity care', 'Fertility and IVF'].map(t => <div key={t} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderTop: '1px solid #E6E0D4', fontSize: 16, fontWeight: 500 }}>{t}<span style={{ color: '#B1232F' }}>→</span></div>)}</div>
    </div></>);
}
