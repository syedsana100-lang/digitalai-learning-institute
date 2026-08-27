export type BlogCategory =
  | 'AI' | 'Generative AI' | 'Data Science' | 'Programming' | 'Web Development'
  | 'Digital Marketing' | 'SEO' | 'Cloud' | 'Cyber Security' | 'Career' | 'Technology';

export const allCategories: BlogCategory[] = [
  'AI', 'Generative AI', 'Data Science', 'Programming', 'Web Development',
  'Digital Marketing', 'SEO', 'Cloud', 'Cyber Security', 'Career', 'Technology',
];

// Structured content blocks power the Table of Contents, sticky nav, and rich
// formatting (headings, lists, quotes, code) — replace `text`/`items` with real,
// original content before publishing. Every h2/h3 block auto-appears in the TOC.
export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string; id: string }
  | { type: 'h3'; text: string; id: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'quote'; text: string }
  | { type: 'code'; text: string; language?: string }
  | { type: 'links'; intro?: string; items: { label: string; href: string }[] }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'youtube'; videoId: string; title?: string };

export interface BlogPost {
  slug: string;
  title: string;
  category: BlogCategory;
  tags: string[];
  excerpt: string;
  authorId: string;
  publishedDate: string; // human label, e.g. "Jan 15, 2026"
  publishedISO: string; // machine date for schema, e.g. "2026-01-15"
  updatedISO?: string;
  content: ContentBlock[];
  faqs?: { question: string; answer: string }[];
  featuredImage: string; // placeholder image seed — swap for a real image path before publishing
  featured?: boolean;
  popular?: boolean;
  trending?: boolean;
  seo: { title: string; description: string; focusKeyword?: string; ogImage?: string };
}

