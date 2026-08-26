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
import HomeFAQSection from '@/components/HomeFAQSection';
import CTASection from '@/components/CTASection';
import { getMergedCourses, getHomepageFaqs } from '@/sanity/lib/content';
import { homepageFaqFallback } from '@/lib/faq-data';

export default async function HomePage() {
  const [courses, homeFaqs] = await Promise.all([
    getMergedCourses(),
    getHomepageFaqs(homepageFaqFallback),
  ]);

  return (
    <>
      <Hero />
      <StatsSection />
      <WhyDigitalAI />
      <CategoryGrid />
      <CourseGrid courses={courses} />
      <PricingPreview />
      <PlacementPartners />
      <StudentSuccessStories />
      <AnywhereInIndia />
      <LearningJourney />
      <SkillStack />
      <ReviewsSection />
      <HomeFAQSection faqs={homeFaqs} />
      <CTASection
        headline="Still Confused About Your Career?"
        text="Free career guidance, course recommendation and placement consultation — talk to a learning counsellor today."
        primaryLabel="Chat on WhatsApp"
        primaryHref="https://wa.me/919310378799"
        secondaryLabel="Book Free Counselling"
        secondaryHref="/contact#counselling"
        showCallNow
      />
    </>
  );
}
