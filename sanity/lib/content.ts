import { blogPosts as staticBlogPosts, type BlogPost } from '@/lib/blog-data';
import { blogAuthors as staticBlogAuthors, type BlogAuthor } from '@/lib/blog-authors-data';
import { courses as staticCourses, type Course } from '@/lib/courses-data';
import { fetchSanityBlogPosts, fetchSanityBlogAuthors, fetchSanityCourses, fetchSanityFaqs, type SanityFaq } from './queries';

/**
 * Content resolution layer: fetches from Sanity (when configured) and merges
 * it with the existing static arrays in lib/. A Sanity document with the
 * same slug as a static entry takes priority (lets you migrate a post/course
 * from code into the CMS by re-creating it there with the same slug).
 * When Sanity isn't configured, or a fetch fails, these resolve to exactly
 * the static arrays — the site's current behavior is unchanged.
 */

export async function getMergedBlogPosts(): Promise<BlogPost[]> {
  const cmsPosts = await fetchSanityBlogPosts();
  const cmsSlugs = new Set(cmsPosts.map((p) => p.slug));
  return [...cmsPosts, ...staticBlogPosts.filter((p) => !cmsSlugs.has(p.slug))];
}

export async function getMergedBlogAuthors(): Promise<BlogAuthor[]> {
  const cmsAuthors = await fetchSanityBlogAuthors();
  const cmsIds = new Set(cmsAuthors.map((a) => a.id));
  return [...cmsAuthors, ...staticBlogAuthors.filter((a) => !cmsIds.has(a.id))];
}

export async function getMergedCourses(): Promise<Course[]> {
  const cmsCourses = await fetchSanityCourses();
  const cmsSlugs = new Set(cmsCourses.map((c) => c.slug));
  return [...cmsCourses, ...staticCourses.filter((c) => !cmsSlugs.has(c.slug))];
}

export interface ResolvedFaq {
  question: string;
  answer: string;
}

/** All FAQs for the /faq page — CMS FAQs first, then static ones not already covered by a CMS question. */
export async function getMergedFaqs(staticFaqs: ResolvedFaq[]): Promise<ResolvedFaq[]> {
  const cmsFaqs = await fetchSanityFaqs();
  if (cmsFaqs.length === 0) return staticFaqs;
  const cmsQuestions = new Set(cmsFaqs.map((f) => f.question.trim().toLowerCase()));
  const remainingStatic = staticFaqs.filter((f) => !cmsQuestions.has(f.question.trim().toLowerCase()));
  return [...cmsFaqs.map((f) => ({ question: f.question, answer: f.answer })), ...remainingStatic];
}

/** Homepage FAQ widget — CMS FAQs marked "Show on Homepage", falling back to a curated static subset. */
export async function getHomepageFaqs(fallback: ResolvedFaq[]): Promise<ResolvedFaq[]> {
  const cmsFaqs = await fetchSanityFaqs();
  const homepageCms = cmsFaqs.filter((f: SanityFaq) => f.showOnHomepage);
  return homepageCms.length > 0 ? homepageCms.map((f) => ({ question: f.question, answer: f.answer })) : fallback;
}
