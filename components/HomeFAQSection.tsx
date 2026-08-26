import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import FAQAccordion from '@/components/FAQAccordion';
import RevealSection from '@/components/RevealSection';
import type { StaticFaq } from '@/lib/faq-data';

export default function HomeFAQSection({ faqs }: { faqs: StaticFaq[] }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <section className="mx-auto max-w-3xl px-5 py-20 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <RevealSection className="mb-10 text-center">
        <h2 className="font-display text-3xl font-extrabold lg:text-4xl">Frequently Asked Questions</h2>
        <p className="mt-3 text-sm text-mist">Quick answers to the questions we hear most.</p>
      </RevealSection>
      <RevealSection delay={0.05}>
        <FAQAccordion items={faqs} />
      </RevealSection>
      <RevealSection delay={0.1} className="mt-6 text-center">
        <Link href="/faq" className="focus-ring inline-flex items-center gap-1 text-sm font-semibold text-signal-cyan">
          View All FAQs <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </RevealSection>
    </section>
  );
}
