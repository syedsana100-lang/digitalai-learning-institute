import type { LearningMode } from './future-readiness';

export type CourseCategory =
  | 'ai-data'
  | 'programming'
  | 'development'
  | 'digital-marketing'
  | 'cloud-security'
  | 'design';

export interface CurriculumModule {
  title: string;
  summary: string;
  lessons: number;
  durationLabel: string; // e.g. "2 weeks"
  topics: string[];
}

export interface CourseFAQ {
  question: string;
  answer: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: CourseCategory;
  shortDescription: string;
  overview: string;
  durationLabel: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  learningMode: LearningMode; // currently always 'online'
  deliveryLabel: string; // e.g. "Live Online + Recorded"
  fee: number | null; // null = "Contact for fee" — never invent real prices
  offerFee: number | null;
  technologies: string[];
  learningOutcomes: string[];
  eligibility: string[];
  curriculum: CurriculumModule[];
  projects: string[];
  instructorId: string;
  faqs: CourseFAQ[];
  seo: {
    title: string;
    description: string;
  };
}

export const categoryMeta: Record<CourseCategory, { label: string; description: string }> = {
  'ai-data': { label: 'AI & Data', description: 'Artificial Intelligence, Data Science, Machine Learning, Generative AI, Data Analytics' },
  programming: { label: 'Programming', description: 'Python, Java, and core programming fundamentals' },
  development: { label: 'Development', description: 'Full Stack, Web, React and backend development' },
  'digital-marketing': { label: 'Digital Marketing', description: 'SEO, Google Ads, Meta Ads, social media marketing' },
  'cloud-security': { label: 'Cloud & Security', description: 'Cloud computing, cyber security, DevOps' },
  design: { label: 'Design', description: 'UI/UX and graphic design' },
};

