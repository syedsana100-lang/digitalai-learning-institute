'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { CurriculumModule } from '@/lib/courses-data';

export default function CurriculumAccordion({ modules }: { modules: CurriculumModule[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {modules.map((m, i) => (
        <div key={m.title} className="overflow-hidden rounded-2xl border border-white/8 bg-ink-900">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="focus-ring flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            aria-expanded={open === i}
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-signal-cyan">Module {String(i + 1).padStart(2, '0')}</span>
              <div>
                <p className="font-display text-sm font-semibold sm:text-base">{m.title}</p>
                <p className="text-xs text-mist">{m.lessons} lessons • {m.durationLabel}</p>
              </div>
            </div>
            <ChevronDown className={`h-4 w-4 shrink-0 text-mist transition-transform ${open === i ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5">
                  <p className="text-sm text-mist">{m.summary}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {m.topics.map((t) => (
                      <li key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs text-mist">{t}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
