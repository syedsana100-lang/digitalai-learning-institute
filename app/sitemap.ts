import type { MetadataRoute } from 'next';
import { getAllCourses } from '@/lib/courses-data';
import { getAllPosts, getCategoriesInUse, getAllTags, categoryToSlug } from '@/lib/blog-data';
import { siteConfig } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.brand.domain;

  const staticRoutes = [
    '', '/courses', '/fees', '/career-support', '/about', '/instructors',
    '/reviews', '/faq', '/blog', '/resources', '/contact', '/become-an-instructor', '/gallery', '/payment',
    '/privacy-policy', '/terms-and-conditions', '/refund-policy', '/disclaimer', '/cookie-policy',
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.7,
  }));

  const courseRoutes = getAllCourses().map((c) => ({
    url: `${base}/courses/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const blogRoutes = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.updatedISO || p.publishedISO),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const blogCategoryRoutes = getCategoriesInUse().map((c) => ({
    url: `${base}/blog/category/${categoryToSlug(c)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  const blogTagRoutes = getAllTags().map((t) => ({
    url: `${base}/blog/tag/${t.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.4,
  }));

  return [...staticRoutes, ...courseRoutes, ...blogRoutes, ...blogCategoryRoutes, ...blogTagRoutes];
}
