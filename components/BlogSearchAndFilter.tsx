'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { getAllPosts, getCategoriesInUse, type BlogCategory } from '@/lib/blog-data';
import BlogCard from '@/components/BlogCard';
import RevealSection from '@/components/RevealSection';

const PAGE_SIZE = 6;

export default function BlogSearchAndFilter() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<BlogCategory | 'all'>('all');
  const [visible, setVisible] = useState(PAGE_SIZE);

  const categories = getCategoriesInUse();
  const allPosts = getAllPosts();

  const filtered = useMemo(() => {
    return allPosts.filter((p) => {
      const matchesCategory = category === 'all' || p.category === category;
      const matchesQuery =
        query.trim() === '' ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [allPosts, category, query]);

  return (
    <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
      <RevealSection className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-2xl font-bold">All Articles</h2>
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setVisible(PAGE_SIZE); }}
            placeholder="Search articles..."
            aria-label="Search blog articles"
            className="focus-ring w-full rounded-full border border-white/10 bg-ink-900 py-2.5 pl-10 pr-4 text-sm placeholder:text-mist/50"
          />
        </div>
      </RevealSection>

      <RevealSection delay={0.05} className="mb-10 flex flex-wrap gap-2">
        <button
          onClick={() => { setCategory('all'); setVisible(PAGE_SIZE); }}
          className={`focus-ring rounded-full px-4 py-2 text-xs font-semibold transition-all duration-150 active:scale-95 ${
            category === 'all' ? 'bg-gradient-to-r from-signal-blue to-signal-violet' : 'border border-white/10 text-mist hover:text-paper'
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => { setCategory(c); setVisible(PAGE_SIZE); }}
            className={`focus-ring rounded-full px-4 py-2 text-xs font-semibold transition-all duration-150 active:scale-95 ${
              category === c ? 'bg-gradient-to-r from-signal-blue to-signal-violet' : 'border border-white/10 text-mist hover:text-paper'
            }`}
          >
            {c}
          </button>
        ))}
      </RevealSection>

      {filtered.length === 0 ? (
        <p className="py-10 text-center text-sm text-mist">No articles match your search — try a different keyword or category.</p>
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.slice(0, visible).map((post, i) => (
              <RevealSection key={post.slug} delay={(i % PAGE_SIZE) * 0.05}>
                <BlogCard post={post} />
              </RevealSection>
            ))}
          </div>

          {visible < filtered.length && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="focus-ring rounded-full border border-white/15 px-7 py-3 text-sm font-semibold transition-all duration-150 hover:bg-white/5 active:scale-95"
              >
                Load More Articles
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
