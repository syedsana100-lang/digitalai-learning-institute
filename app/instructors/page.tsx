import type { Metadata } from 'next';
import { instructors } from '@/lib/instructors-data';
import RevealSection from '@/components/RevealSection';

export const metadata: Metadata = {
  title: 'Instructors',
  description: 'Meet the instructors teaching DigitalAI Learning Institute online courses.',
};

export default function InstructorsPage() {
  return (
    <div className="pt-16 pb-20">
      <RevealSection className="mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h1 className="font-display text-4xl font-extrabold lg:text-5xl">Our Instructors</h1>
        <p className="mt-4 text-mist leading-relaxed">Learn from practitioners with real industry experience.</p>
      </RevealSection>

      <section className="mx-auto grid max-w-5xl gap-5 px-5 py-14 sm:grid-cols-2 lg:px-8">
        {instructors.map((ins, i) => (
          <RevealSection key={ins.id} delay={i * 0.06}>
            <div className="flex gap-4 rounded-2xl border border-white/8 bg-ink-900 p-6">
              <div className="h-16 w-16 shrink-0 rounded-full bg-white/10" aria-hidden="true" />
              <div>
                <p className="font-display font-semibold">{ins.name}</p>
                <p className="text-xs text-mist">{ins.role} • {ins.experience}</p>
                <p className="mt-2 text-sm text-mist">{ins.bio}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {ins.expertise.map((e) => (
                    <span key={e} className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-mist">{e}</span>
                  ))}
                </div>
              </div>
            </div>
          </RevealSection>
        ))}
      </section>
    </div>
  );
}
