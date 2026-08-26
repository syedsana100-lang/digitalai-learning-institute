import { Linkedin, Twitter } from 'lucide-react';
import type { BlogAuthor } from '@/lib/blog-authors-data';
import { getAllPosts } from '@/lib/blog-data';

export default function AuthorBox({ author }: { author: BlogAuthor }) {
  const articleCount = getAllPosts().filter((p) => p.authorId === author.id).length;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-ink-900 p-6 sm:flex-row sm:items-start">
      <img
        src={author.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${author.avatarSeed}`}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="h-16 w-16 shrink-0 rounded-full bg-white/5 object-cover"
      />
      <div>
        <p className="font-display text-sm font-semibold">{author.name}</p>
        <p className="text-xs text-mist">{author.designation} • {articleCount} article{articleCount === 1 ? '' : 's'}</p>
        <p className="mt-2 text-sm leading-relaxed text-mist">{author.bio}</p>
        {author.social && (
          <div className="mt-3 flex gap-2">
            {author.social.linkedin && (
              <a href={author.social.linkedin} aria-label="LinkedIn" className="focus-ring text-mist hover:text-signal-cyan"><Linkedin className="h-4 w-4" /></a>
            )}
            {author.social.twitter && (
              <a href={author.social.twitter} aria-label="Twitter" className="focus-ring text-mist hover:text-signal-cyan"><Twitter className="h-4 w-4" /></a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
