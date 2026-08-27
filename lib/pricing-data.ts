export interface PricingPlan {
  id: string;
  name: string;
  price: string; // 'Contact for Current Fees' until real pricing is finalized — replace once available
  badge?: string;
  description: string;
  features: string[];
  emiAvailable: boolean;
  highlighted?: boolean;
}

// No invented prices — shows 'Contact for Current Fees' until real pricing is finalized.
// No fake discounts or fake urgency have been added, per brief.
// Feature language uses "assistance/support" rather than guarantees — see
// career-support page for the same approach: never promise guaranteed placement.
export const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 'Contact for Current Fees',
    description: 'For beginners starting their journey',
    features: ['Live classes', 'Recorded sessions', 'Assignments', 'Doubt support', 'Community access'],
    emiAvailable: true,
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 'Contact for Current Fees',
    badge: 'Most Popular',
    description: 'Complete, project-driven learning with career support',
    features: [
      'Everything in Basic', 'Demo classes', 'Projects', 'Real-world case studies',
      'Mentorship', 'Certification', 'Resume building', 'Career guidance',
    ],
    emiAvailable: true,
    highlighted: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 'Contact for Current Fees',
    description: 'For focused, career-outcome learning',
    features: [
      'Everything in Professional', 'LinkedIn optimization', 'Portfolio support',
      'Mock interviews', 'Placement assistance', 'Internship support', 'Job referrals',
      '24/7 student support', 'Lifetime LMS access',
    ],
    emiAvailable: true,
  },
];

export interface ComparisonRow {
  feature: string;
  basic: boolean;
  professional: boolean;
  premium: boolean;
}

export const comparisonRows: ComparisonRow[] = [
  { feature: 'Live Classes', basic: true, professional: true, premium: true },
  { feature: 'Recorded Sessions', basic: true, professional: true, premium: true },
  { feature: 'Demo Classes', basic: false, professional: true, premium: true },
  { feature: 'Assignments', basic: true, professional: true, premium: true },
  { feature: 'Projects', basic: false, professional: true, premium: true },
  { feature: 'Real-World Case Studies', basic: false, professional: true, premium: true },
  { feature: 'Mentorship', basic: false, professional: true, premium: true },
  { feature: 'Resume Building', basic: false, professional: true, premium: true },
  { feature: 'LinkedIn Optimization', basic: false, professional: false, premium: true },
  { feature: 'Portfolio Support', basic: false, professional: false, premium: true },
  { feature: 'Mock Interviews', basic: false, professional: false, premium: true },
  { feature: 'Career Guidance', basic: false, professional: true, premium: true },
  { feature: 'Placement Assistance', basic: false, professional: false, premium: true },
  { feature: 'Internship Support', basic: false, professional: false, premium: true },
  { feature: 'Job Referrals', basic: false, professional: false, premium: true },
  { feature: 'Certification', basic: false, professional: true, premium: true },
  { feature: '24/7 Student Support', basic: false, professional: false, premium: true },
  { feature: 'Community Access', basic: true, professional: true, premium: true },
  { feature: 'Lifetime LMS Access', basic: false, professional: false, premium: true },
];
