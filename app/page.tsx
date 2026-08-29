import { buildMetadata } from '@/lib/seo';
import Hero from '@/components/Hero';
import StatsSection from '@/components/StatsSection';
import WhyDigitalAI from '@/components/WhyDigitalAI';
import CategoryGrid from '@/components/CategoryGrid';
import CourseGrid from '@/components/CourseGrid';
import PricingPreview from '@/components/PricingPreview';
import PlacementPartners from '@/components/PlacementPartners';
import StudentSuccessStories from '@/components/StudentSuccessStories';
import AnywhereInIndia from '@/components/AnywhereInIndia';
import LearningJourney from '@/components/LearningJourney';
import SkillStack from '@/components/SkillStack';
import ReviewsSection from '@/components/ReviewsSection';
import HomepageFAQSection from '@/components/HomepageFAQSection';
import CTASection from '@/components/CTASection';
import { siteConfig } from '@/lib/site-config';
import { fetchSanityHomepage, fetchSanityTestimonials } from '@/sanity/lib/queries';

export const metadata = {
  ...buildMetadata({
    title: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
    description:
      'Build practical technology and digital skills through structured online and offline learning, projects, mentorship and career-focused guidance — from anywhere in India.',
    path: '',
  }),
  title: { absolute: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}` },
};

export default async function HomePage() {
  // Sanity Homepage/Testimonials content, when published, overrides the
  // hardcoded defaults in each section below. `null`/`[]` (Sanity not
  // configured, no document yet, or a fetch failure) means every section
  // renders exactly as it did before this was wired up.
  const [homepage, testimonials] = await Promise.all([fetchSanityHomepage(), fetchSanityTestimonials()]);

  return (
    <>
      <Hero homepage={homepage} />
      <StatsSection stats={homepage?.stats} />
      <WhyDigitalAI features={homepage?.whyChooseUs} />
      <CategoryGrid />
      <CourseGrid />
      <PricingPreview />
      <PlacementPartners />
      <StudentSuccessStories />
      <AnywhereInIndia />
      <LearningJourney />
      <SkillStack />
      <ReviewsSection testimonials={testimonials} />
      <HomepageFAQSection />
      <CTASection
        headline={homepage?.ctaHeading || 'Still Confused About Your Career?'}
        text={
          homepage?.ctaDescription ||
          'Free career guidance, course recommendation and placement consultation — talk to a learning counsellor today.'
        }
        primaryLabel="Chat on WhatsApp"
        primaryHref="https://wa.me/919310378799"
        secondaryLabel={homepage?.ctaButtonText || 'Book Free Counselling'}
        secondaryHref={homepage?.ctaButtonLink || '/contact#counselling'}
        showCallNow
      />
    </>
  );
}
