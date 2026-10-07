import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import MobileStickyBar from '@/components/MobileStickyBar';
import { BUSINESS_INFO } from '@/lib/constants';

export const viewport: Viewport = {
  themeColor: '#090D12',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://panwarenterprises.in'),
  title: {
    default: 'PANWAR ENTERPRISES | B2B Industrial Scrap Buyer & Scrap Collection',
    template: '%s | PANWAR ENTERPRISES',
  },
  description:
    'PANWAR ENTERPRISES buys all types of industrial scrap and provides reliable scrap pickup with competitive market prices. 35+ years of experience serving Gurugram, Manesar, Bawal, Neemrana, Rewari & nearby industrial areas.',
  keywords: [
    'industrial scrap buyer in Gurugram',
    'scrap buyer in Manesar',
    'scrap dealer in Bawal',
    'industrial scrap buyer in Bawal',
    'scrap buyer in Neemrana',
    'scrap buyer in Rewari',
    'factory scrap buyer',
    'industrial scrap collection',
    'company scrap buyer',
    'metal scrap buyer',
    'industrial scrap dealer Haryana',
    'machinery scrap buyer',
    'iron and steel scrap',
    'copper scrap dealer',
    'PANWAR ENTERPRISES Tankri Bawal',
  ],
  authors: [{ name: 'PANWAR ENTERPRISES' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'PANWAR ENTERPRISES | Industrial Scrap Solutions',
    description:
      'Turn your industrial scrap into value. 35+ years of experience. We buy all types of industrial & factory scrap with best market price and fast pickup.',
    url: 'https://panwarenterprises.in',
    siteName: 'PANWAR ENTERPRISES',
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RecyclingCenter',
    name: 'PANWAR ENTERPRISES',
    description:
      'B2B Industrial Scrap Buying and Scrap Collection Business with 35+ years of experience. Serving companies, manufacturing plants, factories, and warehouses across Gurugram, Manesar, Bawal, Neemrana, Rewari.',
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Village Tankri, Tehsil Bawal',
      addressLocality: 'Rewari',
      addressRegion: 'Haryana',
      postalCode: '123501',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      addressCountry: 'IN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    areaServed: [
      'Gurugram',
      'Manesar',
      'Bawal',
      'Neemrana',
      'Rewari',
      'Dharuhera',
      'Haryana',
    ],
    priceRange: 'Competitive Industrial Quotations',
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <MobileStickyBar />
      </body>
    </html>
  );
}
