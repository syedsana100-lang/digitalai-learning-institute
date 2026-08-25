'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-white/8 rounded-2xl border border-white/8 bg-ink-900">
      {items.map((item, i) => (
        <div key={item.question}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="focus-ring flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            aria-expanded={open === i}
          >
            <span className="font-display text-sm font-semibold sm:text-base">{item.question}</span>
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
                <p className="px-6 pb-5 text-sm leading-relaxed text-mist">{item.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
