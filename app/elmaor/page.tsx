import BookButton from '@/components/BookButton';
import { Split, Steps } from '@/components/Bits';
import { PUR, WA_URL } from '@/lib/data';
export const metadata = { title: 'Elmaor Fertility Clinic · Rouz Hospital' };
const steps = [
  { n: '01', t: 'Consultation', d: 'Your history, your questions, and a plan for tests.' },
  { n: '02', t: 'Assessment', d: 'Laboratory and ultrasound on site, results explained in person.' },
  { n: '03', t: 'Treatment', d: 'IVF or other treatment cycles, with costs agreed in advance.' },
  { n: '04', t: 'Pregnancy and birth', d: 'Antenatal care and delivery continue at Rouz, under one record.' },
];
const cards = [['ph-clipboard-text', 'Fertility assessment', 'Tests for both partners, done in our on-site laboratory and radiology unit.'], ['ph-flask', 'IVF consultation and cycles', 'Consultation and treatment cycles, with the process and costs set out in writing.'], ['ph-chalkboard-teacher', 'Fertility Awareness programme', 'Patient education sessions on fertility, timing and treatment options.']];
export default function Elmaor() {
  return (<>
    <Split bg="#F3EDF7" img="/elmaor-room.jpg" alt="Elmaor consulting room" left={<>
      <img src="/logos/elmaor-endorsed-color.png" alt="Elmaor Fertility Clinic, a Rouz Hospital and Maternity service" style={{ height: 64, width: 'auto', display: 'block', margin: '0 0 28px -6px' }} />
      <h1 className="h1" style={{ margin: '0 0 18px' }}>Hope, honest information and support.</h1>
      <p className="lead" style={{ margin: '0 0 30px', maxWidth: 520 }}>We&apos;ll explain each step of assessment and treatment, what it costs, and what the results mean, before you decide anything.</p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}><BookButton clinic="elmaor" style={{ background: PUR }}>Book a consultation</BookButton><a href={WA_URL} className="btn ghost">Ask privately on WhatsApp</a></div>
    </>} />
    <section className="sec"><h2 className="h2" style={{ maxWidth: 720, marginTop: 0, marginBottom: 32 }}>From the first consultation to your baby&apos;s first years, one team.</h2><Steps steps={steps} color={PUR} /></section>
    <section style={{ padding: '0 var(--px) clamp(48px,6.5vw,96px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 16 }}>
      {cards.map(([i, t, d]) => <div key={t} style={{ background: '#F3EDF7', borderRadius: 12, padding: 28 }}><i className={`ph ${i}`} style={{ fontSize: 30, color: PUR }} /><h3 style={{ fontSize: 21, fontWeight: 600, margin: '14px 0 8px' }}>{t}</h3><p style={{ fontSize: 15, lineHeight: 1.6, color: '#4A5468', margin: 0 }}>{d}</p></div>)}
    </section>
    <section style={{ background: PUR, color: '#fff', padding: 'clamp(40px,5vw,72px) var(--px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
      <div><h2 className="serif" style={{ fontSize: 'clamp(26px,2.5vw,36px)', margin: '0 0 10px', fontWeight: 400 }}>Talk to us privately.</h2><p style={{ fontSize: 16, color: '#E7DDF0', margin: 0 }}>Your enquiry stays confidential.</p></div>
      <BookButton clinic="elmaor" className="btn white">Book a consultation</BookButton>
    </section></>);
}
