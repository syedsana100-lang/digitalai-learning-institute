'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Code2, LifeBuoy, Infinity as InfinityIcon } from 'lucide-react';
import AnimatedHeroVisual from '@/components/AnimatedHeroVisual';
import type { SanityHomepage } from '@/sanity/lib/queries';

const tags = [
  { label: 'AI', top: '8%', left: '4%' },
  { label: 'Python', top: '2%', left: '58%' },
  { label: 'Data Science', top: '22%', left: '80%' },
  { label: 'GenAI', top: '55%', left: '2%' },
  { label: 'SEO', top: '78%', left: '10%' },
  { label: 'Digital Marketing', top: '85%', left: '55%' },
  { label: 'Cloud', top: '65%', left: '85%' },
];

const trustBadges = [
  { icon: Award, label: 'Industry Experts' },
  { icon: Code2, label: 'Live Projects' },
  { icon: LifeBuoy, label: 'Placement Support' },
  { icon: InfinityIcon, label: 'Lifetime Access' },
];

// Default copy, used whenever the Sanity Homepage document (or an individual
// field on it) is empty — publishing a partially-filled document never
// breaks this section.
const defaults = {
  eyebrow: 'India-wide Online + Offline Technical Learning Institute',
  heading: 'Build the Skills That',
  highlight: 'Power the Digital Future',
  description:
    'Learn AI, Data Science, Programming, Digital Marketing, Cloud and Cyber Security through practical training — with live mentorship, project-based learning and placement support.',
  primaryLabel: 'Enroll Now',
  primaryHref: '/contact#counselling',
  secondaryLabel: 'Explore Courses',
  secondaryHref: '/courses',
};

export default function Hero({ homepage }: { homepage?: SanityHomepage | null }) {
  const heading = homepage?.heroHeading || defaults.heading;
  const highlight = homepage?.heroHighlight || defaults.highlight;
  const description = homepage?.heroDescription || defaults.description;
  const primaryLabel = homepage?.heroPrimaryCtaText || defaults.primaryLabel;
  const primaryHref = homepage?.heroPrimaryCtaLink || defaults.primaryHref;
  const secondaryLabel = homepage?.heroSecondaryCtaText || defaults.secondaryLabel;
  const secondaryHref = homepage?.heroSecondaryCtaLink || defaults.secondaryHref;
  const isPrimaryExternal = primaryHref.startsWith('http') || primaryHref.startsWith('tel:');

  return (
    <section className="relative overflow-hidden bg-mesh-gradient pb-16 pt-16 lg:pb-20 lg:pt-20">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-8 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="mb-5 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-mist">
            {defaults.eyebrow}
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            {heading} <span className="text-gradient">{highlight}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-mist lg:text-lg">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {isPrimaryExternal ? (
              <a
                href={primaryHref}
                target={primaryHref.startsWith('tel:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="focus-ring flex items-center gap-2 rounded-full bg-gradient-to-r from-signal-blue to-signal-violet px-7 py-3.5 text-sm font-semibold shadow-glow transition-transform duration-150 hover:scale-[1.03] active:scale-95"
              >
                {primaryLabel} <ArrowRight className="h-4 w-4" />
              </a>
            ) : (
              <Link
                href={primaryHref}
                className="focus-ring flex items-center gap-2 rounded-full bg-gradient-to-r from-signal-blue to-signal-violet px-7 py-3.5 text-sm font-semibold shadow-glow transition-transform duration-150 hover:scale-[1.03] active:scale-95"
              >
                {primaryLabel} <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            <Link
              href={secondaryHref}
              className="focus-ring group flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold transition-all duration-150 hover:bg-white/5 active:scale-95"
            >
              {secondaryLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {trustBadges.map((b) => (
              <span key={b.label} className="flex items-center gap-1.5 text-xs text-mist">
                <b.icon className="h-3.5 w-3.5 text-signal-cyan" /> {b.label}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="relative">
          {homepage?.heroImageUrl ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 shadow-glow">
              <Image
                src={homepage.heroImageUrl}
                alt={homepage.heroImageAlt || 'DigitalAI Learning Institute'}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 560px, 100vw"
              />
            </div>
          ) : (
            <AnimatedHeroVisual />
          )}
          {tags.map((t, i) => (
            <motion.span
              key={t.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
              className="animate-float glass absolute hidden rounded-full px-3 py-1.5 text-[11px] font-medium text-mist sm:block"
              style={{ top: t.top, left: t.left, animationDelay: `${i * 0.5}s` }}
            >
              {t.label}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
