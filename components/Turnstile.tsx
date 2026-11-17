'use client';
import { useEffect, useRef } from 'react';

declare global { interface Window { turnstile?: { render: (el: HTMLElement, o: Record<string, unknown>) => string; reset: (id?: string) => void; remove: (id?: string) => void } } }
const SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

let loading: Promise<void> | null = null;
const load = () => (loading ??= new Promise<void>((res, rej) => {
  if (window.turnstile) return res();
  const s = document.createElement('script'); s.src = SRC; s.async = true; s.onload = () => res(); s.onerror = () => { loading = null; rej(); };
  document.head.appendChild(s);
}));

/** Cloudflare Turnstile widget. `resetKey` changes -> widget resets and asks for a fresh token. */
export default function Turnstile({ onToken, resetKey }: { onToken: (t: string) => void; resetKey: number }) {
  const box = useRef<HTMLDivElement>(null); const id = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    let dead = false;
    load().then(() => {
      if (dead || !box.current || !window.turnstile) return;
      id.current = window.turnstile.render(box.current, {
        sitekey: TURNSTILE_SITE_KEY, callback: (t: string) => onToken(t),
        'expired-callback': () => onToken(''), 'error-callback': () => onToken(''),
      });
    }).catch(() => onToken(''));
    return () => { dead = true; if (id.current) window.turnstile?.remove(id.current); id.current = undefined; onToken(''); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (resetKey && id.current) { onToken(''); window.turnstile?.reset(id.current); } }, [resetKey]); // eslint-disable-line react-hooks/exhaustive-deps
  return <div ref={box} style={{ marginTop: 18, minHeight: 65 }} />;
}
