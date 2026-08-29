import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Clock, ChevronRight } from 'lucide-react';
import { getFeaturedPost, getPopularPosts, getTrendingPosts, getLatestPosts, calculateReadTime, getCategoriesInUse, categoryToSlug, getFeaturedImageUrl } from '@/lib/blog-data';
import { getMergedBlogPosts, getMergedBlogAuthors } from '@/sanity/lib/content';
import { siteConfig } from '@/lib/site-config';
import BlogCard from '@/components/BlogCard';
import FeaturedPostCard from '@/components/FeaturedPostCard';
import BlogSearchAndFilter from '@/components/BlogSearchAndFilter';
import RevealSection from '@/components/RevealSection';

export const metadata: Metadata = {
  title: 'Blog — AI, Data Science, Development & Digital Marketing Articles',
  description: 'Practical, in-depth articles on AI, Data Science, Programming, Web Development, Digital Marketing, Cloud, Cyber Security and career growth from DigitalAI Learning Institute.',
  alternates: { canonical: '/blog' },
  openGraph: { title: 'DigitalAI Learning Blog', description: 'Practical articles on AI, data, development, digital marketing and career growth.', type: 'website' },
};

export default async function BlogPage() {
  const [posts, authors] = await Promise.all([getMergedBlogPosts(), getMergedBlogAuthors()]);
  const featured = getFeaturedPost(posts);
  const trending = getTrendingPosts(featured.slug, 3, posts);
  const popular = getPopularPosts(featured.slug, 3, posts);
  const latest = getLatestPosts(featured.slug, 3, posts);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.brand.domain },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.brand.domain}/blog` },
    ],
  };

  return (
    <div className="pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-5 pt-6 lg:px-8">
        <ol className="flex items-center gap-1.5 text-xs text-mist">
          <li><Link href="/" className="focus-ring hover:text-paper">Home</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li className="text-paper">Blog</li>
        </ol>
      </nav>

      <RevealSection className="mx-auto max-w-3xl px-5 pb-10 pt-6 text-center lg:px-8">
        <h1 className="font-display text-4xl font-extrabold lg:text-5xl">Blog</h1>
        <p className="mt-4 text-mist leading-relaxed">
          Practical articles on AI, data, programming, development, digital marketing and career growth.
        </p>
      </RevealSection>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-5 pb-14 lg:px-8">
        <RevealSection>
          <FeaturedPostCard post={featured} />
        </RevealSection>
      </section>

      {/* Trending */}
      {trending.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-14 lg:px-8">
          <RevealSection className="mb-6">
            <h2 className="font-display text-2xl font-bold">Trending Articles</h2>
          </RevealSection>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trending.map((post, i) => (
              <RevealSection key={post.slug} delay={i * 0.06}><BlogCard post={post} /></RevealSection>
            ))}
          </div>
        </section>
      )}

      {/* Popular */}
      {popular.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-14 lg:px-8">
          <RevealSection className="mb-6">
            <h2 className="font-display text-2xl font-bold">Popular Blogs</h2>
          </RevealSection>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((post, i) => (
              <RevealSection key={post.slug} delay={i * 0.06}><BlogCard post={post} /></RevealSection>
            ))}
          </div>
        </section>
      )}

      {/* Latest */}
      {latest.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-6 lg:px-8">
          <RevealSection className="mb-6">
            <h2 className="font-display text-2xl font-bold">Latest Blogs</h2>
          </RevealSection>
          <div className="divide-y divide-white/8 rounded-2xl border border-white/8 bg-ink-900">
            {latest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="focus-ring group flex items-center gap-4 p-5 transition-colors hover:bg-white/[0.02]"
              >
                <img
                  src={getFeaturedImageUrl(post, 120, 90)}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-16 w-20 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-signal-cyan">{post.category}</p>
                  <p className="mt-1 truncate font-display text-sm font-semibold sm:text-base">{post.title}</p>
                  <p className="mt-0.5 flex items-center gap-2 text-xs text-mist">
                    {post.publishedDate} <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {calculateReadTime(post)} min</span>
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-mist transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Full searchable/filterable archive with pagination */}
      <BlogSearchAndFilter posts={posts} authors={authors} />

      {/* Crawlable category links — real <a> tags so category pages are discoverable
          by search engine crawlers and tools like Screaming Frog, independent of the
          client-side filter UI above. */}
      <section className="mx-auto max-w-6xl px-5 pb-14 lg:px-8">
        <RevealSection>
          <h2 className="mb-4 font-display text-lg font-semibold">Browse by Category</h2>
          <div className="flex flex-wrap gap-2">
            {getCategoriesInUse(posts).map((c) => (
              <Link
                key={c}
                href={`/blog/category/${categoryToSlug(c)}`}
                className="focus-ring rounded-full border border-white/10 px-4 py-2 text-xs text-mist transition-colors hover:text-paper"
              >
                {c}
              </Link>
            ))}
          </div>
        </RevealSection>
      </section>
    </div>
  );
}
