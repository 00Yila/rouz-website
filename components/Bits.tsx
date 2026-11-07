import Link from 'next/link';
import { PUR, RED } from '@/lib/data';
export const Crumbs = ({ trail }: { trail: [string, string?][] }) => (
  <div className="crumbs"><Link href="/">Home</Link>{trail.map(([l, h]) => <span key={l} style={{ display: 'contents' }}>/{h ? <Link href={h}>{l}</Link> : <span>{l}</span>}</span>)}</div>
);
export const Steps = ({ steps, color }: { steps: { n: string; t: string; d: string }[]; color: string }) => (
  <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,230px),1fr))', gap: '0 24px' }}>
    {steps.map(s => <div key={s.n} style={{ borderTop: `3px solid ${color}`, padding: '22px 0' }}><div className="serif" style={{ fontSize: 26, color }}>{s.n}</div><div style={{ fontSize: 19, fontWeight: 600, margin: '10px 0 8px' }}>{s.t}</div><div style={{ fontSize: 15, lineHeight: 1.6, color: '#4A5468' }}>{s.d}</div></div>)}
  </div>
);
export const Split = ({ bg, color = '#1F4FB4', left, img, alt }: { bg: string; color?: string; left: React.ReactNode; img: string; alt: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', background: bg, color }}>
    <div style={{ padding: 'clamp(40px,6vw,96px) clamp(20px,5vw,64px) clamp(40px,6vw,96px) var(--px)' }}>{left}</div>
    <img src={img} alt={alt} style={{ width: '100%', height: '100%', minHeight: 300, objectFit: 'cover' }} />
  </div>
);
export { PUR, RED };
