export interface StaticFaq {
  question: string;
  answer: string;
}

// PLACEHOLDER — content-manage these from now on via the Sanity Studio "Site FAQs"
// list at /studio once connected; this array is only the fallback shown until
// CMS FAQs exist (or if Sanity isn't configured), so the /faq page and the
// homepage FAQ widget never show up empty.
export const siteFaqs: StaticFaq[] = [
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

// Shown on the homepage widget until CMS FAQs are marked "Show on Homepage" —
// a short, broad cross-section rather than the full list.
export const homepageFaqFallback: StaticFaq[] = [
  siteFaqs[0], siteFaqs[3], siteFaqs[4], siteFaqs[5], siteFaqs[8], siteFaqs[9],
];
