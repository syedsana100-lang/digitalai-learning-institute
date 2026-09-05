import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

/**
 * Builds a complete, consistent Metadata object (canonical + Open Graph + Twitter Card)
 * for a page. This is the single place that assembles page-level SEO metadata so every
 * page gets the same shape and nothing is missed — per the 2026-08-25 SEO audit which
 * found 14 pages missing canonical tags and 18 pages missing page-specific Open Graph
 * and Twitter Card data (they were silently falling back to the root layout's generic
 * defaults instead of describing the actual page).
 *
 * All URLs are derived from siteConfig.brand.domain — never hardcode a domain in a page.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  type = 'website',
}: {
  title: string;
  description: string;
  path: string; // e.g. '/about', '/courses/data-science' — always starts with '/' (or '' for homepage)
  image?: string;
  type?: 'website' | 'article';
}): Metadata {
  const url = `${siteConfig.brand.domain}${path}`;
  // Falls back to the dynamically-generated app/opengraph-image.tsx rather
  // than a static file — see that file for why (there was never an actual
  // /public/og-image.jpg, so every page's social-share preview was broken).
  const ogImage = image || `${siteConfig.brand.domain}/opengraph-image`;

  return {
    title,
    description,
    alternates: { canonical: path || '/' },
    openGraph: {
      title,
      description,
      url,
      type,
      siteName: siteConfig.brand.name,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}
