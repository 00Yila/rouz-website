'use client';
import { useBooking } from './Booking';
export default function BookButton({ clinic, className = 'btn', style, children }: { clinic?: string; className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  const { openBook } = useBooking();
  return <button className={className} style={style} onClick={() => openBook(clinic)}>{children}</button>;
}
