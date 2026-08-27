import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import {
  Compass, Target, Eye, Hammer, Users2, Lightbulb, ShieldCheck, TrendingUp, Infinity as InfinityIcon,
  BookOpenCheck, UserCog, FileCheck2, Rocket, Award, LifeBuoy, FileText, Linkedin, FolderCheck,
  Briefcase, ArrowRight, CheckCircle2, XCircle,
} from 'lucide-react';
import RevealSection from '@/components/RevealSection';
import CTASection from '@/components/CTASection';
import FAQAccordion from '@/components/FAQAccordion';
import { instructors } from '@/lib/instructors-data';
import { aboutPageFAQs } from '@/lib/about-faq-data';
import { siteConfig } from '@/lib/site-config';

export const metadata = buildMetadata({
  title: 'About Us — Our Story, Mission & Approach to Practical Education',
  description: 'Learn why DigitalAI Learning Institute was founded, our mission, learning methodology, and how we support students from enrollment to career outcomes — online and at our Noida centre.',
  path: '/about',
});

const coreValues = [
  { icon: Hammer, title: 'Practical Learning', text: 'We measure progress by what you can build, not what you\u2019ve watched.' },
  { icon: TrendingUp, title: 'Student Success', text: 'Every design decision starts from what actually helps a learner reach their goal.' },
  { icon: Lightbulb, title: 'Innovation', text: 'Our curriculum evolves as fast as the tools and techniques the industry actually uses.' },
  { icon: ShieldCheck, title: 'Integrity', text: 'No fake stats, no guaranteed-placement claims — just honest information you can act on.' },
  { icon: Briefcase, title: 'Career Readiness', text: 'Every course is built with an eye toward what employers actually screen for.' },
  { icon: InfinityIcon, title: 'Lifelong Learning', text: 'Technology keeps changing — we aim to build learners who keep adapting with it.' },
];

const whyChoose = [
  { icon: BookOpenCheck, title: 'Industry-Aligned Curriculum', text: 'Course content is built around the tools and skills currently used in the field, not outdated syllabi.' },
  { icon: UserCog, title: 'Expert-Led Training', text: 'Learn from instructors with relevant hands-on industry experience.' },
  { icon: Hammer, title: 'Real Projects', text: 'Every program includes practical, portfolio-worthy project work.' },
  { icon: Compass, title: 'Flexible Learning', text: 'Live and recorded sessions let you learn around your schedule.' },
  { icon: FileCheck2, title: 'Certification', text: 'Earn a certificate tied to demonstrated project completion, not just attendance.' },
  { icon: LifeBuoy, title: 'Career Support', text: 'Resume, interview and portfolio support built into Professional and Premium plans.' },
  { icon: Rocket, title: 'Job-Oriented Learning', text: 'Curriculum designed around the roles and skills you\u2019re actually working toward.' },
  { icon: Award, title: 'Hands-On Training', text: 'Concepts are reinforced through practice, not just lectures.' },
];

const methodology = [
  { step: '01', title: 'Learn', text: 'Build a solid conceptual foundation through structured lessons and live sessions.' },
  { step: '02', title: 'Practice', text: 'Apply concepts through guided exercises before moving to independent work.' },
  { step: '03', title: 'Build', text: 'Create real, portfolio-worthy projects using industry-standard tools.' },
  { step: '04', title: 'Validate', text: 'Get feedback on your work from mentors and refine based on real critique.' },
  { step: '05', title: 'Apply', text: 'Translate your skills and projects into interview-ready career materials.' },
];

const careerSupport = [
  { icon: FileText, title: 'Resume Guidance', text: 'Craft a resume that highlights your practical, project-based skills.' },
  { icon: Users2, title: 'Interview Preparation', text: 'Practice technical and behavioral interview questions with feedback.' },
  { icon: UserCog, title: 'Career Mentoring', text: 'One-on-one guidance to help you make confident career decisions.' },
  { icon: Linkedin, title: 'LinkedIn Optimization', text: 'Optimize your profile to be found by recruiters in your field.' },
  { icon: FolderCheck, title: 'Portfolio Development', text: 'Turn your course projects into a portfolio that gets noticed.' },
  { icon: LifeBuoy, title: 'Placement Assistance', text: 'Support connecting your new skills to real job opportunities.' },
];

const comparison = [
  { factor: 'Learning Format', traditional: 'Fixed classroom schedule', digitalai: 'Live + recorded, learn on your schedule' },
  { factor: 'Curriculum Focus', traditional: 'Theory-heavy, exam-oriented', digitalai: 'Practical, project-based' },
  { factor: 'Career Support', traditional: 'Often limited or absent', digitalai: 'Resume, interview & portfolio support included' },
  { factor: 'Mentorship', traditional: 'Large batches, limited access', digitalai: 'Direct mentor feedback on real work' },
  { factor: 'Real Projects', traditional: 'Rare or simulated only', digitalai: 'Built into every course' },
];

