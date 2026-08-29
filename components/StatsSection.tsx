'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';

const defaultStats = [
  { value: 10, suffix: '+', label: 'Career-Focused Programs' },
  { value: 100, suffix: '+', label: 'Practical Learning Topics' },
  { value: null, display: 'Project-Based', label: 'Learning Approach' },
  { value: null, display: 'Online + Offline', label: 'Learning Across India' },
];

/** Splits a CMS stat value like "10+" into a numeric part (for the count-up
 * animation) and a suffix, or falls back to a plain string display (e.g.
 * "Online + Offline") when it doesn't start with a number. */
function parseStatValue(raw: string): { value: number; suffix: string } | { value: null; display: string } {
  const match = raw.match(/^(\d+)(.*)$/);
  if (match) return { value: Number(match[1]), suffix: match[2] };
  return { value: null, display: raw };
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(0);
  const mv = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, mv]);

  return (
    <span ref={ref} className="font-display text-4xl font-extrabold text-gradient lg:text-5xl">
      {display}
      {suffix}
    </span>
  );
}

export default function StatsSection({ stats: cmsStats }: { stats?: { value: string; label: string }[] }) {
  // A Sanity Homepage document with Trust/Statistics filled in overrides the
  // defaults below; an empty or missing document keeps the original stats.
  const stats =
    cmsStats && cmsStats.length > 0
      ? cmsStats.map((s) => ({ ...parseStatValue(s.value), label: s.label }))
      : defaultStats;

  return (
    <section className="border-y border-white/5 bg-ink-900 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 lg:grid-cols-4 lg:px-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="text-center"
          >
            {s.value !== null ? (
              <Counter value={s.value} suffix={s.suffix ?? ''} />
            ) : (
              <span className="font-display text-3xl font-extrabold text-gradient lg:text-4xl">{s.display}</span>
            )}
            <p className="mt-2 text-sm text-mist">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
