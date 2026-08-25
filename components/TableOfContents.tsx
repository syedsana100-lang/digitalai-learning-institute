'use client';

import { useEffect, useState } from 'react';

export interface TocItem {
  type: 'h2' | 'h3';
  text: string;
  id: string;
}

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-100px 0px -70% 0px' }
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl border border-white/8 bg-ink-900 p-5 lg:block">
      <p className="mb-3 font-display text-xs font-semibold uppercase tracking-wide text-mist">On This Page</p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id} className={item.type === 'h3' ? 'pl-3' : ''}>
            <a
              href={`#${item.id}`}
              className={`focus-ring block rounded-md py-1.5 text-xs leading-snug transition-colors ${
                activeId === item.id ? 'font-semibold text-signal-cyan' : 'text-mist hover:text-paper'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
