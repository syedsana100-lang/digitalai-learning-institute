'use client';

import { motion } from 'framer-motion';
import RevealSection from '@/components/RevealSection';

const skills = [
  'Python', 'SQL', 'React', 'JavaScript', 'Java', 'Machine Learning',
  'Generative AI', 'Google Ads', 'SEO', 'Meta Ads', 'AWS', 'Docker',
  'Cyber Security', 'Figma',
];

export default function SkillStack() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-20 lg:px-8">
      <RevealSection className="mb-10 text-center">
        <h2 className="font-display text-3xl font-extrabold lg:text-4xl">The Skill Stack You&apos;ll Build</h2>
      </RevealSection>
      <div className="flex flex-wrap justify-center gap-3">
        {skills.map((s, i) => (
          <motion.span
            key={s}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.08, borderColor: 'rgba(61,107,255,0.6)' }}
            transition={{ delay: i * 0.03 }}
            className="cursor-default rounded-full border border-white/10 bg-ink-900 px-4 py-2 text-sm font-medium text-mist transition-colors hover:text-paper"
          >
            {s}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
