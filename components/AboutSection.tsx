import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import RevealSection from '@/components/RevealSection';
import type { SanityHomepage } from '@/sanity/lib/queries';

/**
 * Renders only when the Sanity Homepage document has About Section content
 * (aboutTitle + aboutDescription) published — there's no static fallback
 * copy for this section, so an empty/unpublished document simply means the
 * homepage doesn't show it, exactly as it did before this was added.
 */
export default function AboutSection({ homepage }: { homepage?: SanityHomepage | null }) {
  if (!homepage?.aboutTitle || !homepage?.aboutDescription) return null;

  return (
    <section className="section-light py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {homepage.aboutImageUrl && (
          <RevealSection>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
              <Image
                src={homepage.aboutImageUrl}
                alt={homepage.aboutImageAlt || homepage.aboutTitle}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 560px, 100vw"
              />
            </div>
          </RevealSection>
        )}
        <RevealSection delay={0.1} className={homepage.aboutImageUrl ? '' : 'lg:col-span-2 mx-auto max-w-2xl text-center'}>
          <h2 className="font-display text-3xl font-extrabold lg:text-4xl">{homepage.aboutTitle}</h2>
          <p className="mt-4 text-mist leading-relaxed">{homepage.aboutDescription}</p>
          {homepage.aboutCtaText && (
            <Link
              href={homepage.aboutCtaLink || '/about'}
              className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-signal-blue to-signal-violet px-6 py-3 text-sm font-semibold shadow-glow transition-transform duration-150 hover:scale-[1.03] active:scale-95"
            >
              {homepage.aboutCtaText} <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </RevealSection>
      </div>
    </section>
  );
}
