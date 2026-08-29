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
    whyLearn: String(doc.whyLearn || ''),
careerOpportunities: (doc.careerOpportunities as string[]) || [],
industryDemand: String(doc.industryDemand || ''),
careerRoadmap: (doc.careerRoadmap as string[]) || [],
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

// ---- Site Settings, Homepage, Testimonials --------------------------------
// These power the global header/footer and the homepage sections. Every field
// is optional — a `null` return (or an individual empty field) means the
// caller keeps using the existing hardcoded copy in components/lib, so an
// empty or partially-filled Sanity document never breaks the site.

export interface SanitySiteSettings {
  siteName?: string;
  logoUrl?: string;
  footerLogoUrl?: string;
  email?: string;
  secondaryEmail?: string;
  phone?: string;
  whatsappNumber?: string;
  address?: string;
  businessHours?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  twitter?: string;
  navLinks?: { label: string; href: string; order?: number }[];
  headerCtaText?: string;
  headerCtaLink?: string;
  footerDescription?: string;
  footerQuickLinks?: { label: string; href: string }[];
  copyrightText?: string;
}

export async function fetchSanitySiteSettings(): Promise<SanitySiteSettings | null> {
  if (!client) return null;
  try {
    const doc = await client.fetch(
      `*[_type == "siteSettings"][0]{
        siteName, logo, footerLogo, email, secondaryEmail, phone, whatsappNumber, address, businessHours,
        facebook, instagram, linkedin, youtube, twitter,
        navLinks[] | order(order asc){label, href, order},
        headerCtaText, headerCtaLink,
        footerDescription, footerQuickLinks[]{label, href}, copyrightText
      }`
    );
    if (!doc) return null;
    const logo = urlFor(doc.logo as never);
    const footerLogo = urlFor(doc.footerLogo as never);
    return {
      siteName: doc.siteName || undefined,
      logoUrl: logo ? logo.width(160).url() : undefined,
      footerLogoUrl: footerLogo ? footerLogo.width(160).url() : undefined,
      email: doc.email || undefined,
      secondaryEmail: doc.secondaryEmail || undefined,
      phone: doc.phone || undefined,
      whatsappNumber: doc.whatsappNumber || undefined,
      address: doc.address || undefined,
      businessHours: doc.businessHours || undefined,
      facebook: doc.facebook || undefined,
      instagram: doc.instagram || undefined,
      linkedin: doc.linkedin || undefined,
      youtube: doc.youtube || undefined,
      twitter: doc.twitter || undefined,
      navLinks: (doc.navLinks as SanitySiteSettings['navLinks']) || undefined,
      headerCtaText: doc.headerCtaText || undefined,
      headerCtaLink: doc.headerCtaLink || undefined,
      footerDescription: doc.footerDescription || undefined,
      footerQuickLinks: (doc.footerQuickLinks as SanitySiteSettings['footerQuickLinks']) || undefined,
      copyrightText: doc.copyrightText || undefined,
    };
  } catch {
    return null;
  }
}

export interface SanityHomepage {
  heroHeading?: string;
  heroHighlight?: string;
  heroDescription?: string;
  heroPrimaryCtaText?: string;
  heroPrimaryCtaLink?: string;
  heroSecondaryCtaText?: string;
  heroSecondaryCtaLink?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  stats?: { value: string; label: string }[];
  aboutTitle?: string;
  aboutDescription?: string;
  aboutImageUrl?: string;
  aboutImageAlt?: string;
  aboutCtaText?: string;
  aboutCtaLink?: string;
  whyChooseUs?: { iconUrl?: string; title: string; description: string }[];
  coursesSectionTitle?: string;
  coursesSectionDescription?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
}

export async function fetchSanityHomepage(): Promise<SanityHomepage | null> {
  if (!client) return null;
  try {
    const doc = await client.fetch(
      `*[_type == "homepage"][0]{
        heroHeading, heroHighlight, heroDescription,
        heroPrimaryCtaText, heroPrimaryCtaLink, heroSecondaryCtaText, heroSecondaryCtaLink,
        heroImage, heroImageAlt,
        stats,
        aboutTitle, aboutDescription, aboutImage, aboutImageAlt, aboutCtaText, aboutCtaLink,
        whyChooseUs,
        coursesSectionTitle, coursesSectionDescription,
        ctaHeading, ctaDescription, ctaButtonText, ctaButtonLink
      }`
    );
    if (!doc) return null;
    const heroImage = urlFor(doc.heroImage as never);
    const aboutImage = urlFor(doc.aboutImage as never);
    return {
      heroHeading: doc.heroHeading || undefined,
      heroHighlight: doc.heroHighlight || undefined,
      heroDescription: doc.heroDescription || undefined,
      heroPrimaryCtaText: doc.heroPrimaryCtaText || undefined,
      heroPrimaryCtaLink: doc.heroPrimaryCtaLink || undefined,
      heroSecondaryCtaText: doc.heroSecondaryCtaText || undefined,
      heroSecondaryCtaLink: doc.heroSecondaryCtaLink || undefined,
      heroImageUrl: heroImage ? heroImage.width(1200).url() : undefined,
      heroImageAlt: doc.heroImageAlt || undefined,
      stats: Array.isArray(doc.stats) && doc.stats.length > 0 ? doc.stats : undefined,
      aboutTitle: doc.aboutTitle || undefined,
      aboutDescription: doc.aboutDescription || undefined,
      aboutImageUrl: aboutImage ? aboutImage.width(1000).url() : undefined,
      aboutImageAlt: doc.aboutImageAlt || undefined,
      aboutCtaText: doc.aboutCtaText || undefined,
      aboutCtaLink: doc.aboutCtaLink || undefined,
      whyChooseUs:
        Array.isArray(doc.whyChooseUs) && doc.whyChooseUs.length > 0
          ? doc.whyChooseUs.map((f: Record<string, unknown>) => {
              const icon = urlFor(f.icon as never);
              return {
                iconUrl: icon ? icon.width(64).height(64).url() : undefined,
                title: String(f.title || ''),
                description: String(f.description || ''),
              };
            })
          : undefined,
      coursesSectionTitle: doc.coursesSectionTitle || undefined,
      coursesSectionDescription: doc.coursesSectionDescription || undefined,
      ctaHeading: doc.ctaHeading || undefined,
      ctaDescription: doc.ctaDescription || undefined,
      ctaButtonText: doc.ctaButtonText || undefined,
      ctaButtonLink: doc.ctaButtonLink || undefined,
    };
  } catch {
    return null;
  }
}

export interface SanityTestimonial {
  name: string;
  photoUrl?: string;
  course?: string;
  designation?: string;
  review: string;
  rating: number;
}

export async function fetchSanityTestimonials(): Promise<SanityTestimonial[]> {
  if (!client) return [];
  try {
    const docs = await client.fetch(
      `*[_type == "testimonial" && published != false] | order(order asc){
        studentName, studentPhoto, course, designation, review, rating
      }`
    );
    return (docs || []).map((doc: Record<string, unknown>) => {
      const photo = urlFor(doc.studentPhoto as never);
      return {
        name: String(doc.studentName || ''),
        photoUrl: photo ? photo.width(96).height(96).url() : undefined,
        course: (doc.course as string) || undefined,
        designation: (doc.designation as string) || undefined,
        review: String(doc.review || ''),
        rating: Number(doc.rating) || 5,
      };
    });
  } catch {
    return [];
  }
}
