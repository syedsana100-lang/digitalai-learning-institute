import type { Metadata } from 'next';
import { FileText, Map, ClipboardList, BookOpenCheck, Mic, Layers } from 'lucide-react';
import RevealSection from '@/components/RevealSection';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Free Resources',
  description: 'Free guides, career roadmaps, cheat sheets and resources from DigitalAI Learning Institute.',
};

const resources = [
  { icon: Map, title: 'Career Roadmaps', text: 'Step-by-step paths for AI, Data Science, Development and Marketing careers.' },
  { icon: FileText, title: 'Free Guides', text: 'In-depth guides on core technology and digital marketing concepts.' },
  { icon: ClipboardList, title: 'Cheat Sheets', text: 'Quick-reference sheets for tools and technologies you\u2019ll use in class.' },
  { icon: BookOpenCheck, title: 'Course Brochures', text: 'Downloadable overviews of curriculum, duration and outcomes.' },
  { icon: Mic, title: 'Interview Resources', text: 'Common questions and preparation tips for technical interviews.' },
  { icon: Layers, title: 'Learning Resources', text: 'Curated external resources to support your self-study.' },
];

export default function ResourcesPage() {
  return (
    <div className="pt-16">
      <RevealSection className="mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h1 className="font-display text-4xl font-extrabold lg:text-5xl">Free Resources</h1>
        <p className="mt-4 text-mist leading-relaxed">
          Guides, roadmaps and reference material to support your learning — downloadable resources
          are coming soon.
        </p>
      </RevealSection>

      <section className="mx-auto grid max-w-6xl gap-5 px-5 py-14 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {resources.map((r, i) => (
          <RevealSection key={r.title} delay={i * 0.06}>
            <div className="h-full rounded-2xl border border-white/8 bg-ink-900 p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-signal-cyan">
                <r.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{r.text}</p>
              <span className="mt-3 inline-block rounded-full border border-white/10 px-3 py-1 text-[11px] text-mist">Coming Soon</span>
            </div>
          </RevealSection>
        ))}
      </section>

      <CTASection
        headline="Want Guidance Right Now?"
        text="Skip the wait — book a free counselling session and get personalized guidance today."
        primaryLabel="Book Free Counselling"
        primaryHref="/contact#counselling"
        secondaryLabel="Explore Courses"
        secondaryHref="/courses"
      />
    </div>
  );
}