function h2(text: string): { type: 'h2'; text: string; id: string } {
  return { type: 'h2', text, id: slugifyHeading(text) };
}
function h3(text: string): { type: 'h3'; text: string; id: string } {
  return { type: 'h3', text, id: slugifyHeading(text) };
}
export function slugifyHeading(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// PLACEHOLDER POSTS — replace with real, original articles before publishing.
// Add a new post by appending to this array; no page component changes required.
export const blogPosts: BlogPost[] = [
  {
    slug: 'getting-started-with-ai-in-2026',
    title: 'Getting Started With AI in 2026: A Practical Roadmap',
    category: 'AI',
    tags: ['AI', 'Beginners', 'Career', 'Roadmap'],
    excerpt: 'A beginner-friendly roadmap for learning AI skills that are actually useful in today\u2019s job market.',
    authorId: 'digitalai-team',
    publishedDate: 'Jan 15, 2026',
    publishedISO: '2026-01-15',
    popular: true,
    content: [
      { type: 'p', text: 'Placeholder introduction — replace with an original, well-researched introduction before publishing.' },
      h2('Why Learn AI in 2026'),
      { type: 'p', text: 'Placeholder section content — replace before publishing.' },
      h2('What to Learn First'),
      { type: 'p', text: 'Placeholder section content — replace before publishing.' },
      h3('Python Fundamentals'),
      { type: 'p', text: 'Placeholder subsection content — replace before publishing.' },
      h3('Statistics Basics'),
      { type: 'p', text: 'Placeholder subsection content — replace before publishing.' },
      h2('Common Mistakes Beginners Make'),
      { type: 'ul', items: ['Placeholder point one', 'Placeholder point two', 'Placeholder point three'] },
      h2('Building Your First Portfolio Project'),
      { type: 'p', text: 'Placeholder section content — replace before publishing.' },
      h2('Conclusion'),
      { type: 'p', text: 'Placeholder conclusion — replace before publishing.' },
    ],
    faqs: [{ question: 'Do I need a math background to start?', answer: 'A basic foundation helps, but most concepts can be learned alongside the coursework.' }],
    featuredImage: 'blog-ai-roadmap',
    seo: {
      title: 'Getting Started With AI in 2026 | DigitalAI Learning Blog',
      description: 'A practical roadmap for beginners learning AI skills in 2026.',
      focusKeyword: 'learn AI 2026',
    },
  },
  {
    slug: 'seo-basics-for-beginners',
    title: 'SEO Basics Every Beginner Should Know',
    category: 'SEO',
    tags: ['SEO', 'Digital Marketing', 'Beginners'],
    excerpt: 'The foundational SEO concepts every digital marketer should understand before running campaigns.',
    authorId: 'digitalai-team',
    publishedDate: 'Jan 22, 2026',
    publishedISO: '2026-01-22',
    popular: true,
    trending: true,
    content: [
      { type: 'p', text: 'Placeholder introduction — replace with original content before publishing.' },
      h2('On-Page SEO Basics'),
      { type: 'p', text: 'Placeholder section content — replace before publishing.' },
      h2('Off-Page SEO Basics'),
      { type: 'p', text: 'Placeholder section content — replace before publishing.' },
      h2('Technical SEO Checklist'),
      { type: 'ul', items: ['Sitemap submitted', 'Robots.txt configured', 'Canonical tags set', 'Mobile-friendly pages'] },
      h2('Conclusion'),
      { type: 'p', text: 'Placeholder conclusion — replace before publishing.' },
    ],
    featuredImage: 'blog-seo-basics',
    seo: {
      title: 'SEO Basics for Beginners | DigitalAI Learning Blog',
      description: 'Learn the foundational SEO concepts every beginner marketer should know.',
      focusKeyword: 'SEO basics for beginners',
    },
  },
  {
    slug: 'data-science-vs-data-analytics',
    title: 'Data Science vs Data Analytics: What\u2019s the Real Difference?',
    category: 'Data Science',
    tags: ['Data Science', 'Data Analytics', 'Career'],
    excerpt: 'Confused between these two career paths? Here\u2019s a clear, practical breakdown.',
    authorId: 'digitalai-team',
    publishedDate: 'Feb 3, 2026',
    publishedISO: '2026-02-03',
    popular: true,
    content: [
      { type: 'p', text: 'Placeholder introduction — replace with original content before publishing.' },
      h2('Skill Overlap'),
      { type: 'p', text: 'Placeholder section content — replace before publishing.' },
      h2('Typical Job Roles'),
      { type: 'p', text: 'Placeholder section content — replace before publishing.' },
      h2('Which Path Suits You'),
      { type: 'p', text: 'Placeholder section content — replace before publishing.' },
    ],
    featuredImage: 'blog-ds-vs-da',
    seo: {
      title: 'Data Science vs Data Analytics | DigitalAI Learning Blog',
      description: 'A clear comparison between Data Science and Data Analytics career paths.',
      focusKeyword: 'data science vs data analytics',
    },
  },
  {
    slug: 'why-cyber-security-careers-are-growing',
    title: 'Why Cyber Security Careers Are Growing Fast in India',
    category: 'Cyber Security',
    tags: ['Cyber Security', 'Career', 'India'],
    excerpt: 'A look at why demand for security talent is rising, and how to break in as a beginner.',
    authorId: 'digitalai-team',
    publishedDate: 'Feb 12, 2026',
    publishedISO: '2026-02-12',
    trending: true,
    content: [
      { type: 'p', text: 'Placeholder introduction — replace with original content before publishing.' },
      h2('Why Demand Is Rising'),
      { type: 'p', text: 'Placeholder section content — replace before publishing.' },
      h2('How to Break In as a Beginner'),
      { type: 'p', text: 'Placeholder section content — replace before publishing.' },
    ],
    featuredImage: 'blog-cybersecurity-growth',
    seo: {
      title: 'Why Cyber Security Careers Are Growing | DigitalAI Learning Blog',
      description: 'Understand why cyber security careers are in high demand in India right now.',
      focusKeyword: 'cyber security careers India',
    },
  },
  {
    slug: 'full-stack-roadmap-for-beginners',
    title: 'A Full Stack Development Roadmap for Complete Beginners',
    category: 'Web Development',
    tags: ['Web Development', 'Full Stack', 'Roadmap', 'Beginners'],
    excerpt: 'Step-by-step order to learn frontend, backend and deployment without feeling overwhelmed.',
    authorId: 'digitalai-team',
    publishedDate: 'Mar 5, 2026',
    publishedISO: '2026-03-05',
    trending: true,
    content: [
      { type: 'p', text: 'Placeholder introduction — replace with original content before publishing.' },
      h2('Frontend First or Backend First?'),
      { type: 'p', text: 'Placeholder section content — replace before publishing.' },
      h2('A Suggested Learning Order'),
      { type: 'ol', items: ['HTML, CSS, JavaScript fundamentals', 'A frontend framework (React)', 'Backend basics (Node.js)', 'Databases', 'Deployment'] },
    ],
    featuredImage: 'blog-fullstack-roadmap',
    seo: {
      title: 'Full Stack Development Roadmap | DigitalAI Learning Blog',
      description: 'A beginner-friendly roadmap to learning full stack web development.',
      focusKeyword: 'full stack development roadmap',
    },
  },
  {
    slug: 'freelancing-vs-full-time-tech-career',
    title: 'Freelancing vs Full-Time: Choosing Your Tech Career Path',
    category: 'Career',
    tags: ['Career', 'Freelancing'],
    excerpt: 'Weighing the pros, cons and realities of both paths after finishing a tech course.',
    authorId: 'digitalai-team',
    publishedDate: 'Mar 18, 2026',
    publishedISO: '2026-03-18',
    content: [
      { type: 'p', text: 'Placeholder introduction — replace with original content before publishing.' },
      h2('The Case for Freelancing'),
      { type: 'p', text: 'Placeholder section content — replace before publishing.' },
      h2('The Case for Full-Time'),
      { type: 'p', text: 'Placeholder section content — replace before publishing.' },
    ],
    featuredImage: 'blog-freelance-vs-fulltime',
    seo: {
      title: 'Freelancing vs Full-Time Tech Career | DigitalAI Learning Blog',
      description: 'A practical comparison to help you choose between freelancing and full-time work.',
      focusKeyword: 'freelancing vs full-time tech career',
    },
  },
  {
    slug: 'top-10-ai-courses-with-certification-2026',
    title: 'Top 10 AI Courses with Certification and High-Paying Career Opportunities in 2026',
    category: 'AI',
    tags: ['AI', 'Certification', 'Career', 'Machine Learning', 'Generative AI'],
    excerpt: 'A practical, no-fluff guide to choosing an AI course in 2026 — what to look for, the skill areas that actually matter, and how certification connects to real career opportunities.',
    authorId: 'digitalai-team',
    publishedDate: 'Mar 20, 2026',
    publishedISO: '2026-03-20',
    featured: true,
    popular: true,
    trending: true,
    content: [
      { type: 'p', text: 'Artificial intelligence has moved from an emerging specialization to a core skill expectation across software, data, product and even marketing roles. If you\u2019re evaluating AI courses in 2026, the sheer number of options — bootcamps, university certificates, self-paced platforms, and full-time programs — makes it genuinely hard to tell which one will actually get you job-ready versus which one is mostly marketing.' },
      { type: 'p', text: 'This guide breaks down the ten categories of AI courses worth considering in 2026, what separates a course that builds real skills from one that just hands you a certificate, and how to think about the career opportunities each path realistically opens up. We\u2019ll also cover how certification fits into hiring decisions, common mistakes people make when picking a course, and a straightforward framework for choosing based on your starting point.' },

      h2('Why AI Course Selection Matters More Than Ever'),
      { type: 'p', text: 'The AI education market has grown quickly, and with that growth has come a wide range of course quality. Two courses can carry similar titles — "Artificial Intelligence Certification" or "Machine Learning Masterclass" — while differing enormously in depth, project work, and how closely they map to what employers actually screen for in interviews.' },
      { type: 'p', text: 'The practical difference usually comes down to three things: whether the course is project-based rather than lecture-only, whether it teaches you to work with real, messy data rather than clean textbook examples, and whether it includes any career support to help you translate what you\u2019ve learned into an actual job search. A certificate alone rarely moves the needle in hiring conversations — what you can demonstrate does.' },

      h2('What Makes an AI Certification Actually Valuable'),
      { type: 'p', text: 'Not all certifications carry the same weight, and it helps to understand what hiring managers are actually looking for before you commit time and money to a program.' },
      h3('Hands-On Projects Over Passive Video Content'),
      { type: 'p', text: 'A course built around watching lecture videos and taking multiple-choice quizzes teaches you to recognize concepts, not apply them. The strongest programs require you to build something — a trained model, a small AI-powered application, a data pipeline — that you can walk an interviewer through in detail.' },
      h3('Depth in Core Fundamentals'),
      { type: 'p', text: 'Courses that skip straight to "using AI tools" without covering the underlying statistics, linear algebra basics, and machine learning fundamentals tend to leave graduates unable to reason about why a model behaves the way it does. That gap shows up quickly in technical interviews.' },
      h3('Currency With Generative AI'),
      { type: 'p', text: 'A 2026-relevant AI course should go beyond classical machine learning to include generative AI and prompt engineering, since a growing share of applied AI work now involves working with large language models and other generative systems rather than building everything from scratch.' },
      h3('A Real Certificate of Completion'),
      { type: 'p', text: 'Look for programs that issue a certificate tied to demonstrated project work, not just attendance. A certificate that reflects what you actually built is far more useful to reference on a resume or LinkedIn profile than one that only confirms enrollment.' },

      h2('Top 10 AI Course Categories to Consider in 2026'),
      { type: 'p', text: 'Rather than naming specific competing platforms, this section breaks down the ten categories of AI learning paths available today, what each is best suited for, and who should consider it.' },

      h3('1. Foundational Machine Learning Programs'),
      { type: 'p', text: 'These cover supervised and unsupervised learning, model evaluation, and the statistics that underpin them. Best for complete beginners who want a solid base before specializing. Expect to spend meaningful time on Python and data handling before touching advanced models. By the end, you should be comfortable training a basic model, understanding why it makes the predictions it does, and knowing how to measure whether it\u2019s actually performing well rather than just producing output.' },

      h3('2. Applied Generative AI Courses'),
      { type: 'p', text: 'Focused on working with large language models, prompt engineering, and building applications on top of generative AI APIs. Best for people who already have basic programming skills and want to move quickly into one of the fastest-growing areas of applied AI. These programs typically emphasize practical integration work — connecting AI capabilities into real products — over building models from scratch, which makes them a faster path to job-readiness for many learners.' },

      h3('3. Deep Learning and Neural Network Specializations'),
      { type: 'p', text: 'These go deeper into neural network architectures — useful if you\u2019re aiming for research-adjacent or highly technical AI engineering roles. Typically assumes a stronger math background than foundational courses. Expect coursework on backpropagation, optimization techniques, and specialized architectures for different data types, alongside enough hands-on implementation to actually understand how these systems are trained rather than treating them as a black box.' },

      h3('4. AI for Data Analysts and Data Scientists'),
      { type: 'p', text: 'Rather than teaching AI in isolation, these programs integrate machine learning into a broader data science skill set — SQL, data visualization, and business communication alongside modeling. Best for people targeting data analyst or data scientist roles rather than pure ML engineering. A strong version of this course will push you to practice translating model results into recommendations a non-technical stakeholder can actually act on, which is often the skill that separates a good data scientist from a technically capable one.' },

      h3('5. AI Product and Business Strategy Courses'),
      { type: 'p', text: 'Designed for product managers, founders, and business professionals who need to understand AI capabilities and limitations well enough to make decisions, without necessarily writing the code themselves. These programs typically emphasize case studies, feasibility assessment, and understanding the practical constraints of deploying AI in a real product — useful groundwork for anyone who will be scoping AI features rather than building them directly.' },

      h3('6. Computer Vision Specializations'),
      { type: 'p', text: 'Focused specifically on image and video-based AI applications — object detection, image classification, and related techniques. A narrower but high-demand specialization for roles in areas like manufacturing quality control, security, and autonomous systems. Because this is a more specialized field, courses here tend to assume a foundational machine learning background already, so it\u2019s often a second course rather than a first one.' },

      h3('7. Natural Language Processing (NLP) Courses'),
      { type: 'p', text: 'Covers text-based AI applications — sentiment analysis, chatbots, and language understanding systems, increasingly overlapping with generative AI coursework as large language models have become central to modern NLP work. A well-structured NLP course will still cover the classical techniques alongside modern approaches, since understanding both gives you a clearer picture of why current large language model approaches work as well as they do.' },

      h3('8. AI Ethics and Responsible AI Programs'),
      { type: 'p', text: 'A growing category as organizations formalize responsible AI practices. Useful as a complementary credential alongside technical skills, particularly for roles touching AI governance, compliance, or policy. These programs typically cover topics like bias detection, model transparency, and regulatory considerations — increasingly relevant as more industries adopt formal AI governance frameworks.' },

      h3('9. University-Affiliated AI Certificate Programs'),
      { type: 'p', text: 'Often more rigorous and academically structured, these can carry more recognition in some hiring contexts, though they\u2019re typically slower-paced and less project-intensive than industry bootcamp-style programs. If you\u2019re early in your career and have the time to invest, the rigor can be genuinely valuable — but weigh that against the opportunity cost of a longer timeline if you\u2019re looking to transition careers quickly.' },

      h3('10. Career-Track AI Bootcamps With Placement Support'),
      { type: 'p', text: 'Structured, intensive programs that combine curriculum with resume building, mock interviews, and career guidance. Best for people who want structure and accountability alongside the technical content, and who are specifically targeting a career transition. The value of this format often comes as much from the surrounding career support as from the technical curriculum itself, since translating new skills into an actual job offer is a distinct skill set from learning the technical material in the first place.' },

      { type: 'links', intro: 'Explore related programs at DigitalAI Learning:', items: [
        { label: 'Artificial Intelligence Course', href: '/courses/artificial-intelligence' },
        { label: 'Data Science Course', href: '/courses/data-science' },
        { label: 'Course Fees & Plans', href: '/fees' },
        { label: 'Career Support', href: '/career-support' },
      ]},

      h2('High-Paying Career Opportunities After an AI Course'),
      { type: 'p', text: 'The roles available to you after an AI course depend heavily on the depth and specialization of what you studied, plus how much practical project work you can point to. Common roles include:' },
      { type: 'ul', items: [
        'AI/ML Engineer — building and deploying machine learning models into production systems',
        'Applied AI Developer — integrating AI capabilities (including generative AI) into existing products',
        'Data Scientist — applying machine learning within a broader data analysis and business context',
        'AI Product Analyst — bridging technical AI capability with product and business decisions',
        'Generative AI Engineer — specializing in large language model applications and prompt engineering',
      ]},
      { type: 'p', text: 'Compensation for these roles varies significantly by city, company size, and your existing experience level, so it\u2019s worth researching current listings for your specific market rather than relying on generic averages. What consistently correlates with better offers is a strong project portfolio and the ability to clearly explain your technical decisions in an interview — both of which come from choosing a course that emphasizes hands-on work.' },

      h2('How to Choose the Right AI Course for You'),
      { type: 'p', text: 'Start by being honest about your current skill level. If you\u2019ve never written code, a foundational program that starts with Python and statistics will serve you better than jumping straight into a specialized deep learning course. If you already work with data, an applied AI or generative AI course may get you to a career-ready outcome faster.' },
      { type: 'p', text: 'Next, check whether the curriculum includes a capstone or portfolio project — this is often the single biggest predictor of whether a course translates into interview-ready skills. Finally, consider whether you want or need career support (resume help, mock interviews, placement assistance) bundled in, since that can meaningfully shorten your job search after completing the course.' },

      { type: 'quote', text: 'The strongest signal in an AI job interview isn\u2019t which course you completed — it\u2019s what you can show you built and explain how it works.' },

      h2('How AI Skills Map to Real Job Postings'),
      { type: 'p', text: 'One of the most useful exercises before enrolling in any AI course is to spend an hour reading through 15–20 real job postings for the role you\u2019re targeting. Look specifically at the "requirements" and "nice to have" sections rather than the job title alone, since titles like "AI Engineer" can mean very different things at different companies — sometimes it\u2019s heavy model-building work, and sometimes it\u2019s mostly integrating existing AI APIs into a product.' },
      { type: 'p', text: 'You\u2019ll typically notice a consistent pattern: postings ask for a working knowledge of Python, comfort with at least one machine learning framework, some exposure to how models are evaluated and deployed, and — increasingly — familiarity with generative AI tools and prompt engineering. Postings for more senior or research-oriented roles will additionally expect a stronger mathematical foundation and published or demonstrable project work. Matching a course\u2019s curriculum against this pattern, rather than against a generic syllabus description, is a much more reliable way to judge fit than reading marketing copy alone.' },
      { type: 'p', text: 'It also helps to notice which skills appear across almost every posting versus which ones are specific to a handful of companies. Python, SQL, and the ability to explain a model\u2019s behavior in plain language show up almost everywhere — these are safe, high-leverage skills to prioritize early. More specialized tools or frameworks tend to vary by company and can usually be picked up on the job once you have the fundamentals solid.' },

      h2('Salary and Compensation Considerations'),
      { type: 'p', text: 'It\u2019s tempting to look for a single number that tells you what an "AI job" pays, but compensation in this field varies enormously based on city, company stage, your prior experience, and the specific role. A generative AI engineering role at a well-funded product company will typically be compensated very differently from an entry-level applied AI analyst role at a services firm — and both are legitimate, valuable career starting points depending on your goals.' },
      { type: 'p', text: 'Rather than anchoring to a specific figure, it\u2019s more useful to research current listings on job platforms for your target role and city directly, since these numbers shift over time and by market. What we can say directionally is that roles requiring you to build, evaluate, and deploy models independently tend to command a premium over roles focused purely on using pre-built AI tools — which is part of why hands-on, project-based courses tend to open more doors than purely conceptual ones.' },
      { type: 'p', text: 'It\u2019s also worth factoring in that compensation growth in AI-adjacent roles often comes faster through demonstrated impact — a shipped project, a measurable improvement to a business metric, a well-documented case study — than through additional certificates alone. This is another reason project-based learning consistently outperforms passive, video-only courses for career outcomes.' },

      h2('Self-Paced vs Live Cohort-Based Learning'),
      { type: 'p', text: 'Beyond course content, the format matters more than many learners expect. Self-paced courses offer flexibility but require significant self-discipline — it\u2019s easy to fall behind without a fixed schedule or peers moving through the material alongside you. Live, cohort-based programs with scheduled sessions tend to have meaningfully higher completion rates, simply because there\u2019s external structure and accountability built in.' },
      { type: 'p', text: 'If you\u2019ve struggled to finish self-paced courses in the past, a live or hybrid format with recorded sessions for review is usually the safer choice, even if it costs somewhat more or requires committing to a fixed schedule. The value of a course you actually finish and apply consistently outweighs the flexibility of one you might abandon halfway through.' },

      h2('What to Expect During the Certification Process'),
      { type: 'p', text: 'Certification structures vary meaningfully between programs, and understanding the typical process helps set realistic expectations. Most credible programs require you to complete a series of graded assignments throughout the course, followed by a capstone project that\u2019s reviewed either by an instructor or through a structured peer/mentor review process. The certificate is then issued once you\u2019ve met the completion criteria — not simply for enrolling or attending sessions.' },
      { type: 'p', text: 'Some programs also include a final assessment or practical exam that tests your ability to apply concepts to a new problem you haven\u2019t seen before, which is a stronger signal of genuine competence than a project you\u2019ve had extended time to iterate on. If a program\u2019s certification process consists only of a quiz with no project component, treat that as a signal to look more closely at the curriculum depth before enrolling.' },
      { type: 'p', text: 'It\u2019s also worth checking whether the certificate is tied to a recognized issuing body or simply the platform itself — both can be valuable, but the weight they carry in a hiring conversation differs, and it\u2019s better to know that going in than to be surprised later. Regardless of the issuer, the most durable value from certification comes from what you can demonstrate you built, not the document itself.' },

      h2('Common Mistakes to Avoid'),
      { type: 'ol', items: [
        'Choosing a course based on brand name alone, without checking the actual curriculum depth',
        'Skipping the fundamentals (statistics, Python) to jump straight into advanced topics',
        'Picking a purely theoretical course with no hands-on project component',
        'Ignoring whether the course content has been updated to reflect generative AI developments',
        'Assuming certification alone — without a portfolio — will be enough for interviews',
      ]},

      h2('Conclusion'),
      { type: 'p', text: 'There\u2019s no single "best" AI course for everyone — the right choice depends on your starting point, target role, and how much structure and career support you need. A complete beginner switching careers from an unrelated field will get more value from a structured, foundational, cohort-based program with career support than from an advanced deep learning specialization built for people who already work in the field. Conversely, someone already working as a data analyst may only need a focused generative AI or applied machine learning course to make the jump into a more AI-centric role.' },
      { type: 'p', text: 'What matters most across every category above is the same: real project work you can explain in depth, solid fundamentals in Python and statistics, and content that reflects where AI actually stands today, including generative AI and large language models. Before enrolling anywhere, take the time to read the actual curriculum outline, ask what the capstone project looks like, and check whether career support is included if you\u2019ll need it. Choose a program that measures success by what you can build and explain, not just by the certificate at the end — that\u2019s ultimately what will show up in your interviews, your portfolio, and your first offer.' },
    ],
    faqs: [
      { question: 'Do I need a technical background to start an AI course?', answer: 'No — many foundational AI courses, including DigitalAI Learning\u2019s Artificial Intelligence program, start from Python and statistics basics, so no prior coding experience is required.' },
      { question: 'How long does it typically take to complete an AI course?', answer: 'This varies by program depth, but most structured AI courses run 12–20 weeks for a foundational-to-applied level of skill.' },
      { question: 'Is a certificate enough to get an AI job, or do I need a portfolio too?', answer: 'A certificate helps, but a portfolio of real projects you can explain in detail is what most hiring managers actually weigh most heavily in interviews.' },
      { question: 'What\u2019s the difference between a Machine Learning course and a Generative AI course?', answer: 'Machine learning courses cover the broader foundations (supervised/unsupervised learning, model evaluation), while generative AI courses focus specifically on large language models, prompt engineering, and building applications on top of them. Many programs now cover both.' },
      { question: 'Can I switch careers into AI without a computer science degree?', answer: 'Yes — many successful AI career switchers come from non-CS backgrounds. What matters most is building practical skills and a project portfolio, which structured courses are specifically designed to help with.' },
    ],
    featuredImage: 'blog-top-ai-courses-2026',
    seo: {
      title: 'Top 10 AI Courses with Certification & Career Opportunities (2026) | DigitalAI Learning',
      description: 'A practical guide to choosing an AI course in 2026 — what makes certification valuable, the top course categories, and the career opportunities each one opens up.',
      focusKeyword: 'top AI courses with certification 2026',
    },
  },
];

export function categoryToSlug(category: BlogCategory): string {
  return category.toLowerCase().replace(/\s+/g, '-');
}

export function slugToCategory(slug: string): BlogCategory | null {
  return allCategories.find((c) => categoryToSlug(c) === slug) || null;
}

export function getAllPosts() {
  return blogPosts;
}

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug) || null;
}

