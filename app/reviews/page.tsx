import { buildMetadata } from '@/lib/seo';
import RevealSection from '@/components/RevealSection';
import TestimonialCarousel from '@/components/TestimonialCarousel';

export const metadata = buildMetadata({
  title: 'Student Reviews',
  description: 'Read what students say about learning with DigitalAI Learning Institute.',
  path: '/reviews',
});

// PLACEHOLDER TESTIMONIALS — clearly marked for replacement with real, consented
// student reviews before publishing. Do not publish these as real reviews.
const testimonials = [
  { name: '[Student Name]', city: '[City]', course: 'Data Science', rating: 5, quote: 'Placeholder testimonial — replace with a real, consented student review before publishing.' },
  { name: '[Student Name]', city: '[City]', course: 'Full Stack Development', rating: 5, quote: 'Placeholder testimonial — replace with a real, consented student review before publishing.' },
  { name: '[Student Name]', city: '[City]', course: 'Digital Marketing', rating: 4, quote: 'Placeholder testimonial — replace with a real, consented student review before publishing.' },
];

export default function ReviewsPage() {
  return (
    <div className="pt-16 pb-20">
      <RevealSection className="mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h1 className="font-display text-4xl font-extrabold lg:text-5xl">Student Reviews</h1>
        <p className="mt-4 text-mist leading-relaxed">
          The testimonials below are placeholders. Replace them with real, consented reviews from
          your students before publishing.
        </p>
      </RevealSection>
      <section className="px-5 py-14 lg:px-8">
        <TestimonialCarousel items={testimonials} />
      </section>
    </div>
  );
}
