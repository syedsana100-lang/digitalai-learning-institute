'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export interface Testimonial {
  name: string;
  city: string;
  course: string;
  rating: number;
  quote: string;
}

export default function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const t = items[index];

  return (
    <div className="mx-auto max-w-2xl">
      <div className="relative min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-white/8 bg-ink-900 p-8 text-center"
          >
            <div className="flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < t.rating ? 'fill-signal-cyan text-signal-cyan' : 'text-white/15'}`} />
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-mist">&ldquo;{t.quote}&rdquo;</p>
            <p className="mt-5 font-display text-sm font-semibold">{t.name}</p>
            <p className="text-xs text-mist">{t.city} • {t.course}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          aria-label="Previous testimonial"
          onClick={() => setIndex((index - 1 + items.length) % items.length)}
          className="focus-ring rounded-full border border-white/10 p-2 hover:bg-white/5"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-5 bg-signal-cyan' : 'w-1.5 bg-white/20'}`}
            />
          ))}
        </div>
        <button
          aria-label="Next testimonial"
          onClick={() => setIndex((index + 1) % items.length)}
          className="focus-ring rounded-full border border-white/10 p-2 hover:bg-white/5"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
