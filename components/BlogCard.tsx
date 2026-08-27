import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import type { BlogPost } from '@/lib/blog-data';
import { calculateReadTime } from '@/lib/blog-data';
import { getAuthorById } from '@/lib/blog-authors-data';

export default function BlogCard({ post }: { post: BlogPost }) {
  const author = getAuthorById(post.authorId);
  const readTime = calculateReadTime(post);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="focus-ring group flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-ink-900 transition-all duration-150 hover:border-signal-blue/50 hover:-translate-y-1"
    >
      <img
        src={`https://picsum.photos/seed/${post.featuredImage}/600/340`}
        alt={post.title}
        loading="lazy"
        className="aspect-[16/9] w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-signal-cyan">{post.category}</p>
        <h3 className="mt-2 font-display text-base font-semibold leading-snug">{post.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-mist">{post.excerpt}</p>
        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4 text-xs text-mist">
          <span>{author.name} • {post.publishedDate}</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {readTime} min</span>
        </div>
        <span className="mt-3 flex items-center gap-1 text-xs font-semibold text-signal-cyan opacity-0 transition-opacity group-hover:opacity-100">
          Read More <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
