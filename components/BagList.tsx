'use client';
import { useEffect, useState } from 'react';
import { BAG, RED } from '@/lib/data';
export default function BagList() {
  const [on, setOn] = useState<Record<number, boolean>>({});
  useEffect(() => { try { setOn(JSON.parse(localStorage.getItem('rouz.bag') || '{}')); } catch {} }, []);
  const toggle = (i: number) => setOn(p => { const n = { ...p, [i]: !p[i] }; try { localStorage.setItem('rouz.bag', JSON.stringify(n)); } catch {} return n; });
  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 'clamp(22px,3vw,36px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}><h3 style={{ fontSize: 21, fontWeight: 600, margin: 0 }}>What to bring for delivery</h3><span style={{ fontSize: 14, color: '#4A5468' }}>{Object.values(on).filter(Boolean).length} of {BAG.length} packed</span></div>
      <p style={{ fontSize: 13, color: '#4A5468', margin: '6px 0 14px' }}>Draft list, to confirm with the midwives. Ticks are saved on this device.</p>
      {BAG.map((t, i) => <button key={t} onClick={() => toggle(i)} aria-pressed={!!on[i]} style={{ width: '100%', display: 'flex', gap: 14, alignItems: 'center', minHeight: 52, background: 'none', border: 0, borderTop: '1px solid #EFE9DE', textAlign: 'left', fontSize: 16, color: on[i] ? '#7A8194' : '#1F4FB4', textDecoration: on[i] ? 'line-through' : 'none' }}>
        <span style={{ width: 24, height: 24, flex: 'none', borderRadius: 5, border: `1.5px solid ${on[i] ? RED : '#B9B0A0'}`, background: on[i] ? RED : '#fff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>{on[i] && <i className="ph ph-check" />}</span>{t}</button>)}
    </div>);
}
