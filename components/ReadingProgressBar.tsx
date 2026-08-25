'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-[2.5px] w-full origin-left bg-gradient-to-r from-signal-blue via-signal-violet to-signal-cyan"
      aria-hidden="true"
    />
  );
}
