import type { Metadata } from 'next';
import FAQAccordion from '@/components/FAQAccordion';
import RevealSection from '@/components/RevealSection';
import { siteFaqs } from '@/lib/faq-data';
import { getMergedFaqs } from '@/sanity/lib/content';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about DigitalAI Learning Institute online courses, fees and enrolment.',
};

export default async function FaqPage() {
  const faqs = await getMergedFaqs(siteFaqs);

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
    <div className="pt-16 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <RevealSection className="mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h1 className="font-display text-4xl font-extrabold lg:text-5xl">Frequently Asked Questions</h1>
      </RevealSection>
      <section className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <FAQAccordion items={faqs} />
      </section>
    </div>
  );
}