// PLACEHOLDER DATA — replace fees, durations and outcomes with real program details
// before publishing. Add a new course by appending an object to this array; no
// component code needs to change. See README "How to add a new course".
export const courses: Course[] = [
  {
    id: 'crs-ai-001',
    slug: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    category: 'ai-data',
    shortDescription: 'Build a practical foundation in AI concepts, machine learning and applied projects.',
    overview:
      'A project-based online program covering the core ideas behind modern AI systems, from classical machine learning to applied generative AI, taught through hands-on exercises rather than theory alone.',
    durationLabel: '16 weeks',
    level: 'Beginner',
    learningMode: 'online',
    deliveryLabel: 'Live Online + Recorded',
    fee: null,
    offerFee: null,
    technologies: ['Python', 'scikit-learn', 'TensorFlow', 'Prompt Engineering'],
    learningOutcomes: [
      'Explain core machine learning concepts and when to apply them',
      'Build and evaluate predictive models in Python',
      'Work with generative AI tools and APIs in real projects',
      'Structure an end-to-end AI project from data to deployment',
    ],
    eligibility: ['Basic computer literacy', 'No prior coding experience required'],
    curriculum: [
      { title: 'Foundations', summary: 'Programming and math foundations for AI', lessons: 10, durationLabel: '2 weeks', topics: ['Python basics', 'Statistics for AI', 'Linear algebra essentials'] },
      { title: 'Core Skills', summary: 'Machine learning fundamentals', lessons: 14, durationLabel: '4 weeks', topics: ['Supervised learning', 'Unsupervised learning', 'Model evaluation'] },
      { title: 'Advanced Concepts', summary: 'Neural networks and generative AI', lessons: 12, durationLabel: '4 weeks', topics: ['Neural networks', 'Generative AI', 'Prompt engineering'] },
      { title: 'Tools & Technologies', summary: 'Industry-standard AI tooling', lessons: 8, durationLabel: '2 weeks', topics: ['TensorFlow', 'Jupyter', 'APIs'] },
      { title: 'Projects', summary: 'Applied capstone projects', lessons: 6, durationLabel: '3 weeks', topics: ['Capstone project', 'Peer review'] },
      { title: 'Career Preparation', summary: 'Portfolio and interview readiness', lessons: 4, durationLabel: '1 week', topics: ['Portfolio building', 'Interview practice'] },
    ],
    projects: ['Predictive model on real-world data', 'Generative AI application prototype'],
    instructorId: 'instr-001',
    faqs: [
      { question: 'Do I need a coding background?', answer: 'No — the program starts from Python fundamentals before moving into AI concepts.' },
      { question: 'Is this course live or recorded?', answer: 'Both — you attend live online sessions and get recordings for review.' },
    ],
    seo: {
      title: 'Artificial Intelligence Course Online | DigitalAI Learning Institute',
      description: 'Learn Artificial Intelligence online with practical projects, live mentorship and career support — open to students across India.',
    },
  },
  {
    id: 'crs-ds-002',
    slug: 'data-science',
    title: 'Data Science',
    category: 'ai-data',
    shortDescription: 'Learn to analyze data and build models that drive real decisions.',
    overview:
      'A practical online data science program covering statistics, Python, and machine learning, built around real datasets and business problems.',
    durationLabel: '14 weeks',
    level: 'Beginner',
    learningMode: 'online',
    deliveryLabel: 'Live Online + Recorded',
    fee: null,
    offerFee: null,
    technologies: ['Python', 'Pandas', 'SQL', 'Power BI'],
    learningOutcomes: [
      'Clean, analyze and visualize real-world datasets',
      'Apply statistical methods to draw valid conclusions',
      'Build and evaluate machine learning models',
      'Communicate insights through dashboards and reports',
    ],
    eligibility: ['Comfort with basic computer use', 'No prior data experience required'],
    curriculum: [
      { title: 'Foundations', summary: 'Python and statistics basics', lessons: 10, durationLabel: '2 weeks', topics: ['Python', 'Statistics'] },
      { title: 'Core Skills', summary: 'Data wrangling and SQL', lessons: 12, durationLabel: '3 weeks', topics: ['Pandas', 'SQL', 'Data cleaning'] },
      { title: 'Advanced Concepts', summary: 'Machine learning for data science', lessons: 12, durationLabel: '4 weeks', topics: ['Regression', 'Classification', 'Clustering'] },
      { title: 'Tools & Technologies', summary: 'Visualization and BI tools', lessons: 8, durationLabel: '2 weeks', topics: ['Power BI', 'Tableau basics'] },
      { title: 'Projects', summary: 'End-to-end case studies', lessons: 6, durationLabel: '2 weeks', topics: ['Business case study'] },
      { title: 'Career Preparation', summary: 'Career readiness', lessons: 4, durationLabel: '1 week', topics: ['Resume', 'Interview prep'] },
    ],
    projects: ['Sales analytics dashboard', 'Customer churn prediction model'],
    instructorId: 'instr-002',
    faqs: [
      { question: 'What tools will I learn?', answer: 'Python, SQL, Pandas and Power BI, among the core tools used throughout the program.' },
    ],
    seo: {
      title: 'Data Science Course Online | DigitalAI Learning Institute',
      description: 'Online Data Science course with live mentorship, real projects and career support for students across India.',
    },
  },
  {
    id: 'crs-fs-003',
    slug: 'full-stack-development',
    title: 'Full Stack Development',
    category: 'development',
    shortDescription: 'Learn to design, build and ship complete web applications.',
    overview:
      'An online program covering frontend and backend development, taught through building and deploying real applications end to end.',
    durationLabel: '20 weeks',
    level: 'Beginner',
    learningMode: 'online',
    deliveryLabel: 'Live Online + Recorded',
    fee: null,
    offerFee: null,
    technologies: ['JavaScript', 'React', 'Node.js', 'databases'],
    learningOutcomes: [
      'Build responsive frontend interfaces with React',
      'Design and build backend APIs',
      'Work with databases in real applications',
      'Deploy full stack applications to production',
    ],
    eligibility: ['No prior coding experience required'],
    curriculum: [
      { title: 'Foundations', summary: 'Web fundamentals', lessons: 10, durationLabel: '3 weeks', topics: ['HTML/CSS', 'JavaScript basics'] },
      { title: 'Core Skills', summary: 'Frontend development', lessons: 14, durationLabel: '5 weeks', topics: ['React', 'State management'] },
      { title: 'Advanced Concepts', summary: 'Backend development', lessons: 14, durationLabel: '5 weeks', topics: ['Node.js', 'APIs', 'Databases'] },
      { title: 'Tools & Technologies', summary: 'DevOps essentials', lessons: 8, durationLabel: '2 weeks', topics: ['Git', 'Deployment'] },
      { title: 'Projects', summary: 'Full stack capstone', lessons: 8, durationLabel: '3 weeks', topics: ['Capstone application'] },
      { title: 'Career Preparation', summary: 'Career readiness', lessons: 4, durationLabel: '2 weeks', topics: ['Portfolio', 'Interview prep'] },
    ],
    projects: ['E-commerce web application', 'REST API with authentication'],
    instructorId: 'instr-003',
    faqs: [
      { question: 'Will I build real projects?', answer: 'Yes — the program is structured around building and deploying complete applications.' },
    ],
    seo: {
      title: 'Full Stack Development Course Online | DigitalAI Learning Institute',
      description: 'Learn Full Stack Development online with live projects and mentorship, open to students across India.',
    },
  },
  {
    id: 'crs-dm-004',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    category: 'digital-marketing',
    shortDescription: 'Learn SEO, paid ads and social media marketing through live campaigns.',
    overview:
      'A practical online digital marketing program covering SEO, paid advertising and social media, with hands-on work on live-style campaigns.',
    durationLabel: '12 weeks',
    level: 'Beginner',
    learningMode: 'online',
    deliveryLabel: 'Live Online + Recorded',
    fee: null,
    offerFee: null,
    technologies: ['Google Ads', 'Meta Ads', 'Google Analytics', 'SEO tools'],
    learningOutcomes: [
      'Plan and execute SEO strategies',
      'Run and optimize Google and Meta ad campaigns',
      'Read and act on analytics data',
      'Build a full digital marketing plan',
    ],
    eligibility: ['No prior marketing experience required'],
    curriculum: [
      { title: 'Foundations', summary: 'Digital marketing fundamentals', lessons: 8, durationLabel: '2 weeks', topics: ['Marketing fundamentals', 'Funnels'] },
      { title: 'Core Skills', summary: 'SEO and content', lessons: 10, durationLabel: '3 weeks', topics: ['On-page SEO', 'Content strategy'] },
      { title: 'Advanced Concepts', summary: 'Paid advertising', lessons: 10, durationLabel: '3 weeks', topics: ['Google Ads', 'Meta Ads'] },
      { title: 'Tools & Technologies', summary: 'Analytics tooling', lessons: 6, durationLabel: '2 weeks', topics: ['Google Analytics', 'Tag Manager'] },
      { title: 'Projects', summary: 'Campaign simulation', lessons: 4, durationLabel: '1 week', topics: ['Campaign project'] },
      { title: 'Career Preparation', summary: 'Career readiness', lessons: 4, durationLabel: '1 week', topics: ['Portfolio', 'Interview prep'] },
    ],
    projects: ['Simulated SEO audit', 'Ad campaign plan and report'],
    instructorId: 'instr-004',
    faqs: [
      { question: 'Do I get to run real ad campaigns?', answer: 'You work on live-style campaign simulations and case studies using industry tools.' },
    ],
    seo: {
      title: 'Digital Marketing Course Online | DigitalAI Learning Institute',
      description: 'Online Digital Marketing course covering SEO, Google Ads and Meta Ads, with career support for students across India.',
    },
  },
  {
    id: 'crs-cs-005',
    slug: 'cyber-security',
    title: 'Cyber Security',
    category: 'cloud-security',
    shortDescription: 'Learn to identify, prevent and respond to real-world security threats.',
    overview:
      'A practical online Cyber Security program covering network security, ethical hacking fundamentals and security operations, built around hands-on labs rather than theory alone.',
    durationLabel: '16 weeks',
    level: 'Beginner',
    learningMode: 'online',
    deliveryLabel: 'Live Online + Recorded',
    fee: null,
    offerFee: null,
    technologies: ['Linux', 'Wireshark', 'Kali Linux', 'SIEM basics'],
    learningOutcomes: [
      'Understand core network and system security concepts',
      'Identify common vulnerabilities and attack patterns',
      'Perform basic penetration testing in a lab environment',
      'Understand security operations and incident response basics',
    ],
    eligibility: ['Basic computer and networking familiarity helpful, not required'],
    curriculum: [
      { title: 'Foundations', summary: 'Security and networking fundamentals', lessons: 10, durationLabel: '3 weeks', topics: ['Networking basics', 'Security principles'] },
      { title: 'Core Skills', summary: 'System and network security', lessons: 12, durationLabel: '4 weeks', topics: ['OS hardening', 'Network security'] },
      { title: 'Advanced Concepts', summary: 'Ethical hacking fundamentals', lessons: 12, durationLabel: '4 weeks', topics: ['Vulnerability assessment', 'Penetration testing basics'] },
      { title: 'Tools & Technologies', summary: 'Industry security tooling', lessons: 8, durationLabel: '2 weeks', topics: ['Wireshark', 'Kali Linux', 'SIEM basics'] },
      { title: 'Projects', summary: 'Applied security labs', lessons: 6, durationLabel: '2 weeks', topics: ['Lab-based capstone'] },
      { title: 'Career Preparation', summary: 'Career readiness', lessons: 4, durationLabel: '1 week', topics: ['Portfolio', 'Interview prep'] },
    ],
    projects: ['Network vulnerability assessment report', 'Simulated incident response exercise'],
    instructorId: 'instr-004',
    faqs: [
      { question: 'Do I need prior IT experience?', answer: 'No — the program builds up from networking and security fundamentals before moving into hands-on labs.' },
      { question: 'Will I get hands-on lab practice?', answer: 'Yes, the program includes guided lab exercises using industry-standard security tools.' },
    ],
    seo: {
      title: 'Cyber Security Course Online | DigitalAI Learning Institute',
      description: 'Learn Cyber Security online with hands-on labs, live mentorship and career support — open to students across India.',
    },
  },
];

export function getAllCourses() {
  return courses;
}

export function getCourseBySlug(slug: string) {
  return courses.find((c) => c.slug === slug) || null;
}

export function getCoursesByCategory(category: CourseCategory) {
  return courses.filter((c) => c.category === category);
}
