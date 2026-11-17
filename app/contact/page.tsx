import BookButton from '@/components/BookButton';
import { Crumbs } from '@/components/Bits';
import { PHONES, tel, WA_URL, MAPS_EMBED, MAPS_DIRECTIONS, GOOGLE_PROFILE } from '@/lib/data';
export const metadata = { title: 'Visit · Rouz Hospital' };
const rows = [['Address', '10 Mobolaji Johnson Str., Apo Quarters Zone D, 2nd Gate, Gudu District, P.O. Box 3115, Garki–Abuja'], ['Phone', PHONES.join(' · ')], ['Email', 'rouzhmltd@yahoo.com'], ['Clinic hours', 'To confirm with the hospital'], ['On site', 'Parking inside a walled, gated perimeter']];
const way = { border: '1px solid #E6E0D4', background: '#fff', borderRadius: 10, padding: 26, textAlign: 'left', color: '#1F4FB4', display: 'flex', flexDirection: 'column', gap: 8 } as const;
export default function Contact() {
  return (<>
    <div className="hero-band" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,400px),1fr))', gap: 'clamp(32px,5vw,64px)' }}>
      <div><Crumbs trail={[['Visit']]} /><h1 className="h1" style={{ margin: '16px 0 28px' }}>Come in, or call first.</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,120px) minmax(0,1fr)', gap: 16, fontSize: 16, lineHeight: 1.55 }}>
          {rows.map(([k, v]) => <><span key={k} style={{ color: '#4A5468' }}>{k}</span><span key={k + 'v'} style={k === 'Clinic hours' ? { color: '#B1232F' } : {}}>{v}</span></>)}</div></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <iframe title="Map showing Rouz Hospital and Maternity, Apo Quarters, Abuja" src={MAPS_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ border: 0, borderRadius: 12, width: '100%', minHeight: 340, flex: 1 }} />
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a href={MAPS_DIRECTIONS} target="_blank" rel="noopener noreferrer" className="btn sm"><i className="ph ph-navigation-arrow" />Get directions</a>
          <a href={GOOGLE_PROFILE} target="_blank" rel="noopener noreferrer" className="btn ghost sm"><i className="ph ph-star" />View on Google</a>
        </div>
      </div>
    </div>
    <section className="sec"><h2 className="serif" style={{ fontSize: 'clamp(26px,2.3vw,32px)', margin: '0 0 24px', fontWeight: 400 }}>Three ways to reach us.</h2>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 14 }}>
        <BookButton className="" style={way}><span style={{ fontSize: 20, fontWeight: 600 }}>Book an appointment</span><span style={{ fontSize: 15, lineHeight: 1.55, color: '#4A5468' }}>Choose a clinic and a preferred day. We call back to confirm.</span><span style={{ fontWeight: 600, color: '#B1232F', marginTop: 6 }}>Open the form →</span></BookButton>
        <a href={tel(PHONES[0])} style={way}><span style={{ fontSize: 20, fontWeight: 600 }}>Call us</span><span style={{ fontSize: 15, lineHeight: 1.55, color: '#4A5468' }}>Speak to reception or the delivery suite.</span><span style={{ fontWeight: 600, color: '#B1232F', marginTop: 6 }}>{PHONES[0]}</span></a>
        <a href={WA_URL} style={way}><span style={{ fontSize: 20, fontWeight: 600 }}>WhatsApp</span><span style={{ fontSize: 15, lineHeight: 1.55, color: '#4A5468' }}>Send a question or a photo of a referral letter.</span><span style={{ fontWeight: 600, color: '#B1232F', marginTop: 6 }}>Start a chat →</span></a>
      </div></section></>);
}
