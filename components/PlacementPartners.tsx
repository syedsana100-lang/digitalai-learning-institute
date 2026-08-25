'use client';

import { motion } from 'framer-motion';
import RevealSection from '@/components/RevealSection';

// No real hiring partners confirmed yet — showing empty, clearly-labeled slots
// instead of real company logos avoids implying partnerships that don't exist.
// Replace each slot's content with a real partner logo once a partnership is signed.
const partnerSlots = Array.from({ length: 8 }, (_, i) => i + 1);

export default function PlacementPartners() {
  return (
    <section className="section-light py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <RevealSection className="mb-10 text-center">
          <h2 className="font-display text-3xl font-extrabold lg:text-4xl">Placement Partners</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-mist">
            We&apos;re actively building hiring partnerships. Logos will appear here as
            partnerships are confirmed.
          </p>
        </RevealSection>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {partnerSlots.map((n, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              className="card-light flex h-20 items-center justify-center rounded-xl text-xs font-medium text-mist"
            >
              Partner Logo
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
