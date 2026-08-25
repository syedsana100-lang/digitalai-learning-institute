export interface PricingPlan {
  id: string;
  name: string;
  price: string; // e.g. "₹XX,XXX" — placeholder, replace with real pricing
  badge?: string;
  description: string;
  features: string[];
  emiAvailable: boolean;
  highlighted?: boolean;
}

// PLACEHOLDER PRICES — replace ₹XX,XXX with real figures before publishing.
// No fake discounts or fake urgency have been added, per brief.
export const pricingPlans: PricingPlan[] = [
  {
    id: 'foundation',
    name: 'Foundation Plan',
    price: '₹XX,XXX',
    description: 'For beginners starting their journey',
    features: ['Core concepts', 'Live online learning', 'Assignments', 'Doubt support'],
    emiAvailable: true,
  },
  {
    id: 'professional',
    name: 'Professional Plan',
    price: '₹XX,XXX',
    badge: 'Most Popular',
    description: 'Complete, project-driven learning',
    features: ['Complete curriculum', 'Projects', 'Mentorship', 'Certification', 'Career support'],
    emiAvailable: true,
    highlighted: true,
  },
  {
    id: 'career-track',
    name: 'Career Track',
    price: '₹XX,XXX',
    description: 'For focused, career-outcome learning',
    features: [
      'Advanced curriculum',
      'Multiple projects',
      'Portfolio support',
      'Interview preparation',
      'Career guidance',
    ],
    emiAvailable: true,
  },
];

export interface ComparisonRow {
  feature: string;
  foundation: boolean;
  professional: boolean;
  careerTrack: boolean;
}

export const comparisonRows: ComparisonRow[] = [
  { feature: 'Live Classes', foundation: true, professional: true, careerTrack: true },
  { feature: 'Recorded Content', foundation: true, professional: true, careerTrack: true },
  { feature: 'Assignments', foundation: true, professional: true, careerTrack: true },
  { feature: 'Projects', foundation: false, professional: true, careerTrack: true },
  { feature: 'Mentorship', foundation: false, professional: true, careerTrack: true },
  { feature: 'Doubt Support', foundation: true, professional: true, careerTrack: true },
  { feature: 'Certification', foundation: false, professional: true, careerTrack: true },
  { feature: 'Resume Support', foundation: false, professional: true, careerTrack: true },
  { feature: 'Portfolio Support', foundation: false, professional: false, careerTrack: true },
  { feature: 'Interview Preparation', foundation: false, professional: false, careerTrack: true },
  { feature: 'Career Guidance', foundation: false, professional: true, careerTrack: true },
];
