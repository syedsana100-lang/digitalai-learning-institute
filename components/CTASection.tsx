'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import RevealSection from '@/components/RevealSection';
import { siteConfig } from '@/lib/site-config';

function CTAButton({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  const external = href.startsWith('http') || href.startsWith('tel:');
  if (external) {
    return (
      <a href={href} target={href.startsWith('tel:') ? undefined : '_blank'} rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return <Link href={href} className={className}>{children}</Link>;
}

export default function CTASection({
  headline,
  text,
  primaryLabel = 'Explore Courses',
  primaryHref = '/courses',
  secondaryLabel = 'Book Free Counselling',
  secondaryHref = '/contact#counselling',
  showCallNow = false,
}: {
  headline: string;
  text: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  showCallNow?: boolean;
}) {
  return (
    <section className="relative mx-5 mb-20 overflow-hidden rounded-3xl border border-white/8 lg:mx-8">
      <motion.div
        className="absolute inset-0 bg-mesh-gradient"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'mirror', ease: 'linear' }}
      />
      <div className="pointer-events-none absolute -left-10 top-10 h-40 w-40 rounded-full bg-signal-blue/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-10 h-48 w-48 rounded-full bg-signal-violet/20 blur-3xl" />
      <div className="relative mx-auto max-w-3xl px-6 py-20 text-center">
        <RevealSection>
          <h2 className="font-display text-3xl font-extrabold lg:text-4xl">{headline}</h2>
          <p className="mx-auto mt-4 max-w-xl text-mist leading-relaxed">{text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CTAButton
              href={primaryHref}
              className="focus-ring rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform duration-150 hover:scale-[1.03] active:scale-95"
            >
              {primaryLabel}
            </CTAButton>
            <CTAButton
              href={secondaryHref}
              className="focus-ring rounded-full bg-gradient-to-r from-signal-blue to-signal-violet px-7 py-3.5 text-sm font-semibold shadow-glow transition-transform duration-150 hover:scale-[1.03] active:scale-95"
            >
              {secondaryLabel}
            </CTAButton>
            {showCallNow && (
              <CTAButton
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                className="focus-ring flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold transition-all duration-150 hover:bg-white/5 active:scale-95"
              >
                <Phone className="h-4 w-4" /> Call Now
              </CTAButton>
            )}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
