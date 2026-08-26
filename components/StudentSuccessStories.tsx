'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Building2 } from 'lucide-react';
import RevealSection from '@/components/RevealSection';

// PLACEHOLDER DATA — no real placement outcomes confirmed yet. Replace each entry with
// a real, consented student outcome (name, course, before/after role or salary, company)
// once available. Do not publish invented figures.
const stories = [
  { name: '[Student Name]', course: 'Data Science', before: '[Before Role/Salary]', after: '[After Role/Salary]', company: '[Company Name]', seed: 'success1' },
  { name: '[Student Name]', course: 'Full Stack Development', before: '[Before Role/Salary]', after: '[After Role/Salary]', company: '[Company Name]', seed: 'success2' },
  { name: '[Student Name]', course: 'Cyber Security', before: '[Before Role/Salary]', after: '[After Role/Salary]', company: '[Company Name]', seed: 'success3' },
];

export default function StudentSuccessStories() {
  return (
    <section className="bg-ink-900 py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <RevealSection className="mb-4 text-center">
          <h2 className="font-display text-3xl font-extrabold lg:text-4xl">Student Success Stories</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-mist">
            The stories below are placeholders — real, consented student outcomes will
            replace them as they become available.
          </p>
        </RevealSection>

        <div className="grid gap-6 lg:grid-cols-3">
          {stories.map((s, i) => (
            <RevealSection key={s.seed} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="overflow-hidden rounded-2xl border border-white/8 bg-ink-950"
              >
                <img
                  src={`https://picsum.photos/seed/${s.seed}/500/300`}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-44 w-full object-cover"
                />
                <div className="p-6">
                  <p className="font-display text-base font-semibold">{s.name}</p>
                  <p className="text-xs text-mist">{s.course}</p>

                  <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/8 bg-ink-900 p-3 text-xs">
                    <span className="text-mist">{s.before}</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-signal-cyan" />
                    <span className="font-semibold text-signal-cyan">{s.after}</span>
                  </div>

                  <div className="mt-4 flex items-center gap-1.5 text-xs text-mist">
                    <Building2 className="h-3.5 w-3.5" /> {s.company}
                  </div>
                </div>
              </motion.div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