export function getFeaturedPost() {
  return blogPosts.find((p) => p.featured) || blogPosts[0];
}

export function getPopularPosts(excludeSlug?: string, limit = 4) {
  return blogPosts.filter((p) => p.popular && p.slug !== excludeSlug).slice(0, limit);
}

export function getTrendingPosts(excludeSlug?: string, limit = 4) {
  return blogPosts.filter((p) => p.trending && p.slug !== excludeSlug).slice(0, limit);
}

export function getLatestPosts(excludeSlug?: string, limit = 6) {
  return [...blogPosts]
    .filter((p) => p.slug !== excludeSlug)
    .sort((a, b) => (a.publishedISO < b.publishedISO ? 1 : -1))
    .slice(0, limit);
}

export function getRelatedPosts(post: BlogPost, limit = 3) {
  const sameCategory = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category);
  const sameTag = blogPosts.filter(
    (p) => p.slug !== post.slug && p.category !== post.category && p.tags.some((t) => post.tags.includes(t))
  );
  return [...sameCategory, ...sameTag].slice(0, limit);
}

export function getPostsByCategory(category: BlogCategory) {
  return blogPosts.filter((p) => p.category === category);
}

export function getPostsByTag(tag: string) {
  return blogPosts.filter((p) => p.tags.includes(tag));
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  blogPosts.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

export function getCategoriesInUse(): BlogCategory[] {
  const set = new Set<BlogCategory>();
  blogPosts.forEach((p) => set.add(p.category));
  return Array.from(set);
}

// ~200 words/minute reading speed, based on paragraph + list word counts.
export function calculateReadTime(post: BlogPost): number {
  let words = 0;
  for (const block of post.content) {
    if (block.type === 'p' || block.type === 'quote' || block.type === 'code') words += block.text.split(/\s+/).length;
    if (block.type === 'h2' || block.type === 'h3') words += block.text.split(/\s+/).length;
    if (block.type === 'ul' || block.type === 'ol') words += block.items.join(' ').split(/\s+/).length;
  }
  return Math.max(1, Math.round(words / 200));
}

export function getTableOfContents(post: BlogPost) {
  return post.content.filter((b) => b.type === 'h2' || b.type === 'h3') as { type: 'h2' | 'h3'; text: string; id: string }[];
}
