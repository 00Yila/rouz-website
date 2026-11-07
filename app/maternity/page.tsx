import BookButton from '@/components/BookButton';
import BagList from '@/components/BagList';
import { Split, Steps } from '@/components/Bits';
import { PHONES, tel } from '@/lib/data';
export const metadata = { title: 'Maternity · Rouz Hospital' };
const steps = [
  { n: '01', t: 'Booking visit', d: 'Your history, first tests and an obstetric ultrasound on site.' },
  { n: '02', t: 'Antenatal clinic', d: 'Regular checks with the same team through your pregnancy.' },
  { n: '03', t: 'Labour and delivery', d: 'Delivery on site, with the SCBU next door if your baby needs it.' },
  { n: '04', t: 'Postnatal and baby', d: 'Follow-up for you, then immunisation and child health in Paediatrics.' },
];
export default function Maternity() {
  return (<>
    <Split bg="#1F4FB4" color="#fff" img="/scbu.jpg" alt="Special Care Baby Unit" left={<>
      <div className="eyebrow" style={{ color: '#F1D9A0' }}>Maternity</div>
      <h1 className="h1" style={{ margin: '16px 0 18px' }}>From your booking visit to your baby&apos;s first weeks.</h1>
      <p style={{ fontSize: 17, lineHeight: 1.6, color: '#C9CEDA', margin: '0 0 30px' }}>Antenatal clinic, labour and delivery, postnatal care and a Special Care Baby Unit, all on one site under one record.</p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}><BookButton clinic="maternity">Start antenatal care</BookButton><a href={tel(PHONES[0])} className="btn outline-w">Call the delivery suite</a></div>
    </>} />
    <section className="sec"><div className="eyebrow">Your pregnancy at Rouz</div><h2 className="h2" style={{ marginBottom: 32 }}>Four stages, one team.</h2><Steps steps={steps} color="#B1232F" /></section>
    <section style={{ background: '#F7F3EC', padding: 'clamp(48px,6.5vw,96px) var(--px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap: 'clamp(32px,5vw,72px)' }}>
      <div><div className="eyebrow">Special Care Baby Unit</div><h2 className="h2" style={{ marginBottom: 18 }}>Close observation for newborns who need it.</h2>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: '#4A5468', margin: '0 0 22px' }}>A dedicated room next to the maternity service, equipped for babies who need monitoring after birth.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 20px', fontSize: 15 }}>
          {['Infant incubators', 'Patient monitors', 'Neonatal cots', 'Infusion support'].map(t => <span key={t} style={{ display: 'flex', gap: 10, alignItems: 'center' }}><i className="ph ph-check-circle" style={{ color: '#B1232F', fontSize: 20 }} />{t}</span>)}</div></div>
      <BagList />
    </section></>);
}
