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
  whyLearn: string; // "Why Learn This Course" paragraph
  careerOpportunities: string[]; // job roles this course prepares students for
  industryDemand: string; // directional, non-numeric framing — no invented stats
  careerRoadmap: string[]; // step-by-step path from enrolling to job-ready
  heroImageUrl?: string;
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
    technologies: [
      'Python', 'NumPy & Pandas', 'scikit-learn', 'TensorFlow', 'PyTorch basics',
      'Prompt Engineering', 'OpenAI/LLM APIs', 'Jupyter Notebooks', 'Git & Version Control',
    ],
    learningOutcomes: [
      'Explain core machine learning concepts and when to apply them',
      'Build and evaluate predictive models in Python',
      'Design and train basic neural networks from scratch',
      'Work with generative AI tools and LLM APIs in real projects',
      'Write effective prompts for applied AI workflows',
      'Structure an end-to-end AI project from data to deployment',
    ],
    eligibility: [
      'Students and graduates exploring a career in AI',
      'Working professionals looking to add AI skills to their current role',
      'Career switchers moving into tech from a non-technical background',
      'Basic computer literacy — no prior coding experience required',
    ],
    curriculum: [
      { title: 'Programming & Math Foundations', summary: 'Python, statistics and linear algebra for AI', lessons: 10, durationLabel: '2 weeks', topics: ['Python basics', 'Statistics for AI', 'Linear algebra essentials'] },
      { title: 'Data Handling for AI', summary: 'Preparing real-world data for models', lessons: 8, durationLabel: '2 weeks', topics: ['NumPy & Pandas', 'Data cleaning', 'Feature engineering basics'] },
      { title: 'Machine Learning Fundamentals', summary: 'Supervised and unsupervised learning', lessons: 14, durationLabel: '3 weeks', topics: ['Supervised learning', 'Unsupervised learning', 'Model evaluation'] },
      { title: 'Neural Networks & Deep Learning', summary: 'Building and training neural networks', lessons: 12, durationLabel: '3 weeks', topics: ['Neural network basics', 'TensorFlow', 'PyTorch basics'] },
      { title: 'Generative AI & LLMs', summary: 'Working with modern generative AI systems', lessons: 10, durationLabel: '2 weeks', topics: ['Generative AI concepts', 'Prompt engineering', 'LLM APIs'] },
      { title: 'Tools & Deployment', summary: 'Industry-standard AI tooling', lessons: 8, durationLabel: '2 weeks', topics: ['Jupyter', 'Git', 'Model deployment basics'] },
      { title: 'Capstone Projects', summary: 'Applied, portfolio-worthy projects', lessons: 6, durationLabel: '2 weeks', topics: ['Capstone project', 'Peer review'] },
      { title: 'Career Preparation', summary: 'Portfolio and interview readiness', lessons: 4, durationLabel: '1 week', topics: ['Portfolio building', 'Interview practice'] },
    ],
    projects: ['Predictive model on real-world data', 'Generative AI application prototype', 'End-to-end ML pipeline from data to deployment'],
    instructorId: 'instr-001',
    faqs: [
      { question: 'What is Artificial Intelligence, in practical terms?', answer: 'AI refers to systems that can learn patterns from data and make predictions or decisions — from recommendation engines to generative tools like ChatGPT.' },
      { question: 'Do I need a coding background?', answer: 'No — the program starts from Python fundamentals before moving into AI concepts.' },
      { question: 'Do I need a strong math background?', answer: 'A basic comfort with numbers helps, but the course teaches the statistics and linear algebra you need as you go — no advanced math background is required upfront.' },
      { question: 'Is this course live or recorded?', answer: 'Both — you attend live online sessions and get recordings for review.' },
      { question: 'What is the difference between this course and a Data Science course?', answer: 'This course goes deeper into machine learning and neural network fundamentals, including generative AI; our Data Science course integrates lighter ML with broader analytics, SQL and business communication skills.' },
      { question: 'Will I learn Generative AI and ChatGPT-style tools?', answer: 'Yes — there\u2019s a dedicated module on generative AI concepts, prompt engineering and working with LLM APIs.' },
      { question: 'What career roles does this prepare me for?', answer: 'Roles like AI/ML Engineer, Machine Learning Associate, and Generative AI Engineer — see the Career Opportunities section on this page.' },
      { question: 'Is there a job guarantee?', answer: 'No — we don\u2019t offer or claim a job guarantee. We provide placement assistance and career support on eligible plans; outcomes depend on individual performance.' },
      { question: 'What is the course fee?', answer: 'See the Fees page or contact us directly for current pricing.' },
      { question: 'Will I build real projects?', answer: 'Yes — the program includes a predictive modeling project, a generative AI prototype, and an end-to-end ML pipeline capstone.' },
      { question: 'Do I get a certificate?', answer: 'Yes, a certificate of completion is issued after finishing required modules and the capstone project.' },
      { question: 'Can I switch into AI from a non-technical background?', answer: 'Yes — many learners start with no coding experience; the course is structured to build up from fundamentals.' },
    ],
    whyLearn:
      'AI is moving from a specialist skill to a baseline expectation across software, data, marketing and operations roles. Learning practical AI — not just the theory — means you can build, evaluate and ship models rather than only talk about them, which is what separates job-ready candidates from casual learners.',
    careerOpportunities: ['AI/ML Engineer', 'Machine Learning Associate', 'AI Product Analyst', 'Applied AI Developer', 'Generative AI Engineer'],
    industryDemand:
      'Demand for applied AI skills has grown steadily across Indian tech, product and services companies as more teams adopt AI tooling in their workflows — this program focuses on the practical, applied skills employers are actually screening for, rather than academic theory alone.',
    careerRoadmap: [
      'Enroll and complete the Python + statistics foundations module',
      'Build core machine learning skills through guided exercises',
      'Work hands-on with neural networks and generative AI tools',
      'Complete a capstone project you can show in interviews',
      'Get resume, portfolio and interview preparation support',
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
    technologies: [
      'Python', 'Pandas & NumPy', 'SQL', 'Power BI', 'Tableau basics',
      'Excel (Advanced)', 'Jupyter Notebooks', 'Statistics & A/B Testing', 'Git & Version Control',
    ],
    learningOutcomes: [
      'Clean, analyze and visualize real-world datasets',
      'Write complex SQL queries to extract business insights',
      'Apply statistical methods to draw valid conclusions',
      'Build and evaluate machine learning models for prediction',
      'Design dashboards that communicate insights to non-technical stakeholders',
      'Translate data findings into clear business recommendations',
    ],
    eligibility: [
      'Students and graduates exploring a data-focused career',
      'Working professionals looking to move into data analytics or data science',
      'Business and commerce backgrounds — no engineering degree required',
      'Comfort with basic computer use — no prior data experience needed',
    ],
    curriculum: [
      { title: 'Python & Statistics Foundations', summary: 'Programming and statistical thinking basics', lessons: 10, durationLabel: '2 weeks', topics: ['Python basics', 'Descriptive statistics', 'Probability basics'] },
      { title: 'Data Wrangling & SQL', summary: 'Cleaning and querying real datasets', lessons: 12, durationLabel: '3 weeks', topics: ['Pandas', 'SQL queries', 'Data cleaning'] },
      { title: 'Exploratory Data Analysis', summary: 'Finding patterns before modeling', lessons: 8, durationLabel: '2 weeks', topics: ['Data visualization', 'Correlation analysis', 'Outlier detection'] },
      { title: 'Machine Learning for Data Science', summary: 'Predictive modeling techniques', lessons: 12, durationLabel: '3 weeks', topics: ['Regression', 'Classification', 'Clustering'] },
      { title: 'Statistical Testing', summary: 'Validating findings rigorously', lessons: 6, durationLabel: '1 week', topics: ['Hypothesis testing', 'A/B testing basics'] },
      { title: 'Visualization & BI Tools', summary: 'Communicating insights visually', lessons: 8, durationLabel: '2 weeks', topics: ['Power BI', 'Tableau basics', 'Dashboard design'] },
      { title: 'Capstone Case Studies', summary: 'End-to-end business case studies', lessons: 6, durationLabel: '2 weeks', topics: ['Business case study', 'Stakeholder presentation'] },
      { title: 'Career Preparation', summary: 'Career readiness', lessons: 4, durationLabel: '1 week', topics: ['Resume', 'Interview prep'] },
    ],
    projects: ['Sales analytics dashboard', 'Customer churn prediction model', 'End-to-end business case study with stakeholder report'],
    instructorId: 'instr-002',
    faqs: [
      { question: 'What tools will I learn?', answer: 'Python, SQL, Pandas, Power BI and Tableau basics, among the core tools used throughout the program.' },
      { question: 'What is the difference between Data Science and Data Analytics?', answer: 'Data analytics focuses more on descriptive reporting and dashboards, while data science adds predictive modeling and machine learning on top of that analytical foundation. This course covers both.' },
      { question: 'Do I need a strong math background?', answer: 'A basic comfort with numbers is enough — the course teaches the statistics you need for the work, building up gradually.' },
      { question: 'Is SQL covered in this course?', answer: 'Yes — a full module is dedicated to writing SQL queries for real-world data extraction and analysis.' },
      { question: 'Will I work with real datasets?', answer: 'Yes — the program is built around real-style, messy datasets rather than clean textbook examples, including full business case studies.' },
      { question: 'What career roles does this prepare me for?', answer: 'Roles like Data Analyst, Junior Data Scientist, and Business Intelligence Analyst — see the Career Opportunities section on this page.' },
      { question: 'Is there a job guarantee?', answer: 'No — we don\u2019t offer or claim a job guarantee. We provide placement assistance and career support on eligible plans; outcomes depend on individual performance.' },
      { question: 'What is the course fee?', answer: 'See the Fees page or contact us directly for current pricing.' },
      { question: 'Can commerce or non-engineering graduates join?', answer: 'Yes — this course is designed to be accessible regardless of your degree background.' },
      { question: 'Will I get a certificate?', answer: 'Yes, a certificate of completion is issued after finishing required modules and the capstone case study.' },
      { question: 'How is this different from just learning Excel?', answer: 'Excel is one tool covered briefly; this course goes much further into SQL, Python, statistical testing and machine learning for deeper, more scalable analysis.' },
      { question: 'Do you teach dashboard tools like Power BI?', answer: 'Yes — a dedicated module covers Power BI and Tableau basics for building stakeholder-ready dashboards.' },
    ],
    whyLearn:
      'Data-driven decision-making has become standard practice across nearly every industry, from e-commerce to healthcare to finance. This program is built to get you comfortable working with real, messy data — not clean textbook datasets — so what you learn transfers directly to a job.',
    careerOpportunities: ['Data Analyst', 'Junior Data Scientist', 'Business Intelligence Analyst', 'Reporting & Insights Analyst', 'Data Science Associate'],
    industryDemand:
      'Companies across sectors continue to invest in data teams as they look to make decisions backed by evidence rather than intuition — this program is built around the analytical and communication skills that make data professionals genuinely useful to a business.',
    careerRoadmap: [
      'Enroll and build your Python and statistics foundation',
      'Learn data wrangling and SQL for real-world datasets',
      'Apply machine learning techniques to business problems',
      'Build dashboards and visualizations that communicate insights clearly',
      'Complete a business case-study capstone and get career support',
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
    technologies: [
      'HTML5 & CSS3', 'JavaScript (ES6+)', 'React', 'Node.js', 'Express.js',
      'MongoDB & SQL databases', 'Git & GitHub', 'REST APIs', 'Deployment (Vercel/Render)',
    ],
    learningOutcomes: [
      'Build responsive, accessible frontend interfaces with React',
      'Design and build secure backend REST APIs',
      'Work with both SQL and NoSQL databases in real applications',
      'Implement authentication and authorization in web apps',
      'Use Git for version control in a team-style workflow',
      'Deploy full stack applications to production hosting',
    ],
    eligibility: [
      'Students and graduates starting a career in software development',
      'Working professionals switching into web development',
      'Career switchers from non-technical fields',
      'No prior coding experience required',
    ],
    curriculum: [
      { title: 'Web Fundamentals', summary: 'HTML, CSS and JavaScript basics', lessons: 10, durationLabel: '2 weeks', topics: ['HTML/CSS', 'JavaScript basics', 'Responsive design'] },
      { title: 'JavaScript Deep Dive', summary: 'Modern JavaScript for real applications', lessons: 8, durationLabel: '2 weeks', topics: ['ES6+ features', 'Async JavaScript', 'DOM manipulation'] },
      { title: 'Frontend Development with React', summary: 'Building interactive UIs', lessons: 14, durationLabel: '4 weeks', topics: ['React fundamentals', 'Hooks', 'State management'] },
      { title: 'Backend Development', summary: 'Server-side programming with Node.js', lessons: 14, durationLabel: '4 weeks', topics: ['Node.js', 'Express.js', 'REST API design'] },
      { title: 'Databases', summary: 'Working with SQL and NoSQL databases', lessons: 10, durationLabel: '3 weeks', topics: ['SQL databases', 'MongoDB', 'Database design'] },
      { title: 'Authentication & Security Basics', summary: 'Protecting real applications', lessons: 6, durationLabel: '1 week', topics: ['Authentication', 'Authorization', 'Security fundamentals'] },
      { title: 'Git, Tools & Deployment', summary: 'Team workflows and shipping to production', lessons: 8, durationLabel: '2 weeks', topics: ['Git & GitHub', 'Deployment', 'Environment configuration'] },
      { title: 'Capstone & Career Preparation', summary: 'Full stack capstone project', lessons: 8, durationLabel: '2 weeks', topics: ['Capstone application', 'Portfolio', 'Interview prep'] },
    ],
    projects: ['E-commerce web application', 'REST API with authentication', 'Full stack capstone application deployed to production'],
    instructorId: 'instr-003',
    faqs: [
      { question: 'Will I build real projects?', answer: 'Yes — the program is structured around building and deploying complete applications, including a full stack capstone.' },
      { question: 'What is the difference between Frontend, Backend and Full Stack?', answer: 'Frontend focuses on what users see and interact with (UI), backend handles data and business logic on the server, and full stack means being comfortable working across both.' },
      { question: 'Do I need prior coding experience?', answer: 'No — the course starts from HTML, CSS and JavaScript fundamentals.' },
      { question: 'What will I actually be able to build after this course?', answer: 'A complete, deployed web application with a working frontend, backend API, database, and authentication — like the projects covered in this course.' },
      { question: 'Is React the only frontend framework taught?', answer: 'React is the primary frontend framework taught, since it\u2019s widely used in current hiring — the fundamentals also transfer well to other frameworks.' },
      { question: 'Will I learn both SQL and NoSQL databases?', answer: 'Yes — the Databases module covers both SQL databases and MongoDB (NoSQL).' },
      { question: 'What career roles does this prepare me for?', answer: 'Roles like Full Stack Developer, Frontend Developer, and Backend Developer — see the Career Opportunities section on this page.' },
      { question: 'Is there a job guarantee?', answer: 'No — we don\u2019t offer or claim a job guarantee. We provide placement assistance and career support on eligible plans; outcomes depend on individual performance.' },
      { question: 'What is the course fee?', answer: 'See the Fees page or contact us directly for current pricing.' },
      { question: 'Will I learn how to deploy my projects online?', answer: 'Yes — a dedicated module covers deployment so your capstone project is live and shareable, not just running locally.' },
      { question: 'Will I get a certificate?', answer: 'Yes, a certificate of completion is issued after finishing required modules and the capstone project.' },
      { question: 'Do you teach Git and team collaboration workflows?', answer: 'Yes — Git and GitHub are covered as part of the tools module, reflecting how real development teams collaborate.' },
    ],
    whyLearn:
      'Full stack developers who can move comfortably between frontend, backend and deployment are consistently valuable to both startups and larger engineering teams, because they can own a feature end to end instead of waiting on handoffs between specialists.',
    careerOpportunities: ['Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'Software Engineer', 'Web Application Developer'],
    industryDemand:
      'Web application development remains one of the most consistently in-demand technical skill sets in Indian tech hiring, spanning startups, product companies and IT services alike — this program is built around the modern JavaScript stack most teams are actually using.',
    careerRoadmap: [
      'Enroll and build your HTML, CSS and JavaScript foundation',
      'Learn React and frontend state management',
      'Build backend APIs and work with databases using Node.js',
      'Learn Git and deployment workflows used in real teams',
      'Ship a full stack capstone application and get career support',
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
    shortDescription: 'Master SEO, Google Ads, Meta Ads, analytics and AI marketing tools through live, hands-on campaigns.',
    overview:
      'A practical online Digital Marketing program covering SEO, paid advertising, social media, content, email marketing and AI-powered marketing tools — built around live-style campaigns and real client-style briefs rather than passive video lessons.',
    durationLabel: '12 weeks',
    level: 'Beginner',
    learningMode: 'online',
    deliveryLabel: 'Live Online + Recorded',
    fee: null,
    offerFee: null,
    technologies: [
      'Google Ads', 'Meta Ads', 'Google Analytics 4', 'Google Tag Manager', 'Google Search Console',
      'SEO Tools (SEMrush/Ahrefs-style workflows)', 'Mailchimp', 'WordPress', 'Canva', 'ChatGPT & AI Marketing Tools',
    ],
    learningOutcomes: [
      'Plan and execute on-page, off-page and technical SEO strategies',
      'Run and optimize Google Search, Display and YouTube ad campaigns',
      'Build and scale Meta (Facebook & Instagram) ad campaigns with retargeting',
      'Read and act on GA4 and Google Tag Manager data',
      'Use AI tools for content, ad copy and campaign ideation',
      'Build a complete, presentable digital marketing plan for a real business',
    ],
    eligibility: [
      'Students & fresh graduates starting a digital career',
      'Working professionals looking to upskill or switch careers',
      'Business owners and entrepreneurs who want to market online themselves',
      'Freelancers and creators looking to offer marketing services',
      'No prior marketing or technical background required',
    ],
    curriculum: [
      { title: 'Digital Marketing Foundations', summary: 'Core concepts, funnels and buyer psychology', lessons: 8, durationLabel: '1 week', topics: ['Marketing fundamentals', 'Customer journey', 'Marketing funnels', 'Buyer personas'] },
      { title: 'Search Engine Optimization (SEO)', summary: 'Ranking websites organically on Google', lessons: 10, durationLabel: '2 weeks', topics: ['On-page SEO', 'Technical SEO', 'Off-page & link building', 'Local SEO'] },
      { title: 'Google Ads & Paid Search', summary: 'Running high-converting PPC campaigns', lessons: 10, durationLabel: '2 weeks', topics: ['Search Ads', 'Display Ads', 'YouTube Ads', 'Shopping Ads'] },
      { title: 'Meta Ads (Facebook & Instagram)', summary: 'Paid social campaigns and retargeting', lessons: 8, durationLabel: '2 weeks', topics: ['Campaign structure', 'Pixel & conversions', 'Creative strategy', 'Retargeting'] },
      { title: 'Content & Social Media Marketing', summary: 'Organic growth and content strategy', lessons: 8, durationLabel: '1 week', topics: ['Content strategy', 'Reels & short-form video', 'Community growth'] },
      { title: 'Email Marketing & Automation', summary: 'Nurture campaigns that convert', lessons: 6, durationLabel: '1 week', topics: ['Email platforms', 'Drip campaigns', 'List segmentation'] },
      { title: 'Analytics & Tag Management', summary: 'Measuring what actually works', lessons: 8, durationLabel: '1 week', topics: ['GA4 setup', 'Events & conversions', 'Google Tag Manager'] },
      { title: 'AI Tools for Marketing', summary: 'Using AI to speed up marketing workflows', lessons: 6, durationLabel: '1 week', topics: ['AI content workflows', 'AI ad copy', 'Marketing automation basics'] },
      { title: 'Capstone Project & Career Preparation', summary: 'Real campaign project and job readiness', lessons: 6, durationLabel: '1 week', topics: ['Full campaign project', 'Portfolio', 'Interview prep'] },
    ],
    projects: ['Complete SEO audit for a real-style website', 'End-to-end Google + Meta ad campaign plan and report', 'AI-assisted content and campaign strategy project'],
    instructorId: 'instr-004',
    faqs: [
      { question: 'What is Digital Marketing?', answer: 'Digital Marketing is the practice of promoting products and services through digital channels like search engines, social media, email and websites, using data and paid ads to reach customers where they spend time online.' },
      { question: 'Is Digital Marketing a good career option?', answer: 'Demand for digital marketing skills has grown steadily as more businesses shift spend online — it offers paths into in-house teams, agencies, or freelancing.' },
      { question: 'Can a complete beginner learn Digital Marketing?', answer: 'Yes — this course starts from marketing fundamentals and assumes no prior experience.' },
      { question: 'Do I need coding skills for Digital Marketing?', answer: 'No coding is required for this course — the tools taught (Google Ads, Meta Ads, GA4, WordPress, etc.) don\u2019t require programming knowledge.' },
      { question: 'How long does it take to become job-ready in Digital Marketing?', answer: 'This course runs 12 weeks; how quickly you become job-ready after that depends on the strength of your portfolio and how actively you apply.' },
      { question: 'Do you get to run real ad campaigns?', answer: 'You work on live-style campaign simulations and case-study briefs using real industry tools like Google Ads and Meta Ads Manager.' },
      { question: 'What AI tools are taught in this course?', answer: 'The course includes a dedicated module on using AI tools like ChatGPT for content, ad copy, and campaign ideation as part of a modern marketing workflow.' },
      { question: 'Is there a job guarantee?', answer: 'No — we do not offer or claim a job guarantee. We provide placement assistance, resume support and interview preparation on eligible plans; outcomes depend on individual performance.' },
      { question: 'What is the fee for this course?', answer: 'See the Fees page or contact us directly — we don\u2019t publish invented figures here.' },
      { question: 'Do you offer EMI options?', answer: 'Yes, EMI is available on eligible plans — check the Fees page for details.' },
      { question: 'Will I get a certificate?', answer: 'Yes, a certificate of completion is issued after finishing required modules and the capstone project.' },
      { question: 'Are classes online or in-person?', answer: 'This program is delivered online (live + recorded); DigitalAI Learning also has an in-person centre in Noida for other learning formats.' },
      { question: 'What is the difference between SEO and Google Ads?', answer: 'SEO focuses on ranking organically in search results over time at no direct cost-per-click, while Google Ads is paid search advertising that delivers faster, but ongoing, visibility.' },
      { question: 'Do you provide recordings of live classes?', answer: 'Yes, all live sessions are recorded and made available for review.' },
      { question: 'Can I start freelancing after this course?', answer: 'The curriculum covers practical, client-ready skills across SEO and paid ads that can support freelance work, though building a client base takes additional effort beyond the course itself.' },
    ],
    whyLearn:
      'Every business with an online presence needs someone who understands how to reach the right audience efficiently. Digital marketing skills are practical and immediately applicable, whether you want to work in-house, at an agency, or freelance.',
    careerOpportunities: ['Digital Marketing Executive', 'SEO Specialist', 'Performance Marketing Associate', 'Social Media Marketer', 'Marketing Analyst'],
    industryDemand:
      'As more businesses shift ad spend online, demand for people who can plan, execute and measure digital campaigns has grown steadily — this program is built around the tools and platforms marketing teams use day to day.',
    careerRoadmap: [
      'Enroll and build your marketing fundamentals and funnel knowledge',
      'Learn on-page SEO and content strategy',
      'Run simulated Google Ads and Meta Ads campaigns',
      'Learn to read and act on Google Analytics data',
      'Complete a campaign project and get career support',
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
    technologies: [
      'Linux', 'Wireshark', 'Kali Linux', 'Nmap', 'Burp Suite basics',
      'SIEM basics', 'Firewalls & VPNs', 'Cryptography fundamentals',
    ],
    learningOutcomes: [
      'Understand core network and system security concepts',
      'Identify common vulnerabilities and attack patterns',
      'Perform basic penetration testing in a lab environment',
      'Configure firewalls and secure network architecture basics',
      'Understand encryption and cryptography fundamentals',
      'Understand security operations and incident response basics',
    ],
    eligibility: [
      'Students and graduates interested in a security career',
      'IT professionals looking to specialize in security',
      'Career switchers with an interest in problem-solving and systems',
      'Basic computer and networking familiarity helpful, not required',
    ],
    curriculum: [
      { title: 'Networking & Security Fundamentals', summary: 'Building the foundation for security work', lessons: 10, durationLabel: '2 weeks', topics: ['Networking basics', 'Security principles', 'The CIA triad'] },
      { title: 'System & OS Security', summary: 'Hardening systems against attack', lessons: 10, durationLabel: '3 weeks', topics: ['OS hardening', 'Linux security', 'Access control'] },
      { title: 'Network Security', summary: 'Protecting network infrastructure', lessons: 10, durationLabel: '3 weeks', topics: ['Firewalls', 'VPNs', 'Network monitoring'] },
      { title: 'Cryptography Fundamentals', summary: 'How data protection actually works', lessons: 6, durationLabel: '1 week', topics: ['Encryption basics', 'Hashing', 'Certificates'] },
      { title: 'Ethical Hacking & Vulnerability Assessment', summary: 'Thinking like an attacker, safely', lessons: 12, durationLabel: '3 weeks', topics: ['Vulnerability assessment', 'Penetration testing basics', 'Nmap & scanning'] },
      { title: 'Security Tools', summary: 'Industry-standard security tooling', lessons: 8, durationLabel: '2 weeks', topics: ['Wireshark', 'Kali Linux', 'Burp Suite basics'] },
      { title: 'Security Operations & SIEM', summary: 'Monitoring and responding to threats', lessons: 8, durationLabel: '2 weeks', topics: ['SIEM basics', 'Log analysis', 'Incident response'] },
      { title: 'Capstone Labs & Career Preparation', summary: 'Applied security labs', lessons: 6, durationLabel: '1 week', topics: ['Lab-based capstone', 'Portfolio', 'Interview prep'] },
    ],
    projects: ['Network vulnerability assessment report', 'Simulated incident response exercise', 'End-to-end security audit of a lab environment'],
    instructorId: 'instr-004',
    faqs: [
      { question: 'Do I need prior IT experience?', answer: 'No — the program builds up from networking and security fundamentals before moving into hands-on labs.' },
      { question: 'Will I get hands-on lab practice?', answer: 'Yes, the program includes guided lab exercises using industry-standard security tools like Wireshark, Kali Linux and Burp Suite.' },
      { question: 'Is ethical hacking legal to learn?', answer: 'Yes — this course teaches ethical hacking techniques strictly for authorized, lab-based learning and defensive security purposes.' },
      { question: 'What is the difference between this course and general IT training?', answer: 'This course focuses specifically on identifying, preventing and responding to security threats, rather than general IT operations or support.' },
      { question: 'Do I need to know cryptography beforehand?', answer: 'No — a dedicated module covers cryptography fundamentals (encryption, hashing, certificates) from the ground up.' },
      { question: 'What career roles does this prepare me for?', answer: 'Roles like Security Analyst, SOC Analyst (entry level), and Junior Penetration Tester — see the Career Opportunities section on this page.' },
      { question: 'Is there a job guarantee?', answer: 'No — we don\u2019t offer or claim a job guarantee. We provide placement assistance and career support on eligible plans; outcomes depend on individual performance.' },
      { question: 'What is the course fee?', answer: 'See the Fees page or contact us directly for current pricing.' },
      { question: 'Will I learn SIEM tools?', answer: 'Yes — a module covers SIEM basics and log analysis as part of security operations.' },
      { question: 'Will I get a certificate?', answer: 'Yes, a certificate of completion is issued after finishing required modules and the capstone lab project.' },
      { question: 'Is this course only theory, or hands-on?', answer: 'It\u2019s built around hands-on labs — vulnerability assessments, simulated incident response, and a full security audit capstone.' },
      { question: 'Do I need my own lab equipment?', answer: 'No — labs are conducted using accessible virtual environments and tools; you just need a computer with a stable internet connection.' },
    ],
    whyLearn:
      'As more business operations move online, the need for people who can identify and respond to security risks has grown alongside it. This program focuses on practical, lab-based skills rather than certification theory alone, so you leave able to actually do the work.',
    careerOpportunities: ['Security Analyst', 'SOC Analyst (Entry Level)', 'Junior Penetration Tester', 'IT Security Associate', 'Vulnerability Analyst'],
    industryDemand:
      'Organizations across sectors continue to invest in security teams as digital operations expand and threats evolve — this program is built around the foundational, hands-on skills most entry-level security roles actually require.',
    careerRoadmap: [
      'Enroll and build your networking and security fundamentals',
      'Learn system and network security hardening',
      'Practice vulnerability assessment and penetration testing basics',
      'Get hands-on with Wireshark, Kali Linux and SIEM basics',
      'Complete a lab-based capstone and get career support',
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
