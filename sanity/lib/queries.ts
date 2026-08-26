import { client } from './client';
import { urlFor } from './image';
import { portableTextToContentBlocks } from './transform';
import type { BlogPost } from '@/lib/blog-data';
import type { BlogAuthor } from '@/lib/blog-authors-data';
import type { Course, CourseCategory } from '@/lib/courses-data';

// ---- GROQ projections --------------------------------------------------

const blogPostProjection = /* groq */ `{
  "slug": slug.current,
  title,
  category,
  tags,
  excerpt,
  "authorId": author->slug.current,
  "authorName": author->name,
  "authorDesignation": author->designation,
  "authorBio": author->bio,
  "authorAvatar": author->avatar,
  "authorLinkedin": author->linkedin,
  "authorTwitter": author->twitter,
  publishedDate,
  updatedDate,
  body,
  faqs,
  "featuredImage": featuredImage,
  featured,
  popular,
  trending,
  seo
}`;

const courseProjection = /* groq */ `{
  "slug": slug.current,
  title,
  category,
  heroImage,
  shortDescription,
  overview,
  durationLabel,
  level,
  deliveryLabel,
  fee,
  offerFee,
  technologies,
  learningOutcomes,
  eligibility,
  curriculum,
  projects,
  instructorName,
  faqs,
  seo
}`;

// ---- Transform helpers ----------------------------------------------------

function formatDate(iso?: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

function toBlogPost(doc: Record<string, unknown>): BlogPost {
  const featuredImg = urlFor(doc.featuredImage as never);
  const publishedISO = String(doc.publishedDate || '').slice(0, 10);
  return {
    slug: String(doc.slug),
    title: String(doc.title),
    category: doc.category as BlogPost['category'],
    tags: (doc.tags as string[]) || [],
    excerpt: String(doc.excerpt || ''),
    authorId: String(doc.authorId || 'digitalai-team'),
    publishedDate: formatDate(doc.publishedDate as string),
    publishedISO,
    updatedISO: doc.updatedDate ? String(doc.updatedDate).slice(0, 10) : undefined,
    content: portableTextToContentBlocks(doc.body as never),
    faqs: (doc.faqs as BlogPost['faqs']) || undefined,
    featuredImage: featuredImg ? featuredImg.width(1200).url() : '',
    featured: Boolean(doc.featured),
    popular: Boolean(doc.popular),
    trending: Boolean(doc.trending),
    seo: {
      title: String((doc.seo as Record<string, unknown> | undefined)?.metaTitle || doc.title),
      description: String((doc.seo as Record<string, unknown> | undefined)?.metaDescription || doc.excerpt || ''),
    },
  };
}

function toBlogAuthor(doc: Record<string, unknown>): BlogAuthor {
  const avatar = urlFor(doc.authorAvatar as never);
  return {
    id: String(doc.authorId || 'digitalai-team'),
    name: String(doc.authorName || 'DigitalAI Team'),
    designation: String(doc.authorDesignation || ''),
    bio: String(doc.authorBio || ''),
    avatarSeed: String(doc.authorId || 'digitalai-team'),
    avatarUrl: avatar ? avatar.width(96).height(96).url() : undefined,
    social: {
      linkedin: (doc.authorLinkedin as string) || undefined,
      twitter: (doc.authorTwitter as string) || undefined,
    },
  };
}

function toCourse(doc: Record<string, unknown>): Course {
  const hero = urlFor(doc.heroImage as never);
  return {
    id: `sanity-${doc.slug}`,
    slug: String(doc.slug),
    title: String(doc.title),
    category: doc.category as CourseCategory,
    shortDescription: String(doc.shortDescription || ''),
    overview: String(doc.overview || ''),
    durationLabel: String(doc.durationLabel || ''),
    level: (doc.level as Course['level']) || 'Beginner',
    learningMode: 'online',
    deliveryLabel: String(doc.deliveryLabel || ''),
    fee: (doc.fee as number) ?? null,
    offerFee: (doc.offerFee as number) ?? null,
    technologies: (doc.technologies as string[]) || [],
    learningOutcomes: (doc.learningOutcomes as string[]) || [],
    eligibility: (doc.eligibility as string[]) || [],
    curriculum: (doc.curriculum as Course['curriculum']) || [],
    projects: (doc.projects as string[]) || [],
    instructorId: String(doc.instructorName || ''),
    faqs: (doc.faqs as Course['faqs']) || [],
    seo: {
      title: String((doc.seo as Record<string, unknown> | undefined)?.metaTitle || doc.title),
      description: String((doc.seo as Record<string, unknown> | undefined)?.metaDescription || doc.shortDescription || ''),
    },
    heroImageUrl: hero ? hero.width(1600).url() : undefined,
  };
}

// ---- Public fetch helpers --------------------------------------------------
// Every function returns null/[] instead of throwing, so callers can safely
// fall back to the static arrays in lib/blog-data.ts and lib/courses-data.ts
// when Sanity isn't configured or a request fails (offline, misconfigured
// dataset, etc.) — this is what keeps the CMS layer purely additive.

export async function fetchSanityBlogPosts(): Promise<BlogPost[]> {
  if (!client) return [];
  try {
    const docs = await client.fetch(`*[_type == "blogPost"]${blogPostProjection}`);
    return (docs || []).map(toBlogPost);
  } catch {
    return [];
  }
}

export async function fetchSanityBlogAuthors(): Promise<BlogAuthor[]> {
  if (!client) return [];
  try {
    const docs = await client.fetch(
      `*[_type == "blogPost"]{"authorId": author->slug.current, "authorName": author->name, "authorDesignation": author->designation, "authorBio": author->bio, "authorAvatar": author->avatar, "authorLinkedin": author->linkedin, "authorTwitter": author->twitter}`
    );
    const seen = new Map<string, BlogAuthor>();
    for (const doc of docs || []) {
      if (doc.authorId && !seen.has(doc.authorId)) seen.set(doc.authorId, toBlogAuthor(doc));
    }
    return Array.from(seen.values());
  } catch {
    return [];
  }
}

export async function fetchSanityCourses(): Promise<Course[]> {
  if (!client) return [];
  try {
    const docs = await client.fetch(`*[_type == "course"]${courseProjection}`);
    return (docs || []).map(toCourse);
  } catch {
    return [];
  }
}

export interface SanityFaq {
  question: string;
  answer: string;
  topic?: string;
  showOnHomepage?: boolean;
  order?: number;
}

export async function fetchSanityFaqs(): Promise<SanityFaq[]> {
  if (!client) return [];
  try {
    const docs = await client.fetch(
      `*[_type == "siteFaq"] | order(order asc){question, answer, topic, showOnHomepage, order}`
    );
    return docs || [];
  } catch {
    return [];
  }
}
