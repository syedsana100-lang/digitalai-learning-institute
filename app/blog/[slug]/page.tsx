import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Clock, Calendar } from 'lucide-react';
import {
  getAllPosts, getPostBySlug, getRelatedPosts, getLatestPosts, getPopularPosts,
  calculateReadTime, getTableOfContents,
} from '@/lib/blog-data';
import { getAuthorById } from '@/lib/blog-authors-data';
import { siteConfig } from '@/lib/site-config';
import BlogCard from '@/components/BlogCard';
import BlogContentRenderer from '@/components/BlogContentRenderer';
import TableOfContents from '@/components/TableOfContents';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import ShareButtons from '@/components/ShareButtons';
import AuthorBox from '@/components/AuthorBox';
import CommentsSection from '@/components/CommentsSection';
import FAQAccordion from '@/components/FAQAccordion';
import CTASection from '@/components/CTASection';
import RevealSection from '@/components/RevealSection';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const url = `${siteConfig.brand.domain}/blog/${post.slug}`;
  const ogImage = post.seo.ogImage || `https://picsum.photos/seed/${post.featuredImage}/1200/630`;
  return {
    title: post.seo.title,
    description: post.seo.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      type: 'article',
      url,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      publishedTime: post.publishedISO,
      modifiedTime: post.updatedISO || post.publishedISO,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.title,
      description: post.seo.description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const author = getAuthorById(post.authorId);
  const related = getRelatedPosts(post, 6);
  const latest = getLatestPosts(post.slug, 3);
  const popular = getPopularPosts(post.slug, 3);
  const toc = getTableOfContents(post);
  const readTime = calculateReadTime(post);
  const url = `${siteConfig.brand.domain}/blog/${post.slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seo.description,
    image: `https://picsum.photos/seed/${post.featuredImage}/1200/630`,
    author: { '@type': 'Organization', name: author.name },
    publisher: { '@type': 'Organization', name: siteConfig.brand.name, url: siteConfig.brand.domain },
    datePublished: post.publishedISO,
    dateModified: post.updatedISO || post.publishedISO,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.brand.domain },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.brand.domain}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };

  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null;

  return (
    <div className="pb-20">
      <ReadingProgressBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-5 pt-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-mist">
          <li><Link href="/" className="focus-ring hover:text-paper">Home</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li><Link href="/blog" className="focus-ring hover:text-paper">Blog</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li className="text-paper">{post.title}</li>
        </ol>
      </nav>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-8 lg:grid-cols-[1fr,260px] lg:px-8">
        <article>
          <RevealSection>
            <p className="text-xs font-medium uppercase tracking-wide text-signal-cyan">{post.category}</p>
            <h1 className="mt-2 font-display text-3xl font-extrabold lg:text-4xl">{post.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-mist">
              <span>By {author.name}</span>
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {post.publishedDate}{post.updatedISO ? ` (Updated)` : ''}</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {readTime} min read</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <Link key={t} href={`/blog/tag/${encodeURIComponent(t.toLowerCase())}`} className="focus-ring rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-mist hover:text-paper">
                    #{t}
                  </Link>
                ))}
              </div>
              <ShareButtons url={url} title={post.title} />
            </div>
          </RevealSection>

          <img
            src={`https://picsum.photos/seed/${post.featuredImage}/900/500`}
            alt={post.title}
            loading="lazy"
            className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover"
          />

          {/* Mobile TOC */}
          {toc.length > 0 && (
            <div className="mt-8 lg:hidden">
              <TableOfContents items={toc} />
            </div>
          )}

          <RevealSection className="mt-10">
            <BlogContentRenderer blocks={post.content} />
          </RevealSection>

          {post.faqs && post.faqs.length > 0 && (
            <RevealSection className="mt-14">
              <h2 className="mb-5 font-display text-xl font-bold">FAQs</h2>
              <FAQAccordion items={post.faqs} />
            </RevealSection>
          )}

          <RevealSection className="mt-14">
            <AuthorBox author={author} />
          </RevealSection>

          {related.length > 0 && (
            <RevealSection className="mt-14">
              <h2 className="mb-5 font-display text-xl font-bold">Related Articles</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => <BlogCard key={p.slug} post={p} />)}
              </div>
            </RevealSection>
          )}

          {popular.length > 0 && (
            <RevealSection className="mt-14">
              <h2 className="mb-5 font-display text-xl font-bold">Popular Blogs</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {popular.map((p) => <BlogCard key={p.slug} post={p} />)}
              </div>
            </RevealSection>
          )}

          {latest.length > 0 && (
            <RevealSection className="mt-14">
              <h2 className="mb-5 font-display text-xl font-bold">Latest Articles</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {latest.map((p) => <BlogCard key={p.slug} post={p} />)}
              </div>
            </RevealSection>
          )}

          <RevealSection className="mt-14 border-t border-white/8 pt-10">
            <CommentsSection />
          </RevealSection>
        </article>

        {/* Desktop sticky TOC */}
        {toc.length > 0 && (
          <aside className="hidden lg:block">
            <TableOfContents items={toc} />
          </aside>
        )}
      </div>

      <CTASection
        headline="Ready to Build These Skills?"
        text="Explore our online courses and turn what you just read about into practical, career-ready skills."
      />
    </div>
  );
}
