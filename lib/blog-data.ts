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
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'youtube'; videoId: string; title: string };

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
    featured: true,
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
];

// `featuredImage` is a picsum.photos seed string for the static example posts,
// but a real CDN URL for posts coming from Sanity — this resolves either case
// to a usable <img> src without changing the BlogPost type's existing shape.
export function resolveBlogImageUrl(featuredImage: string, width = 900, height = 500): string {
  if (!featuredImage) return `https://picsum.photos/seed/blog-placeholder/${width}/${height}`;
  if (featuredImage.startsWith('http')) return featuredImage;
  return `https://picsum.photos/seed/${featuredImage}/${width}/${height}`;
}

export function categoryToSlug(category: BlogCategory): string {
  return category.toLowerCase().replace(/\s+/g, '-');
}

export function slugToCategory(slug: string): BlogCategory | null {
  return allCategories.find((c) => categoryToSlug(c) === slug) || null;
}

export function getAllPosts(posts: BlogPost[] = blogPosts) {
  return posts;
}

export function getPostBySlug(slug: string, posts: BlogPost[] = blogPosts) {
  return posts.find((p) => p.slug === slug) || null;
}

export function getFeaturedPost(posts: BlogPost[] = blogPosts) {
  return posts.find((p) => p.featured) || posts[0];
}

export function getPopularPosts(excludeSlug?: string, limit = 4, posts: BlogPost[] = blogPosts) {
  return posts.filter((p) => p.popular && p.slug !== excludeSlug).slice(0, limit);
}

export function getTrendingPosts(excludeSlug?: string, limit = 4, posts: BlogPost[] = blogPosts) {
  return posts.filter((p) => p.trending && p.slug !== excludeSlug).slice(0, limit);
}

export function getLatestPosts(excludeSlug?: string, limit = 6, posts: BlogPost[] = blogPosts) {
  return [...posts]
    .filter((p) => p.slug !== excludeSlug)
    .sort((a, b) => (a.publishedISO < b.publishedISO ? 1 : -1))
    .slice(0, limit);
}

export function getRelatedPosts(post: BlogPost, limit = 3, posts: BlogPost[] = blogPosts) {
  const sameCategory = posts.filter((p) => p.slug !== post.slug && p.category === post.category);
  const sameTag = posts.filter(
    (p) => p.slug !== post.slug && p.category !== post.category && p.tags.some((t) => post.tags.includes(t))
  );
  return [...sameCategory, ...sameTag].slice(0, limit);
}

export function getPostsByCategory(category: BlogCategory, posts: BlogPost[] = blogPosts) {
  return posts.filter((p) => p.category === category);
}

export function getPostsByTag(tag: string, posts: BlogPost[] = blogPosts) {
  return posts.filter((p) => p.tags.includes(tag));
}

export function getAllTags(posts: BlogPost[] = blogPosts): string[] {
  const set = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

export function getCategoriesInUse(posts: BlogPost[] = blogPosts): BlogCategory[] {
  const set = new Set<BlogCategory>();
  posts.forEach((p) => set.add(p.category));
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
