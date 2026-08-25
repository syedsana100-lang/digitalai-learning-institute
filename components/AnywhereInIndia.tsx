'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import RevealSection from '@/components/RevealSection';

export default function AnywhereInIndia() {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-20">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
      <div className="relative mx-auto max-w-4xl px-5 text-center lg:px-8">
        <RevealSection>
          <h2 className="font-display text-3xl font-extrabold lg:text-4xl">Learn From Anywhere in India</h2>
          <p className="mx-auto mt-5 max-w-2xl text-mist leading-relaxed">
            Whether you&apos;re a college student, graduate, working professional or career switcher,
            DigitalAI Learning Institute lets you develop practical digital and technology skills
            without being limited by location.
          </p>
        </RevealSection>

        <RevealSection delay={0.15} className="mt-10 flex flex-wrap justify-center gap-2.5">
          {siteConfig.studentCities.map((city, i) => (
            <motion.span
              key={city}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium text-mist"
            >
              <MapPin className="h-3 w-3 text-signal-cyan" /> {city}
            </motion.span>
          ))}
        </RevealSection>

        <p className="mt-6 text-xs text-mist/70">
          Students join online from these cities and across India — DigitalAI Learning currently operates
          as an online-only institute.
        </p>
      </div>
    </section>
  );
}
