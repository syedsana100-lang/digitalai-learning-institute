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
import CTASection from '@/components/CTASection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <WhyDigitalAI />
      <CategoryGrid />
      <CourseGrid />
      <PricingPreview />
      <PlacementPartners />
      <StudentSuccessStories />
      <AnywhereInIndia />
      <LearningJourney />
      <SkillStack />
      <ReviewsSection />
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
