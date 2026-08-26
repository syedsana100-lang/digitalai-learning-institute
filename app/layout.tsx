import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Manrope, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { GTMScript, GTMNoScript } from '@/components/GoogleTagManager';
import GTMRouteTracker from '@/components/GTMRouteTracker';
import { siteConfig } from '@/lib/site-config';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-ink-950 text-paper font-body antialiased">
        <GTMScript gtmId={siteConfig.analytics.gtmId} />
        <GTMNoScript gtmId={siteConfig.analytics.gtmId} />
        <Suspense fallback={null}>
          <GTMRouteTracker />
        </Suspense>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
