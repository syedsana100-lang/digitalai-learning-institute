import Link from 'next/link';
import { homepageFAQs } from '@/lib/homepage-faq-data';
import FAQAccordion from '@/components/FAQAccordion';
import RevealSection from '@/components/RevealSection';

export default function HomepageFAQSection() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homepageFAQs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <section className="section-light py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <RevealSection className="mb-10 text-center">
          <h2 className="font-display text-3xl font-extrabold lg:text-4xl">Frequently Asked Questions</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-mist">
            Answers about our courses, fees, placement support and more.
          </p>
        </RevealSection>
        <RevealSection delay={0.1}>
          <FAQAccordion items={homepageFAQs.slice(0, 10)} light />
        </RevealSection>
        <RevealSection delay={0.15} className="mt-6 text-center">
          <Link href="/faq" className="focus-ring text-sm font-semibold text-signal-blue hover:underline">
            View All FAQs →
          </Link>
        </RevealSection>
      </div>
    </section>
  );
}
