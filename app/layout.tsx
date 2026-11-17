import type { Metadata } from 'next';
import './globals.css';
import Shell from '@/components/Shell';
import { GOOGLE_PROFILE, PHONES } from '@/lib/data';

// Opening hours are omitted until the hospital confirms them. Coordinates come from the Google Maps embed.
const ld = {
  '@context': 'https://schema.org', '@type': 'Hospital', name: 'Rouz Hospital and Maternity',
  telephone: PHONES.map(n => '+234' + n.replace(/\D/g, '').slice(1)), email: 'rouzhmltd@yahoo.com', sameAs: [GOOGLE_PROFILE], geo: { '@type': 'GeoCoordinates', latitude: 9.001072, longitude: 7.476962 },
  address: { '@type': 'PostalAddress', streetAddress: '10 Mobolaji Johnson Street, Apo Quarters Zone D', addressLocality: 'Gudu District, Abuja', addressCountry: 'NG' },
};

export const metadata: Metadata = {
  title: 'Rouz Hospital and Maternity, Abuja',
  description: 'A family hospital in Apo Quarters, Abuja, with maternity and fertility care at its centre.',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=Young+Serif&display=swap" rel="stylesheet" />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} /><Shell>{children}</Shell></body>
    </html>
  );
}