export default function AboutPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: aboutPageFAQs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <div className="pb-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* SECTION 1 — HERO */}
      <section className="relative overflow-hidden bg-mesh-gradient pb-16 pt-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
        <RevealSection className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
          <h1 className="font-display text-4xl font-extrabold leading-tight lg:text-5xl">
            Learn Today. <span className="text-gradient">Lead Tomorrow.</span>
          </h1>
          <p className="mt-5 text-mist leading-relaxed">
            DigitalAI Learning Institute helps students and working professionals gain practical,
            industry-ready skills through expert-led training, real-world projects, mentorship and
            career-focused learning.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/courses" className="focus-ring rounded-full bg-gradient-to-r from-signal-blue to-signal-violet px-7 py-3.5 text-sm font-semibold shadow-glow transition-transform duration-150 hover:scale-[1.03] active:scale-95">
              Explore Courses
            </Link>
            <Link href="/contact#counselling" className="focus-ring rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold transition-all duration-150 hover:bg-white/5 active:scale-95">
              Book Free Career Guidance
            </Link>
          </div>
        </RevealSection>
      </section>

      {/* SECTION 2 — OUR STORY */}
      <section className="mx-auto max-w-4xl px-5 py-16 lg:px-8">
        <RevealSection>
          <h2 className="mb-5 font-display text-2xl font-bold lg:text-3xl">Our Story</h2>
          <div className="space-y-4 text-sm leading-relaxed text-mist sm:text-base">
            <p>Most technical education still asks the same question it did a decade ago: can you pass the exam? But the market has moved on. Employers today ask something harder to fake — can you actually do the work? That gap, between what gets taught and what gets tested for in real hiring, is the reason DigitalAI Learning Institute exists.</p>
            <p>We saw students finishing degrees and certifications with strong theoretical knowledge but no way to demonstrate it — no project they could walk an interviewer through, no portfolio, no sense of how the skill they\u2019d learned actually got applied in a real job. That gap doesn\u2019t close by watching more videos. It closes by building things, getting feedback, and doing it again.</p>
            <p>At the same time, geography was quietly deciding who got access to good training and who didn\u2019t. A student in a smaller city often had fewer quality options nearby than someone in a metro, regardless of ability or ambition. Online, flexible learning isn\u2019t a lesser substitute for that — done properly, with real mentorship and real projects, it\u2019s often the better option, because it removes location as a constraint entirely.</p>
            <p>DigitalAI Learning Institute was built around those two ideas: education should be judged by what you can do afterward, not just what you can recall, and where you live shouldn\u2019t decide the quality of training available to you. Everything in how we structure our courses — the project-first curriculum, the live-plus-recorded format, the career support built into our plans — comes back to closing that gap for the people who enroll with us.</p>
          </div>
        </RevealSection>
      </section>

      {/* SECTION 3 & 4 — MISSION & VISION */}
      <section className="section-light py-16">
        <div className="mx-auto grid max-w-5xl gap-6 px-5 sm:grid-cols-2 lg:px-8">
          <RevealSection>
            <div className="card-light h-full rounded-2xl p-7">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-signal-blue/10 text-signal-blue">
                <Target className="h-5 w-5" />
              </div>
              <h2 className="font-display text-xl font-bold">Our Mission</h2>
              <p className="mt-3 text-sm leading-relaxed text-mist">
                To make practical, industry-relevant technology education accessible to every learner
                in India — regardless of location or background — through project-based courses that
                build real, demonstrable career skills rather than passive knowledge.
              </p>
            </div>
          </RevealSection>
          <RevealSection delay={0.08}>
            <div className="card-light h-full rounded-2xl p-7">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-signal-violet/10 text-signal-violet">
                <Eye className="h-5 w-5" />
              </div>
              <h2 className="font-display text-xl font-bold">Our Vision</h2>
              <p className="mt-3 text-sm leading-relaxed text-mist">
                To become a leading skill development platform for India\u2019s digital economy —
                empowering learners across every city and background with future-ready education
                that keeps pace with how technology and hiring actually evolve.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* SECTION 5 — CORE VALUES */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <RevealSection className="mb-10 text-center">
          <h2 className="font-display text-2xl font-bold lg:text-3xl">Our Core Values</h2>
        </RevealSection>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((v, i) => (
            <RevealSection key={v.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-white/8 bg-ink-900 p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-signal-cyan">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{v.text}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* SECTION 6 — WHY CHOOSE DIGITALAI */}
      <section className="section-light py-16">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <RevealSection className="mb-10 text-center">
            <h2 className="font-display text-2xl font-bold lg:text-3xl">Why Choose DigitalAI Learning</h2>
          </RevealSection>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyChoose.map((w, i) => (
              <RevealSection key={w.title} delay={i * 0.05}>
                <div className="card-light h-full rounded-2xl p-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-signal-blue/10 text-signal-blue">
                    <w.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-sm font-semibold">{w.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-mist">{w.text}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — LEARNING METHODOLOGY */}
      <section className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <RevealSection className="mb-10 text-center">
          <h2 className="font-display text-2xl font-bold lg:text-3xl">Our Learning Methodology</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-mist">
            How a student moves from enrolling to being genuinely job-ready.
          </p>
        </RevealSection>
        <div className="grid gap-4 sm:grid-cols-5">
          {methodology.map((m, i) => (
            <RevealSection key={m.step} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-white/8 bg-ink-900 p-5 text-center">
                <span className="font-mono text-xs text-signal-cyan">{m.step}</span>
                <h3 className="mt-2 font-display text-sm font-semibold">{m.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-mist">{m.text}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* SECTION 8 — CAREER SUPPORT FRAMEWORK */}
      <section className="section-light py-16">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <RevealSection className="mb-10 text-center">
            <h2 className="font-display text-2xl font-bold lg:text-3xl">Career Support Framework</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-mist">
              Included on Professional and Premium plans — see the <Link href="/fees" className="text-signal-blue underline">Fees page</Link> for details.
            </p>
          </RevealSection>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {careerSupport.map((c, i) => (
              <RevealSection key={c.title} delay={i * 0.06}>
                <div className="card-light h-full rounded-2xl p-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-signal-violet/10 text-signal-violet">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-sm font-semibold">{c.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-mist">{c.text}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — STUDENT SUCCESS FOCUS (no fake stats) */}
      <section className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <RevealSection className="mb-10 text-center">
          <h2 className="font-display text-2xl font-bold lg:text-3xl">What We Focus On for Every Student</h2>
        </RevealSection>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: BookOpenCheck, label: 'Learning Outcomes', text: 'Clear, demonstrable skills by the end of every module.' },
            { icon: TrendingUp, label: 'Career Growth', text: 'Support translating new skills into real opportunities.' },
            { icon: Hammer, label: 'Skill Development', text: 'Project work that builds capability, not just familiarity.' },
            { icon: Rocket, label: 'Industry Readiness', text: 'Curriculum built around what current hiring actually expects.' },
          ].map((s, i) => (
            <RevealSection key={s.label} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-white/8 bg-ink-900 p-6 text-center">
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-signal-cyan">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-sm font-semibold">{s.label}</h3>
                <p className="mt-2 text-xs leading-relaxed text-mist">{s.text}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* SECTION 10 — TRAINERS & MENTORS */}
      <section className="section-light py-16">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <RevealSection className="mb-10 text-center">
            <h2 className="font-display text-2xl font-bold lg:text-3xl">Trainers & Mentors</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-mist">
              Learn from instructors with relevant hands-on industry experience.
            </p>
          </RevealSection>
          <div className="grid gap-5 sm:grid-cols-2">
            {instructors.slice(0, 4).map((ins, i) => (
              <RevealSection key={ins.id} delay={i * 0.06}>
                <div className="card-light flex gap-4 rounded-2xl p-6">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${ins.id}`}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-14 w-14 shrink-0 rounded-full bg-white/40"
                  />
                  <div>
                    <p className="font-display text-sm font-semibold">{ins.name}</p>
                    <p className="text-xs text-mist">{ins.role} • {ins.experience}</p>
                    <p className="mt-2 text-xs leading-relaxed text-mist">{ins.bio}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
          <RevealSection delay={0.2} className="mt-6 text-center">
            <Link href="/instructors" className="focus-ring text-sm font-semibold text-signal-blue hover:underline">
              View All Instructors →
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* SECTION 11 — DIGITALAI DIFFERENCE */}
      <section className="mx-auto max-w-4xl px-5 py-16 lg:px-8">
        <RevealSection className="mb-10 text-center">
          <h2 className="font-display text-2xl font-bold lg:text-3xl">The DigitalAI Difference</h2>
        </RevealSection>
        <RevealSection delay={0.1} className="overflow-hidden rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-ink-900 text-left">
                <th className="px-5 py-4 font-medium text-mist">Factor</th>
                <th className="px-5 py-4 font-medium text-mist"><span className="flex items-center gap-1.5"><XCircle className="h-4 w-4" /> Traditional Learning</span></th>
                <th className="px-5 py-4 font-medium text-signal-cyan"><span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> DigitalAI Learning</span></th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.factor} className="border-b border-white/5 last:border-0">
                  <td className="px-5 py-4 font-medium">{row.factor}</td>
                  <td className="px-5 py-4 text-mist">{row.traditional}</td>
                  <td className="px-5 py-4 text-mist">{row.digitalai}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </RevealSection>
      </section>

      {/* SECTION 12 — FAQ */}
      <section className="section-light py-16">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <RevealSection className="mb-10 text-center">
            <h2 className="font-display text-2xl font-bold lg:text-3xl">Frequently Asked Questions</h2>
          </RevealSection>
          <RevealSection delay={0.1}>
            <FAQAccordion items={aboutPageFAQs} light />
          </RevealSection>
        </div>
      </section>

      {/* SECTION 13 — FINAL CTA */}
      <CTASection
        headline="Start Your Learning Journey Today"
        text="Explore our courses or talk to a learning counsellor to find the right path for your goals."
        primaryLabel="Explore Courses"
        primaryHref="/courses"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
        showCallNow
      />
    </div>
  );
}
