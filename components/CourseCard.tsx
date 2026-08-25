'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, Signal } from 'lucide-react';
import type { Course } from '@/lib/courses-data';
import { categoryMeta } from '@/lib/courses-data';

export default function CourseCard({ course }: { course: Course }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className="group flex h-full flex-col rounded-2xl border border-white/8 bg-ink-900 p-6 transition-colors hover:border-signal-blue/50 hover:shadow-glow"
    >
      <p className="text-xs font-medium uppercase tracking-wide text-signal-cyan">
        {categoryMeta[course.category].label}
      </p>
      <h3 className="mt-2 font-display text-lg font-semibold">{course.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-mist">{course.shortDescription}</p>

      <div className="mt-4 flex flex-wrap gap-3 text-xs text-mist">
        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {course.durationLabel}</span>
        <span className="flex items-center gap-1"><Signal className="h-3.5 w-3.5" /> {course.level}</span>
        <span>Online</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {course.technologies.slice(0, 3).map((t) => (
          <span key={t} className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-mist transition-colors group-hover:border-signal-blue/40">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
        <span className="font-display text-sm font-semibold">
          {course.fee ? `₹${course.fee.toLocaleString('en-IN')}` : 'Fee on request'}
        </span>
        <Link href={`/courses/${course.slug}`} className="focus-ring flex items-center gap-1 text-sm font-semibold text-signal-cyan">
          View Course <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}
