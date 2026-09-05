'use client';

import { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import RevealSection from '@/components/RevealSection';
import type { GalleryCategory } from '@/lib/gallery-data';

export default function GalleryLightbox({ categories }: { categories: GalleryCategory[] }) {
  const [open, setOpen] = useState<{ catIndex: number; imgIndex: number } | null>(null);

  const close = useCallback(() => setOpen(null), []);

  const step = useCallback(
    (direction: 1 | -1) => {
      setOpen((current) => {
        if (!current) return current;
        const images = categories[current.catIndex].images;
        const nextIndex = (current.imgIndex + direction + images.length) % images.length;
        return { ...current, imgIndex: nextIndex };
      });
    },
    [categories]
  );

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    }
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, close, step]);

  const activeImage = open ? categories[open.catIndex].images[open.imgIndex] : null;

  return (
    <>
      {categories.map((cat, catIndex) => (
        <section key={cat.id} id={cat.id} className={`mx-auto max-w-6xl px-5 py-12 lg:px-8 ${catIndex % 2 === 1 ? 'section-light rounded-3xl' : ''}`}>
          <RevealSection className="mb-6">
            <h2 className="font-display text-2xl font-bold">{cat.label}</h2>
            <p className="mt-1 text-sm text-mist">{cat.description}</p>
          </RevealSection>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cat.images.map((img, imgIndex) => (
              <RevealSection key={img.seed} delay={imgIndex * 0.06}>
                <button
                  type="button"
                  onClick={() => setOpen({ catIndex, imgIndex })}
                  className="focus-ring block w-full"
                  aria-label={`View larger image: ${img.alt}`}
                >
                  <img
                    src={`https://picsum.photos/seed/${img.seed}/500/360`}
                    alt={img.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full cursor-zoom-in rounded-2xl border border-white/8 object-cover transition-transform duration-150 hover:scale-[1.02]"
                  />
                </button>
              </RevealSection>
            ))}
          </div>
        </section>
      ))}

      {activeImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-10"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.alt}
        >
          <button
            onClick={close}
            aria-label="Close"
            className="focus-ring absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label="Previous image"
            className="focus-ring absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:left-4"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <img
            src={`https://picsum.photos/seed/${activeImage.seed}/1400/1000`}
            alt={activeImage.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full rounded-lg object-contain"
          />
          <button
            onClick={(e) => { e.stopPropagation(); step(1); }}
            aria-label="Next image"
            className="focus-ring absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-4"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <p className="absolute bottom-6 left-1/2 max-w-md -translate-x-1/2 text-center text-sm text-white/80">
            {activeImage.alt}
          </p>
        </div>
      )}
    </>
  );
}
