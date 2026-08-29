'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, Youtube, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import type { SanitySiteSettings } from '@/sanity/lib/queries';

const columns = [
  {
    title: 'Courses',
    links: [
      { label: 'Data Science', href: '/courses/data-science' },
      { label: 'Artificial Intelligence', href: '/courses/artificial-intelligence' },
      { label: 'Digital Marketing', href: '/courses/digital-marketing' },
      { label: 'Cyber Security', href: '/courses/cyber-security' },
      { label: 'Full Stack Development', href: '/courses/full-stack-development' },
    ],
  },
  {
    title: 'Quick Links',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Placement', href: '/career-support' },
      { label: 'Reviews', href: '/reviews' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQs', href: '/faq' },
      { label: 'Pay Fees', href: '/payment' },
      { label: 'Help Center', href: '/contact' },
      { label: 'Terms & Conditions', href: '/terms-and-conditions' },
      { label: 'Refund Policy', href: '/refund-policy' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
    ],
  },
];

export default function Footer({ settings }: { settings?: SanitySiteSettings | null }) {
  // Sanity Site Settings override the hardcoded defaults when published;
  // anything left empty in the CMS falls back to lib/site-config.ts.
  const logoUrl = settings?.footerLogoUrl || settings?.logoUrl || '/images/logo.png';
  const phone = settings?.phone || siteConfig.contact.phone;
  const email = settings?.email || siteConfig.contact.email;
  const address = settings?.address || siteConfig.contact.address;
  const footerDescription = settings?.footerDescription || siteConfig.brand.tagline;
  const copyrightText =
    settings?.copyrightText || `© ${new Date().getFullYear()} DigitalAI Learning Institute. All rights reserved.`;
  const socials = [
    { icon: Facebook, href: settings?.facebook || siteConfig.social.facebook, label: 'Facebook' },
    { icon: Instagram, href: settings?.instagram || siteConfig.social.instagram, label: 'Instagram' },
    { icon: Linkedin, href: settings?.linkedin || siteConfig.social.linkedin, label: 'LinkedIn' },
    { icon: Youtube, href: settings?.youtube || siteConfig.social.youtube, label: 'YouTube' },
    { icon: Twitter, href: settings?.twitter || '', label: 'Twitter/X' },
  ];

  return (
    <footer className="border-t border-white/5 bg-ink-950">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="focus-ring flex items-center gap-2.5" aria-label="DigitalAI Learning Institute — Home">
              <Image src={logoUrl} alt="DigitalAI Learning Institute logo" width={36} height={34} className="h-9 w-auto" />
              <span className="font-display text-lg font-extrabold">
                Digital<span className="text-gradient">AI</span> Learning Institute
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-mist">{footerDescription}</p>

            <div className="mt-5 space-y-2 text-sm text-mist">
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="focus-ring flex items-center gap-2 transition-colors hover:text-paper">
                <Phone className="h-3.5 w-3.5 text-signal-cyan" /> {phone}
              </a>
              <a href={`mailto:${email}`} className="focus-ring flex items-center gap-2 transition-colors hover:text-paper">
                <Mail className="h-3.5 w-3.5 text-signal-cyan" /> {email}
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-signal-cyan" /> {address}
              </span>
            </div>

            <div className="mt-5 flex gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href || '#'}
                  aria-label={s.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-mist transition-colors hover:border-signal-cyan/50 hover:text-signal-cyan hover:shadow-glow"
                >
                  <s.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-display text-sm font-semibold text-paper">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="focus-ring text-sm text-mist transition-colors hover:text-paper">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <p className="font-display text-sm font-semibold text-paper">Visit Our Centre</p>
            <div className="glass mt-4 overflow-hidden rounded-2xl">
              <iframe
                src={siteConfig.contact.mapEmbedUrl}
                width="100%"
                height="140"
                style={{ border: 0, filter: 'grayscale(0.4) invert(0.9) contrast(0.9)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DigitalAI Learning Institute Noida centre"
              />
            </div>

            <p className="mt-6 font-display text-sm font-semibold text-paper">Stay Updated</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-3 flex gap-2"
            >
              <input
                type="email"
                placeholder="Your email"
                className="focus-ring min-w-0 flex-1 rounded-full border border-white/10 bg-ink-900 px-4 py-2 text-xs text-paper placeholder:text-mist/50"
              />
              <button
                type="submit"
                className="focus-ring shrink-0 rounded-full bg-gradient-to-r from-signal-blue to-signal-violet px-4 py-2 text-xs font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 text-xs text-mist sm:flex-row sm:items-center">
          <p>{copyrightText}</p>
          <p>Online + Offline technical education institute serving students across India.</p>
        </div>
      </div>
    </footer>
  );
}
