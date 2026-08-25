import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 pt-6 lg:px-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-mist">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {item.href ? (
              <Link href={item.href} className="focus-ring hover:text-paper">{item.label}</Link>
            ) : (
              <span className="text-paper">{item.label}</span>
            )}
            {i < items.length - 1 && <ChevronRight className="h-3 w-3" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
