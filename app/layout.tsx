import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Manrope, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import SiteChrome from '@/components/SiteChrome';
import { GoogleTagManagerScript, GoogleTagManagerNoScript } from '@/components/GoogleTagManager';
import GTMRouteTracker from '@/components/GTMRouteTracker';
import { siteConfig } from '@/lib/site-config';
import { fetchSanitySiteSettings } from '@/sanity/lib/queries';
import { auth } from '@/auth';

const display = Manrope({ subsets: ['latin'], variable: '--font-display', weight: ['500', '600', '700', '800'] });
const body = Inter({ subsets: ['latin'], variable: '--font-body', weight: ['400', '500', '600'] });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '500'] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.brand.domain),
  title: {
    default: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
    template: `%s | ${siteConfig.brand.shortName}`,
  },
  description:
    'Build practical technology and digital skills through structured online learning, projects, mentorship and career-focused guidance — from anywhere in India.',
  openGraph: {
    type: 'website',
    siteName: siteConfig.brand.name,
    locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image' },
  verification: {
    google: 'VVqnirWxtYtL67xab7qFG-E7cCy4HNlUBnloHeXN_gg',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: siteConfig.brand.name,
  alternateName: siteConfig.brand.shortName,
  url: siteConfig.brand.domain,
  description:
    'India-wide online and offline technical education institute offering practical courses in AI, Data Science, Programming, Digital Marketing, Cloud and Cyber Security.',
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  address: { '@type': 'PostalAddress', addressLocality: 'Noida', addressRegion: 'Uttar Pradesh', addressCountry: 'IN' },
  areaServed: 'IN',
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: `${siteConfig.brand.name} — Noida Centre`,
  image: `${siteConfig.brand.domain}/og-image.jpg`,
  telephone: siteConfig.contact.phone,
  email: siteConfig.contact.email,
  address: { '@type': 'PostalAddress', addressLocality: 'Noida', addressRegion: 'Uttar Pradesh', addressCountry: 'IN' },
  url: siteConfig.brand.domain,
  priceRange: '₹₹',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Site-wide branding/contact/nav/footer content from Sanity, when published.
  // `null` (Sanity not configured, or no document yet) means Header/Footer
  // fall back to lib/site-config.ts exactly as before.
  const [settings, session] = await Promise.all([fetchSanitySiteSettings(), auth()]);

  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <GoogleTagManagerScript />
      </head>
      <body className="bg-ink-950 text-paper font-body antialiased">
        <GoogleTagManagerNoScript />
        <Suspense fallback={null}>
          <GTMRouteTracker />
        </Suspense>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <SiteChrome settings={settings} role={session?.user?.role}>
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
