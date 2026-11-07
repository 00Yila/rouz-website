import Link from 'next/link';
import BookButton from '@/components/BookButton';
import { DEPTS, deptHref, PHONES, tel, WA_URL, PUR } from '@/lib/data';

const inside = [
  { src: '/reception.jpg', t: 'Reception and waiting area', d: 'Patients register here before being called to consulting rooms.' },
  { src: '/nurses-station.jpg', t: "Nurses' station and triage", d: 'Computer workstation and storage for records and consumables.' },
  { src: '/laboratory.jpg', t: 'Diagnostic laboratory', d: 'Haematology and chemistry analysers, incubator and centrifuges.' },
  { src: '/pharmacy.jpg', t: 'Pharmacy and medical stores', d: 'Refrigerated cold-chain storage for vaccines.' },
];
const tile = { background: '#F7F3EC', borderRadius: 10, padding: 22, display: 'flex', flexDirection: 'column' as const, gap: 10, textAlign: 'left' as const, color: '#1F4FB4', border: 0 };
const sub = { fontSize: 14, lineHeight: 1.5, color: '#4A5468' };

export default function Home() {
  return (<>
    <section style={{ position: 'relative', minHeight: 'clamp(520px,44vw,640px)', background: '#1F4FB4', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <img src="/exterior.jpg" alt="Rouz Hospital main building in Apo Quarters, Abuja" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(31,79,180,.92) 0%,rgba(31,79,180,.7) 50%,rgba(31,79,180,.25) 100%)' }} />
      <div style={{ position: 'relative', padding: 'clamp(48px,7vw,110px) var(--px)', maxWidth: 680 + 240, color: '#fff' }}>
        <div className="eyebrow" style={{ color: '#F1D9A0' }}>Apo Quarters · Gudu District, Abuja</div>
        <h1 className="serif" style={{ fontSize: 'clamp(32px,4vw,58px)', lineHeight: 1.1, margin: '18px 0 20px', textWrap: 'balance', maxWidth: 680 }}>Care you can reach, explained clearly, from people who know your family.</h1>
        <p style={{ fontSize: 'clamp(16px,1.3vw,19px)', lineHeight: 1.55, margin: '0 0 32px', color: '#E6E8EE', maxWidth: 540 }}>A family hospital with maternity and fertility care at its centre: from planning a pregnancy to the baby&apos;s first years, on one site.</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <BookButton>Book an appointment</BookButton>
          <a href={tel(PHONES[0])} className="btn outline-w"><i className="ph ph-phone" />Call {PHONES[0]}</a>
        </div>
      </div>
    </section>

    <section style={{ padding: 'clamp(48px,5vw,72px) var(--px)' }}>
      <h2 className="serif" style={{ fontSize: 'clamp(26px,2.3vw,32px)', margin: '0 0 24px', fontWeight: 400 }}>What do you need today?</h2>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,150px),1fr))', gap: 12 }}>
        <BookButton className="" style={{ ...tile, background: '#B1232F', color: '#fff', minHeight: 150 }}><i className="ph ph-calendar-check" style={{ fontSize: 30 }} /><span style={{ fontSize: 19, fontWeight: 600 }}>Book an appointment</span><span style={{ fontSize: 14, lineHeight: 1.5, color: '#F6DADC' }}>Pick a clinic and a day. We call to confirm.</span></BookButton>
        <a href={tel(PHONES[0])} style={tile}><i className="ph ph-phone" style={{ fontSize: 30, color: '#B1232F' }} /><span style={{ fontSize: 19, fontWeight: 600 }}>Call the hospital</span><span style={sub}>{PHONES.join(' · ')}</span></a>
        <a href={WA_URL} style={tile}><i className="ph ph-whatsapp-logo" style={{ fontSize: 30, color: '#B1232F' }} /><span style={{ fontSize: 19, fontWeight: 600 }}>Message on WhatsApp</span><span style={sub}>Ask a question or check your HMO cover.</span></a>
        <Link href="/contact" style={tile}><i className="ph ph-map-pin" style={{ fontSize: 30, color: '#B1232F' }} /><span style={{ fontSize: 19, fontWeight: 600 }}>Find us</span><span style={sub}>10 Mobolaji Johnson Str., Apo Quarters Zone D.</span></Link>
      </div>
    </section>

    <section style={{ padding: '0 var(--px) clamp(48px,6.5vw,96px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap', marginBottom: 28 }}>
        <div><div className="eyebrow">Departments</div><h2 className="h2" style={{ margin: '14px 0 0' }}>Eight departments on one site.</h2></div>
        <Link href="/services" className="btn ghost" style={{ height: 48, fontSize: 15, padding: '0 18px' }}>All services</Link>
      </div>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,250px),1fr))', gap: 12 }}>
        {DEPTS.map(d => <Link key={d.id} href={deptHref(d)} className="card" style={{ background: d.id === 'elmaor' ? '#F3EDF7' : '#fff', gap: 8 }}>
          <i className={`ph ${d.icon}`} style={{ fontSize: 28, color: d.id === 'elmaor' ? PUR : '#B1232F' }} /><span style={{ fontSize: 19, fontWeight: 600 }}>{d.name}</span><span style={{ fontSize: 14, lineHeight: 1.55, color: '#4A5468' }}>{d.desc}</span></Link>)}
      </div>
    </section>

    <section style={{ padding: '0 var(--px) clamp(48px,6.5vw,96px)' }}>
      <div style={{ background: '#1F4FB4', color: '#fff', borderRadius: 14, overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))' }}>
        <img src="/scbu.jpg" alt="Special Care Baby Unit" style={{ width: '100%', height: '100%', minHeight: 280, objectFit: 'cover' }} />
        <div style={{ padding: 'clamp(28px,4.4vw,64px)' }}>
          <div className="eyebrow" style={{ color: '#F1D9A0' }}>Maternity and SCBU</div>
          <h2 className="serif" style={{ fontSize: 'clamp(26px,2.6vw,38px)', lineHeight: 1.15, margin: '14px 0 16px', fontWeight: 400 }}>Mother and baby, cared for on the same site from booking to discharge.</h2>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: '#C9CEDA', margin: '0 0 26px' }}>A Special Care Baby Unit sits next to the maternity service, for newborns who need closer observation after birth.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}><BookButton clinic="maternity">Start antenatal care</BookButton><Link href="/maternity" className="btn outline-w">About maternity</Link></div>
        </div>
      </div>
    </section>

    <section style={{ background: '#5A2A82', color: '#fff', padding: 'clamp(48px,5.5vw,80px) var(--px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap: 'clamp(28px,5vw,72px)', alignItems: 'center' }}>
      <div>
        <img src="/logos/elmaor-horizontal-reverse.png" alt="Elmaor Fertility Clinic" style={{ height: 56, width: 'auto', display: 'block', margin: '0 0 22px -8px' }} />
        <h2 className="serif" style={{ fontSize: 'clamp(28px,2.8vw,40px)', lineHeight: 1.15, margin: '0 0 16px', fontWeight: 400 }}>Hope, honest information and support.</h2>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: '#E7DDF0', margin: '0 0 28px' }}>Fertility assessment, IVF consultation and treatment cycles, and the Fertility Awareness programme. When treatment works, antenatal care and delivery continue here at Rouz.</p>
        <Link href="/elmaor" className="btn white">Visit Elmaor</Link>
      </div>
      <img src="/elmaor-room.jpg" alt="Elmaor consulting room" style={{ width: '100%', height: 'clamp(240px,28vw,400px)', objectFit: 'cover', borderRadius: 12 }} />
    </section>

    <section className="sec">
      <div className="eyebrow">Inside the hospital</div>
      <h2 className="h2">Our own rooms and our own staff.</h2>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))' }}>
        {inside.map(p => <figure key={p.src} style={{ margin: 0 }}><img src={p.src} alt={p.t} style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 10 }} /><figcaption style={{ marginTop: 12, fontSize: 15, fontWeight: 600 }}>{p.t}</figcaption><div style={{ ...sub, marginTop: 4 }}>{p.d}</div></figure>)}
      </div>
      <p style={{ margin: '18px 0 0', fontSize: 13, color: '#4A5468' }}>Photographed at Rouz Hospital, Apo Quarters. No stock images.</p>
    </section>

    <section style={{ background: '#F7F3EC', padding: 'clamp(48px,6vw,88px) var(--px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: 16 }}>
      {[['/doctors', 'ph-user-list', 'Find a doctor', 'See who runs each clinic and on which days.'], ['/hmos', 'ph-shield-check', 'Check your HMO cover', 'Choose your HMO and a service before you come in.'], ['/news', 'ph-newspaper', 'Read The Rouz Weekly', 'Health tips, hospital news and research updates.']].map(([h, i, t, d]) =>
        <Link key={h} href={h} style={{ background: '#fff', borderRadius: 10, padding: 28, display: 'flex', flexDirection: 'column', gap: 8 }}><i className={`ph ${i}`} style={{ fontSize: 28, color: '#B1232F' }} /><span style={{ fontSize: 20, fontWeight: 600 }}>{t}</span><span style={{ fontSize: 15, color: '#4A5468', lineHeight: 1.55 }}>{d}</span></Link>)}
    </section>
  </>);
}
