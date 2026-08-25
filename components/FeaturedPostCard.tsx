import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import type { BlogPost } from '@/lib/blog-data';
import { calculateReadTime } from '@/lib/blog-data';
import { getAuthorById } from '@/lib/blog-authors-data';

export default function FeaturedPostCard({ post }: { post: BlogPost }) {
  const author = getAuthorById(post.authorId);
  const readTime = calculateReadTime(post);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="focus-ring group grid overflow-hidden rounded-2xl border border-white/8 bg-ink-900 transition-colors hover:border-signal-blue/50 lg:grid-cols-2"
    >
      <img
        src={`https://picsum.photos/seed/${post.featuredImage}/900/560`}
        alt={post.title}
        loading="lazy"
        className="aspect-[16/9] w-full object-cover lg:aspect-auto lg:h-full"
      />
      <div className="flex flex-col justify-center p-8 lg:p-10">
        <span className="w-fit rounded-full bg-gradient-to-r from-signal-blue to-signal-violet px-3 py-1 text-[11px] font-semibold">
          Featured
        </span>
        <p className="mt-4 text-xs font-medium uppercase tracking-wide text-signal-cyan">{post.category}</p>
        <h2 className="mt-2 font-display text-2xl font-bold leading-snug lg:text-3xl">{post.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-mist">{post.excerpt}</p>
        <div className="mt-6 flex items-center gap-4 text-xs text-mist">
          <span>{author.name}</span>
          <span>{post.publishedDate}</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {readTime} min read</span>
        </div>
        <span className="mt-6 flex w-fit items-center gap-1.5 text-sm font-semibold text-signal-cyan">
          Read Full Article <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
