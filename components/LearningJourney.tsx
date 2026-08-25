'use client';

import RevealSection from '@/components/RevealSection';

const steps = [
  { n: '01', title: 'Choose Your Path', text: 'Pick a learning path aligned with your goals and current skill level.' },
  { n: '02', title: 'Learn With Experts', text: 'Attend structured live online sessions guided by practitioners.' },
  { n: '03', title: 'Practice With Projects', text: 'Apply concepts through hands-on, project-based assignments.' },
  { n: '04', title: 'Build Your Portfolio', text: 'Turn coursework into a portfolio that demonstrates real skill.' },
  { n: '05', title: 'Prepare For Your Career', text: 'Get resume, interview and career guidance to move forward.' },
];

export default function LearningJourney() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
      <RevealSection className="mb-14 text-center">
        <h2 className="font-display text-3xl font-extrabold lg:text-4xl">Your Learning Journey</h2>
      </RevealSection>

      <div className="relative">
        <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-signal-blue via-signal-violet to-transparent lg:left-1/2 lg:block" />
        <div className="space-y-10 lg:space-y-16">
          {steps.map((s, i) => (
            <RevealSection key={s.n} delay={i * 0.08}>
              <div className={`flex flex-col gap-4 lg:flex-row lg:items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-1 lg:text-right lg:[&:nth-child(2)]:text-left">
                  <div className={`rounded-2xl border border-white/8 bg-ink-900 p-6 ${i % 2 === 1 ? 'lg:text-left' : ''}`}>
                    <span className="font-mono text-xs text-signal-cyan">{s.n}</span>
                    <h3 className="mt-1 font-display text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm text-mist leading-relaxed">{s.text}</p>
                  </div>
                </div>
                <div className="hidden h-3 w-3 shrink-0 rounded-full bg-signal-cyan shadow-glow lg:block" />
                <div className="flex-1" />
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
