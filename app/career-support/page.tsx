import type { Metadata } from 'next';
import { Compass, FileText, Briefcase, Linkedin, Mic, Users2, FolderCheck, MessageSquareHeart, Search } from 'lucide-react';
import RevealSection from '@/components/RevealSection';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Career Support',
  description: 'Resume building, portfolio development, interview preparation and career guidance for DigitalAI Learning Institute students.',
};

const items = [
  { icon: Compass, title: 'Career Roadmap', text: 'A clear, personalized path from where you are to where you want to be.' },
  { icon: FileText, title: 'Resume Building', text: 'Craft a resume that highlights your practical, project-based skills.' },
  { icon: Briefcase, title: 'Portfolio Development', text: 'Turn your course projects into a portfolio recruiters notice.' },
  { icon: Linkedin, title: 'LinkedIn Profile Guidance', text: 'Optimize your profile to be found by recruiters in your field.' },
  { icon: Mic, title: 'Interview Preparation', text: 'Practice answering technical and behavioral questions with confidence.' },
  { icon: Users2, title: 'Mock Interviews', text: 'Simulated interviews with feedback to sharpen your delivery.' },
  { icon: FolderCheck, title: 'Project Review', text: 'Get expert feedback on your projects before you showcase them.' },
  { icon: MessageSquareHeart, title: 'Career Counselling', text: 'One-on-one guidance to help you make confident career decisions.' },
  { icon: Search, title: 'Job Search Guidance', text: 'Learn how to search, apply and follow up effectively.' },
];

export default function CareerSupportPage() {
  return (
    <div className="pt-16">
      <RevealSection className="mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h1 className="font-display text-4xl font-extrabold lg:text-5xl">Career Support</h1>
        <p className="mt-4 text-mist leading-relaxed">
          Learning a skill is one part of the journey — we help you turn it into a career, with
          guidance built into every program.
        </p>
      </RevealSection>

      <section className="mx-auto grid max-w-6xl gap-5 px-5 py-14 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {items.map((item, i) => (
          <RevealSection key={item.title} delay={i * 0.05}>
            <div className="h-full rounded-2xl border border-white/8 bg-ink-900 p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-signal-cyan">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{item.text}</p>
            </div>
          </RevealSection>
        ))}
      </section>

      <CTASection
        headline="Let's Plan Your Career Path"
        text="Book a free counselling session to talk through your goals and how our career support fits in."
      />
    </div>
  );
}
