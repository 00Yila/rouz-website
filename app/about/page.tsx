import { Crumbs } from '@/components/Bits';
export const metadata = { title: 'About · Rouz Hospital' };
const stats = [['15', 'inpatient beds'], ['8', 'departments'], ['22', 'clinical and support staff'], ['2,000+', 'patient records']];
export default function About() {
  return (<>
    <div className="hero-band" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,400px),1fr))', gap: 'clamp(32px,5vw,72px)', alignItems: 'center' }}>
      <div><Crumbs trail={[['About']]} /><h1 className="h1" style={{ margin: '16px 0 18px' }}>A family hospital with a maternity and fertility focus.</h1>
        <p style={{ fontSize: 17, lineHeight: 1.65, color: '#4A5468', margin: '0 0 14px' }}>Rouz Hospital and Maternity Limited is a private hospital in Apo Quarters, Gudu District, Abuja. It provides general hospital care alongside maternity services, and runs Elmaor Fertility Clinic as its specialist fertility and IVF unit.</p>
        <p style={{ fontSize: 17, lineHeight: 1.65, color: '#4A5468', margin: 0 }}>Antenatal care, delivery, postnatal follow-up, paediatrics and fertility treatment all take place on one site, under one management.</p></div>
      <img src="/entrance.jpg" alt="Covered entrance" style={{ width: '100%', height: 'clamp(260px,30vw,440px)', objectFit: 'cover', borderRadius: 12 }} />
    </div>
    <div style={{ padding: 'clamp(40px,5vw,72px) var(--px)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,180px),1fr))', gap: 20, borderTop: '1px solid #DDD3C2', paddingTop: 24 }}>
        {stats.map(([v, l]) => <div key={l}><div className="serif" style={{ fontSize: 'clamp(32px,3vw,44px)' }}>{v}</div><div style={{ fontSize: 15, color: '#4A5468', marginTop: 4 }}>{l}</div></div>)}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 12, marginTop: 'clamp(40px,5vw,64px)' }}>
        {[['courtyard', 'Courtyard'], ['corridor', 'Corridor'], ['side-access', 'Side access and parking']].map(([f, a]) => <img key={f} src={`/${f}.jpg`} alt={a} style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 10 }} />)}</div>
    </div></>);
}
