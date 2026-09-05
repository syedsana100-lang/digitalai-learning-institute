import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';

// Next.js automatically serves this with a real 404 HTTP status code (not a
// "soft 404" that returns 200) — that status code is what tells Google not
// to index dead URLs, so nothing extra is needed here for that part.
export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-5 text-center">
      <p className="font-display text-7xl font-extrabold text-gradient">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold">Page Not Found</h1>
      <p className="mt-3 text-mist">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="focus-ring flex items-center gap-2 rounded-full bg-gradient-to-r from-signal-blue to-signal-violet px-6 py-3 text-sm font-semibold shadow-glow transition-transform hover:scale-[1.03] active:scale-95"
        >
          Back to Home <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/courses"
          className="focus-ring rounded-full border border-white/15 px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/5"
        >
          Browse Courses
        </Link>
      </div>
    </div>
  );
}
