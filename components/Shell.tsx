'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BookingProvider, useBooking } from './Booking';
import { NAV, PHONES, tel, WA_URL } from '@/lib/data';

function Inner({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const { openBook } = useBooking();
  const active = (h: string) => path === h || (h === '/services' && (path.startsWith('/services') || path === '/elmaor')) || (h !== '/services' && path.startsWith(h + '/'));
  const px = 'var(--px)';
  const call = <a href={tel(PHONES[0])} aria-label="Call" className="mob" style={{ width: 48, height: 48, borderRadius: 6, background: '#F7F3EC', color: '#B1232F', fontSize: 22, alignItems: 'center', justifyContent: 'center' }}><i className="ph ph-phone" /></a>;
  return (
    <>
      <div className="desk" style={{ background: '#1F4FB4', color: '#fff', fontSize: 13, justifyContent: 'space-between', alignItems: 'center', padding: `10px ${px}`, gap: 16 }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}><span style={{ fontWeight: 600 }}>Rouz Hospital and Maternity</span>
          <Link href="/elmaor" style={{ color: '#D9CDE6', display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: '#9C73C2' }} />Elmaor Fertility Clinic</Link></div>
        <div style={{ display: 'flex', gap: 24, color: '#C9CEDA', alignItems: 'center' }}><span>Apo Quarters, Gudu District, Abuja</span><a href={tel(PHONES[0])} style={{ color: '#fff', fontWeight: 600 }}>{PHONES[0]}</a></div>
      </div>
      <header style={{ position: 'sticky', top: 0, zIndex: 20, background: '#fff', borderBottom: '1px solid #ECE6DA', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, padding: `12px ${px}` }}>
        <Link href="/" style={{ flex: 'none' }}><img src="/logos/rouz-horizontal-color.png" alt="Rouz Hospital and Maternity, home" style={{ height: 'clamp(36px,3.2vw,46px)', width: 'auto', display: 'block' }} /></Link>
        <nav className="desk" style={{ flexWrap: 'wrap', justifyContent: 'center', gap: '4px 22px' }}>
          {NAV.map(n => <Link key={n.href} href={n.href} className={`nav-link ${active(n.href) ? 'active' : ''}`}>{n.label}</Link>)}
        </nav>
        <button className="btn desk" style={{ height: 48, padding: '0 20px', fontSize: 15, flex: 'none' }} onClick={() => openBook()}>Book an appointment</button>
        <div className="mob" style={{ gap: 8 }}>{call}
          <button onClick={() => setMenu(true)} aria-label="Menu" style={{ width: 48, height: 48, borderRadius: 6, border: '1px solid #E6E0D4', background: '#fff', color: '#1F4FB4', fontSize: 22 }}><i className="ph ph-list" /></button></div>
      </header>
      <main>{children}</main>
      <div style={{ padding: `0 ${px} 40px` }}><p style={{ margin: 0, padding: '18px 20px', borderRadius: 10, background: '#FBEDEE', fontSize: 15, lineHeight: 1.5, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <i className="ph ph-warning-circle" style={{ color: '#B1232F', fontSize: 22, flex: 'none' }} />If you are bleeding heavily, have severe pain or your waters have broken, do not message or book. Call us or come straight in.</p></div>
      <footer style={{ background: '#1F4FB4', color: '#C9CEDA', padding: `clamp(40px,5vw,72px) ${px} 40px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))', gap: 36 }}>
          <div><img src="/logos/rouz-horizontal-reverse.png" alt="Rouz Hospital and Maternity" style={{ height: 44, width: 'auto', display: 'block' }} /><p style={{ fontSize: 15, lineHeight: 1.6, margin: '18px 0 0', maxWidth: 300 }}>A family hospital in Apo, Abuja, with maternity and fertility care at its centre.</p></div>
          {[['Care', [['/maternity', 'Maternity'], ['/services', 'Services'], ['/elmaor', 'Elmaor Fertility Clinic'], ['/doctors', 'Doctors']]], ['Hospital', [['/about', 'About'], ['/news', 'Research & News'], ['/hmos', 'HMOs'], ['/contact', 'Visit']]]].map(([t, ls]) => (
            <div key={t as string} style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 15 }}><span style={{ color: '#fff', fontWeight: 600, marginBottom: 4 }}>{t as string}</span>
              {(ls as string[][]).map(([h, l]) => <Link key={h} href={h}>{l}</Link>)}</div>))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 15 }}><span style={{ color: '#fff', fontWeight: 600, marginBottom: 4 }}>Visit</span>
            <span>10 Mobolaji Johnson Str., Apo Quarters, Abuja</span><a href={tel(PHONES[0])}>{PHONES[0]}</a><a href="mailto:rouzhmltd@yahoo.com">rouzhmltd@yahoo.com</a></div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,.14)', marginTop: 44, paddingTop: 20, display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', fontSize: 13 }}><span>© 2026 Rouz Hospital and Maternity Limited</span><span>Privacy notice · Nigeria Data Protection Act</span></div>
      </footer>
      <div className="stickybar" style={{ background: '#fff', borderTop: '1px solid #E6E0D4', padding: '12px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <button className="btn" style={{ height: 50, fontSize: 15 }} onClick={() => openBook()}>Book</button>
        <a href={WA_URL} className="btn" style={{ height: 50, fontSize: 15, background: '#25D366' }}><i className="ph ph-whatsapp-logo" style={{ fontSize: 20 }} />WhatsApp</a>
      </div>
      <a href={WA_URL} aria-label="WhatsApp" className="waf"><i className="ph ph-whatsapp-logo" /></a>
      {menu && <div style={{ position: 'fixed', inset: 0, zIndex: 40, background: '#fff', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid #ECE6DA' }}>
          <img src="/logos/rouz-horizontal-color.png" alt="Rouz" style={{ height: 36 }} />
          <button onClick={() => setMenu(false)} aria-label="Close menu" style={{ width: 48, height: 48, borderRadius: 6, border: '1px solid #E6E0D4', background: '#fff', fontSize: 22, color: '#1F4FB4' }}><i className="ph ph-x" /></button></div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 20px' }}>
          {[{ href: '/', label: 'Home' }, ...NAV].map(n => <Link key={n.href} href={n.href} onClick={() => setMenu(false)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 56, borderBottom: '1px solid #EFE9DE', fontSize: 18, fontWeight: 500, color: active(n.href) && n.href !== '/' ? '#B1232F' : '#1F4FB4' }}>{n.label}<i className="ph ph-caret-right" style={{ color: '#4A5468' }} /></Link>)}</div>
        <div style={{ padding: '16px 20px 24px', display: 'flex', flexDirection: 'column', gap: 10, borderTop: '1px solid #ECE6DA' }}>
          <button className="btn" onClick={() => { setMenu(false); openBook(); }}>Book an appointment</button>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}><a href={tel(PHONES[0])} className="btn ghost" style={{ height: 50, fontSize: 15 }}>Call</a><a href={WA_URL} className="btn" style={{ height: 50, fontSize: 15, background: '#25D366' }}>WhatsApp</a></div></div>
      </div>}
    </>
  );
}
export default function Shell({ children }: { children: React.ReactNode }) { return <BookingProvider><Inner>{children}</Inner></BookingProvider>; }
