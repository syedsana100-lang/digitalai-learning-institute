import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getAllTags, getPostsByTag } from '@/lib/blog-data';
import { getMergedBlogPosts } from '@/sanity/lib/content';
import { siteConfig } from '@/lib/site-config';
import BlogCard from '@/components/BlogCard';
import RevealSection from '@/components/RevealSection';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = await getMergedBlogPosts();
  return getAllTags(posts).map((t) => ({ tag: t.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `#${decoded} Articles`,
    description: `Browse all DigitalAI Learning blog articles tagged ${decoded}.`,
    alternates: { canonical: `/blog/tag/${tag}` },
  };
}

export default async function BlogTagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = await getMergedBlogPosts();
  const allTags = getAllTags(posts);
  const realTag = allTags.find((t) => t.toLowerCase() === decoded.toLowerCase());
  if (!realTag) notFound();

  const taggedPosts = getPostsByTag(realTag, posts);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.brand.domain },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.brand.domain}/blog` },
      { '@type': 'ListItem', position: 3, name: `#${realTag}`, item: `${siteConfig.brand.domain}/blog/tag/${tag}` },
    ],
  };

  return (
    <div className="pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-5 pt-6 lg:px-8">
        <ol className="flex items-center gap-1.5 text-xs text-mist">
          <li><Link href="/" className="focus-ring hover:text-paper">Home</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li><Link href="/blog" className="focus-ring hover:text-paper">Blog</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li className="text-paper">#{realTag}</li>
        </ol>
      </nav>

      <RevealSection className="mx-auto max-w-3xl px-5 py-10 text-center lg:px-8">
        <h1 className="font-display text-4xl font-extrabold lg:text-5xl">#{realTag}</h1>
        <p className="mt-4 text-mist">{taggedPosts.length} article{taggedPosts.length === 1 ? '' : 's'} tagged {realTag}.</p>
      </RevealSection>

      <section className="mx-auto max-w-6xl px-5 pb-14 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {taggedPosts.map((post, i) => (
            <RevealSection key={post.slug} delay={i * 0.05}>
              <BlogCard post={post} />
            </RevealSection>
          ))}
        </div>
      </section>
    </div>
  );
}
