import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Signal, Laptop, ArrowRight, CheckCircle2 } from 'lucide-react';
import { getAllCourses, getCourseBySlug, categoryMeta } from '@/lib/courses-data';
import { getMergedCourses } from '@/sanity/lib/content';
import { getInstructorById } from '@/lib/instructors-data';
import Breadcrumbs from '@/components/Breadcrumbs';
import CurriculumAccordion from '@/components/CurriculumAccordion';
import FAQAccordion from '@/components/FAQAccordion';
import CTASection from '@/components/CTASection';
import RevealSection from '@/components/RevealSection';
import { siteConfig } from '@/lib/site-config';

export async function generateStaticParams() {
  const courses = await getMergedCourses();
  return getAllCourses(courses).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const courses = await getMergedCourses();
  const course = getCourseBySlug(slug, courses);
  if (!course) return {};
  return {
    title: course.seo.title,
    description: course.seo.description,
    alternates: { canonical: `/courses/${course.slug}` },
    openGraph: { title: course.seo.title, description: course.seo.description, type: 'website' },
  };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const courses = await getMergedCourses();
  const course = getCourseBySlug(slug, courses);
  if (!course) notFound();

  const instructor = getInstructorById(course.instructorId);

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.overview,
    provider: {
      '@type': 'EducationalOrganization',
      name: siteConfig.brand.name,
      sameAs: siteConfig.brand.domain,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: course.durationLabel,
    },
  };

  return (
    <div className="pt-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Courses', href: '/courses' },
          { label: course.title },
        ]}
      />

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
        <RevealSection>
          <p className="text-xs font-medium uppercase tracking-wide text-signal-cyan">
            {categoryMeta[course.category].label}
          </p>
          <h1 className="mt-2 font-display text-3xl font-extrabold lg:text-5xl">{course.title}</h1>
          <p className="mt-4 max-w-2xl text-mist leading-relaxed">{course.overview}</p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-mist">
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {course.durationLabel}</span>
            <span className="flex items-center gap-1.5"><Signal className="h-4 w-4" /> {course.level}</span>
            <span className="flex items-center gap-1.5"><Laptop className="h-4 w-4" /> {course.deliveryLabel}</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="#fees" className="focus-ring flex items-center gap-2 rounded-full bg-gradient-to-r from-signal-blue to-signal-violet px-7 py-3.5 text-sm font-semibold shadow-glow">
              View Fees <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact#counselling" className="focus-ring rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold hover:bg-white/5">
              Enquire Now
            </Link>
            {course.brochureUrl && (
              <a
                href={course.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold hover:bg-white/5"
              >
                Download Course Brochure
              </a>
            )}
          </div>
        </RevealSection>
      </section>

      {/* Quick Facts strip */}
      <section className="border-y border-white/8 bg-ink-900">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 px-5 py-6 sm:grid-cols-4 lg:px-8">
          {[
            { label: 'Duration', value: course.durationLabel },
            { label: 'Learning Mode', value: course.deliveryLabel },
            { label: 'Certification', value: 'DigitalAI Certificate' },
            { label: 'Eligibility', value: course.level === 'Beginner' ? 'No prior experience needed' : `${course.level} level` },
          ].map((f) => (
            <div key={f.label} className="text-center">
              <p className="font-display text-sm font-semibold">{f.value}</p>
              <p className="mt-0.5 text-xs text-mist">{f.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Learning outcomes + eligibility */}
      <section className="mx-auto grid max-w-4xl gap-8 px-5 py-6 sm:grid-cols-2 lg:px-8">
        <RevealSection>
          <h2 className="font-display text-lg font-semibold">What You&apos;ll Learn</h2>
          <ul className="mt-4 space-y-2.5">
            {course.learningOutcomes.map((o) => (
              <li key={o} className="flex items-start gap-2 text-sm text-mist">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-signal-cyan" /> {o}
              </li>
            ))}
          </ul>
        </RevealSection>
        <RevealSection delay={0.1}>
          <h2 className="font-display text-lg font-semibold">Who Should Join</h2>
          <ul className="mt-4 space-y-2.5">
            {course.eligibility.map((e) => (
              <li key={e} className="flex items-start gap-2 text-sm text-mist">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-signal-cyan" /> {e}
              </li>
            ))}
          </ul>
        </RevealSection>
      </section>

      {/* Tools & Technologies You'll Master */}
      <section className="section-light py-14">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <RevealSection className="mb-8 text-center">
            <h2 className="font-display text-2xl font-bold">Tools & Technologies You&apos;ll Master</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-mist">
              Hands-on training with real, industry-standard tools — not just theory.
            </p>
          </RevealSection>
          <div className="flex flex-wrap justify-center gap-3">
            {course.technologies.map((t, i) => (
              <RevealSection key={t} delay={i * 0.04}>
                <span className="card-light inline-block rounded-full px-5 py-2.5 text-sm font-medium">
                  {t}
                </span>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Learn This Course */}
      <section className="mx-auto max-w-4xl px-5 pb-14 lg:px-8">
        <RevealSection>
          <h2 className="mb-3 font-display text-2xl font-bold">Why Learn {course.title}?</h2>
          <p className="text-sm leading-relaxed text-mist sm:text-base">{course.whyLearn}</p>
        </RevealSection>
      </section>

      {/* Career Opportunities + Industry Demand */}
      <section className="mx-auto grid max-w-4xl gap-8 px-5 pb-14 sm:grid-cols-2 lg:px-8">
        <RevealSection>
          <h2 className="mb-4 font-display text-lg font-semibold">Career Opportunities</h2>
          <ul className="space-y-2.5">
            {course.careerOpportunities.map((role) => (
              <li key={role} className="flex items-start gap-2 text-sm text-mist">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-signal-cyan" /> {role}
              </li>
            ))}
          </ul>
        </RevealSection>
        <RevealSection delay={0.1}>
          <h2 className="mb-4 font-display text-lg font-semibold">Industry Demand</h2>
          <p className="text-sm leading-relaxed text-mist">{course.industryDemand}</p>
        </RevealSection>
      </section>

      {/* Curriculum */}
      <section className="mx-auto max-w-4xl px-5 py-14 lg:px-8">
        <RevealSection className="mb-6">
          <h2 className="font-display text-2xl font-bold">Curriculum</h2>
        </RevealSection>
        <CurriculumAccordion modules={course.curriculum} />
      </section>

      {/* Projects */}
      <section className="mx-auto max-w-4xl px-5 pb-14 lg:px-8">
        <RevealSection>
          <h2 className="font-display text-2xl font-bold">Practical Projects</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {course.projects.map((p) => (
              <div key={p} className="rounded-2xl border border-white/8 bg-ink-900 p-5 text-sm text-mist">{p}</div>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* Career Roadmap */}
      <section className="mx-auto max-w-4xl px-5 pb-14 lg:px-8">
        <RevealSection>
          <h2 className="mb-5 font-display text-2xl font-bold">Your Career Roadmap</h2>
          <div className="space-y-3">
            {course.careerRoadmap.map((step, i) => (
              <div key={step} className="flex items-start gap-4 rounded-xl border border-white/8 bg-ink-900 p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-signal-blue to-signal-violet font-mono text-xs font-bold">
                  {i + 1}
                </span>
                <p className="text-sm text-mist">{step}</p>
              </div>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* Certification & Career support */}
      <section className="mx-auto max-w-4xl px-5 pb-14 lg:px-8">
        <RevealSection>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/8 bg-ink-900 p-6">
              <h3 className="font-display text-base font-semibold">Certification</h3>
              <p className="mt-2 text-sm text-mist">
                Earn a certificate of completion from DigitalAI Learning Institute on finishing all
                modules and required projects.
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-ink-900 p-6">
              <h3 className="font-display text-base font-semibold">Career Support</h3>
              <p className="mt-2 text-sm text-mist">
                Resume review, portfolio guidance and interview preparation included as part of this program.
              </p>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* Instructor */}
      {instructor && (
        <section className="mx-auto max-w-4xl px-5 pb-14 lg:px-8">
          <RevealSection>
            <h2 className="mb-5 font-display text-2xl font-bold">Your Instructor</h2>
            <div className="flex items-center gap-4 rounded-2xl border border-white/8 bg-ink-900 p-6">
              <div className="h-16 w-16 shrink-0 rounded-full bg-white/10" aria-hidden="true" />
              <div>
                <p className="font-display font-semibold">{instructor.name}</p>
                <p className="text-xs text-mist">{instructor.role} • {instructor.experience}</p>
                <p className="mt-2 text-sm text-mist">{instructor.bio}</p>
              </div>
            </div>
          </RevealSection>
        </section>
      )}

      {/* Fees */}
      <section id="fees" className="mx-auto max-w-4xl px-5 pb-14 lg:px-8">
        <RevealSection>
          <h2 className="mb-5 font-display text-2xl font-bold">Fees</h2>
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/8 bg-ink-900 p-6">
            <div>
              <p className="font-display text-2xl font-bold">
                {course.fee ? `₹${course.fee.toLocaleString('en-IN')}` : 'Contact for fee details'}
              </p>
              <p className="mt-1 text-xs text-mist">EMI options available • See full <Link href="/fees" className="underline">fee comparison</Link></p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact#counselling" className="focus-ring rounded-full bg-gradient-to-r from-signal-blue to-signal-violet px-6 py-3 text-sm font-semibold shadow-glow transition-transform duration-150 hover:scale-[1.02] active:scale-95">
                Enquire Now
              </Link>
              <Link href="/payment" className="focus-ring rounded-full border border-white/15 px-6 py-3 text-sm font-semibold transition-all duration-150 hover:bg-white/5 active:scale-95">
                Already Decided? Proceed to Payment
              </Link>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* FAQs */}
      <section className="mx-auto max-w-4xl px-5 pb-14 lg:px-8">
        <RevealSection>
          <h2 className="mb-5 font-display text-2xl font-bold">Frequently Asked Questions</h2>
          <FAQAccordion items={course.faqs} />
        </RevealSection>
      </section>

      <CTASection
        headline={`Ready to start ${course.title}?`}
        text="Talk to a learning counsellor to check your fit, fees and start date."
        primaryLabel="Book Free Counselling"
        primaryHref="/contact#counselling"
        secondaryLabel="View All Courses"
        secondaryHref="/courses"
      />
    </div>
  );
}
