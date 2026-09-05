import { buildMetadata } from '@/lib/seo';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { galleryCategories } from '@/lib/gallery-data';
import { siteConfig } from '@/lib/site-config';
import RevealSection from '@/components/RevealSection';
import GalleryLightbox from '@/components/GalleryLightbox';
import CTASection from '@/components/CTASection';

export const metadata = buildMetadata({
  title: 'Gallery — Classes, Workshops & Events',
  description: 'A look inside DigitalAI Learning Institute — online classes, in-person training sessions, workshops, certifications, student activities and our Noida learning centre.',
  path: '/gallery',
});

export default function GalleryPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.brand.domain },
      { '@type': 'ListItem', position: 2, name: 'Gallery', item: `${siteConfig.brand.domain}/gallery` },
    ],
  };

  const imageGallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'DigitalAI Learning Institute Gallery',
    description: 'Photos from online classes, training sessions, workshops, certifications, student activities and events.',
  };

  return (
    <div className="pb-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallerySchema) }} />

      <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-5 pt-6 lg:px-8">
        <ol className="flex items-center gap-1.5 text-xs text-mist">
          <li><Link href="/" className="focus-ring hover:text-paper">Home</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li className="text-paper">Gallery</li>
        </ol>
      </nav>

      <RevealSection className="mx-auto max-w-3xl px-5 py-10 text-center lg:px-8">
        <h1 className="font-display text-4xl font-extrabold lg:text-5xl">Gallery</h1>
        <p className="mt-4 text-mist leading-relaxed">
          A look inside DigitalAI Learning Institute — from live online classes to hands-on training
          at our Noida centre.
        </p>
        <p className="mt-3 text-xs text-mist/60">
          Photos below are placeholders and will be replaced with real photos from our classes and events.
        </p>
      </RevealSection>

      <GalleryLightbox categories={galleryCategories} />

      <CTASection
        headline="Want to Experience It Yourself?"
        text="Explore our courses or book a free counselling session to visit our Noida centre or join a live online class."
        primaryLabel="Explore Courses"
        primaryHref="/courses"
        secondaryLabel="Book Free Counselling"
        secondaryHref="/contact#counselling"
      />
    </div>
  );
}
