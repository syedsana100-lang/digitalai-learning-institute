import { buildMetadata } from '@/lib/seo';
import RevealSection from '@/components/RevealSection';
import CTASection from '@/components/CTASection';

export const metadata = buildMetadata({
  title: 'About Us',
  description: 'Learn about DigitalAI Learning Institute — an India-wide online technical education institute.',
  path: '/about',
});

const sections = [
  { title: 'Our Story', text: 'DigitalAI Learning Institute was founded to make practical, career-oriented technology education accessible to students anywhere in India — not just those near a physical training centre.' },
  { title: 'Mission', text: 'To equip learners with real, applicable digital and technology skills through structured, project-based online education.' },
  { title: 'Vision', text: 'To be a trusted online learning institute that helps students across India build careers in AI, data, development and digital marketing.' },
  { title: 'Learning Philosophy', text: 'We believe skills are built by doing. Every program is structured around practical projects, not passive video-watching.' },
  { title: 'Technology-First Learning', text: 'Our curriculum stays close to the tools and technologies the industry actually uses today.' },
  { title: 'Student-Centric Approach', text: 'From flexible online scheduling to career support, every part of the experience is designed around the learner.' },
];

export default function AboutPage() {
  return (
    <div className="pt-16">
      <RevealSection className="mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h1 className="font-display text-4xl font-extrabold lg:text-5xl">About DigitalAI Learning Institute</h1>
        <p className="mt-4 text-mist leading-relaxed">
          An India-wide online technical education institute helping students build real, career-ready
          digital skills.
        </p>
      </RevealSection>

      <section className="mx-auto grid max-w-5xl gap-6 px-5 py-14 sm:grid-cols-2 lg:px-8">
        {sections.map((s, i) => (
          <RevealSection key={s.title} delay={i * 0.06}>
            <div className="h-full rounded-2xl border border-white/8 bg-ink-900 p-6">
              <h2 className="font-display text-lg font-semibold">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-mist">{s.text}</p>
            </div>
          </RevealSection>
        ))}
      </section>

      <CTASection
        headline="Ready to Build Your Digital Future?"
        text="Explore our online programs and take the first step toward a technology career."
      />
    </div>
  );
}
