'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BrainCircuit, Code2, LayoutGrid, Megaphone, ShieldCheck, Palette, ArrowUpRight } from 'lucide-react';
import { categoryMeta, getCoursesByCategory, type CourseCategory } from '@/lib/courses-data';
import RevealSection from '@/components/RevealSection';

const icons: Record<CourseCategory, any> = {
  'ai-data': BrainCircuit,
  programming: Code2,
  development: LayoutGrid,
  'digital-marketing': Megaphone,
  'cloud-security': ShieldCheck,
  design: Palette,
};

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <RevealSection className="mb-12 text-center">
        <h2 className="font-display text-3xl font-extrabold lg:text-4xl">Explore Learning Paths</h2>
      </RevealSection>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {(Object.keys(categoryMeta) as CourseCategory[]).map((cat, i) => {
          const Icon = icons[cat];
          const meta = categoryMeta[cat];
          const popular = getCoursesByCategory(cat).slice(0, 3);
          return (
            <RevealSection key={cat} delay={i * 0.06}>
              <motion.div whileHover={{ y: -4 }} className="h-full rounded-2xl border border-white/8 bg-ink-900 p-6 transition-colors hover:border-signal-cyan/40">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-signal-violet">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-semibold">{meta.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{meta.description}</p>
                {popular.length > 0 && (
                  <ul className="mt-4 space-y-1">
                    {popular.map((c) => (
                      <li key={c.id} className="text-xs text-mist">• {c.title}</li>
                    ))}
                  </ul>
                )}
                <Link
                  href={`/courses?category=${cat}`}
                  className="focus-ring mt-5 inline-flex items-center gap-1 text-sm font-semibold text-signal-cyan"
                >
                  View courses <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            </RevealSection>
          );
        })}
      </div>
    </section>
  );
}
