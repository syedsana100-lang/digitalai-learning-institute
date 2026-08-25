'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';

const stats = [
  { value: 10, suffix: '+', label: 'Career-Focused Programs' },
  { value: 100, suffix: '+', label: 'Practical Learning Topics' },
  { value: null, display: 'Project-Based', label: 'Learning Approach' },
  { value: null, display: '[XX]%', label: 'Placement Support (update once available)' },
];

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

export default function StatsSection() {
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
