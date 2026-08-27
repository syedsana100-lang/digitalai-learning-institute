import { buildMetadata } from '@/lib/seo';
import FAQAccordion from '@/components/FAQAccordion';
import RevealSection from '@/components/RevealSection';

export const metadata = buildMetadata({
  title: 'FAQ',
  description: 'Frequently asked questions about DigitalAI Learning Institute online courses, fees and enrolment.',
  path: '/faq',
});

const faqs = [
  { question: 'Who can join the courses?', answer: 'Anyone from college students to working professionals across India — most programs assume no prior technical background.' },
  { question: 'Are courses online?', answer: 'Yes, all current programs are delivered online with live sessions and recordings.' },
  { question: 'Are beginners eligible?', answer: 'Yes, most programs are designed to start from the fundamentals.' },
  { question: 'What is the course duration?', answer: 'Duration varies by program, typically 12–20 weeks. See each course page for specifics.' },
  { question: 'What is the fee?', answer: 'Fees vary by program and plan — see the Fees page or individual course pages for details.' },
  { question: 'Is EMI available?', answer: 'Yes, EMI options are available on eligible plans.' },
  { question: 'Will I receive recordings?', answer: 'Yes, live sessions are recorded and made available for review.' },
  { question: 'Are projects included?', answer: 'Yes, every program includes hands-on, project-based learning.' },
  { question: 'Is certification provided?', answer: 'Yes, a certificate of completion is issued after finishing required modules and projects.' },
  { question: 'Is career support available?', answer: 'Yes — resume, portfolio and interview guidance is included with most plans.' },
  { question: 'What laptop is required?', answer: 'A laptop or desktop with a stable internet connection is sufficient for all current programs.' },
  { question: 'How do I enrol?', answer: 'Book a free counselling session, confirm your course and plan, then complete enrolment online.' },
  { question: 'What is the refund policy?', answer: 'See our Refund Policy page for full details.' },
];

export default function FaqPage() {
  return (
    <div className="pt-16 pb-20">
      <RevealSection className="mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h1 className="font-display text-4xl font-extrabold lg:text-5xl">Frequently Asked Questions</h1>
      </RevealSection>
      <section className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <FAQAccordion items={faqs} />
      </section>
    </div>
  );
}
