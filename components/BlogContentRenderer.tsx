import Link from 'next/link';
import type { ContentBlock } from '@/lib/blog-data';

export default function BlogContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-5 text-sm leading-relaxed text-mist sm:text-base">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2 key={i} id={block.id} className="scroll-mt-28 pt-4 font-display text-2xl font-bold text-paper">
                {block.text}
              </h2>
            );
          case 'h3':
            return (
              <h3 key={i} id={block.id} className="scroll-mt-28 pt-2 font-display text-lg font-semibold text-paper">
                {block.text}
              </h3>
            );
          case 'p':
            return <p key={i}>{block.text}</p>;
          case 'ul':
            return (
              <ul key={i} className="list-disc space-y-1.5 pl-5">
                {block.items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} className="list-decimal space-y-1.5 pl-5">
                {block.items.map((item, j) => <li key={j}>{item}</li>)}
              </ol>
            );
          case 'quote':
            return (
              <blockquote key={i} className="border-l-2 border-signal-cyan bg-ink-900 py-3 pl-5 pr-4 italic text-paper">
                {block.text}
              </blockquote>
            );
          case 'code':
            return (
              <pre key={i} className="overflow-x-auto rounded-xl border border-white/8 bg-ink-950 p-4 font-mono text-xs text-signal-cyan">
                <code>{block.text}</code>
              </pre>
            );
          case 'links':
            return (
              <div key={i} className="rounded-xl border border-white/8 bg-ink-900 p-5">
                {block.intro && <p className="mb-3 text-sm font-semibold text-paper">{block.intro}</p>}
                <ul className="space-y-2">
                  {block.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="focus-ring text-sm font-medium text-signal-cyan hover:underline">
                        {item.label} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
