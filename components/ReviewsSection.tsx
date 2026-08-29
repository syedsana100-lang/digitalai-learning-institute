'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import RevealSection from '@/components/RevealSection';
import type { SanityTestimonial } from '@/sanity/lib/queries';

// PLACEHOLDER — replace avatar seeds, names, and quotes with real, consented student
// reviews before publishing. Avatars are auto-generated placeholder images.
// Used only until real testimonials are published in Sanity (Testimonials section).
const placeholderReviews: { name: string; course: string; designation: string; company: string; rating: number; quote: string; seed: string; photoUrl?: string }[] = [
  { name: '[Student Name]', course: 'Data Science', designation: '[Job Title]', company: '[Company]', rating: 5, quote: 'Placeholder review — replace with a real, consented student review before publishing.', seed: 'student1' },
  { name: '[Student Name]', course: 'Full Stack Development', designation: '[Job Title]', company: '[Company]', rating: 5, quote: 'Placeholder review — replace with a real, consented student review before publishing.', seed: 'student2' },
  { name: '[Student Name]', course: 'Digital Marketing', designation: '[Job Title]', company: '[Company]', rating: 4, quote: 'Placeholder review — replace with a real, consented student review before publishing.', seed: 'student3' },
];

// PLACEHOLDER — replace with the real Google Business Profile rating and review count
// once available. Do not publish invented numbers.
const googleRating = { score: 4.8, count: '[X]' };

export default function ReviewsSection({ testimonials }: { testimonials?: SanityTestimonial[] }) {
  // Real, published Sanity testimonials replace the placeholder reviews below
  // once at least one exists — until then the clearly-marked placeholders stay.
  const studentReviews =
    testimonials && testimonials.length > 0
      ? testimonials.map((t, i) => ({
          name: t.name,
          course: t.course || '',
          designation: t.designation || '',
          company: '',
          rating: t.rating,
          quote: t.review,
          seed: `sanity-${i}`,
          photoUrl: t.photoUrl,
        }))
      : placeholderReviews;

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <RevealSection className="mb-4 text-center">
        <h2 className="font-display text-3xl font-extrabold lg:text-4xl">What Students Say</h2>
      </RevealSection>

      <RevealSection delay={0.05} className="mx-auto mb-12 flex w-fit items-center gap-3 rounded-full border border-white/8 bg-ink-900 px-5 py-2.5">
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09A6.94 6.94 0 0 1 5.44 12c0-.73.13-1.44.4-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        <div className="flex items-center gap-1.5">
          <span className="font-display text-sm font-bold">{googleRating.score}</span>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(googleRating.score) ? 'fill-signal-cyan text-signal-cyan' : 'text-white/15'}`} />
            ))}
          </div>
        </div>
        <span className="text-xs text-mist">{googleRating.count} Google reviews</span>
      </RevealSection>

      <div className="grid gap-5 sm:grid-cols-3">
        {studentReviews.map((r, i) => (
          <RevealSection key={r.seed} delay={i * 0.08}>
            <motion.div whileHover={{ y: -3 }} className="glass h-full rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <img
                  src={r.photoUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${r.seed}`}
                  alt=""
                  aria-hidden="true"
                  className="h-11 w-11 shrink-0 rounded-full bg-white/5"
                  loading="lazy"
                />
                <div>
                  <p className="font-display text-sm font-semibold">{r.name}</p>
                  <p className="text-xs text-mist">{[r.designation, r.company].filter(Boolean).join(' • ')}</p>
                </div>
              </div>
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className={`h-3.5 w-3.5 ${idx < r.rating ? 'fill-signal-cyan text-signal-cyan' : 'text-white/15'}`} />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-mist">&ldquo;{r.quote}&rdquo;</p>
              <p className="mt-3 text-xs text-signal-cyan">{r.course} graduate</p>
            </motion.div>
          </RevealSection>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-mist/60">
        Reviews above are placeholders clearly marked for replacement — see /reviews for details.
      </p>
    </section>
  );
}
