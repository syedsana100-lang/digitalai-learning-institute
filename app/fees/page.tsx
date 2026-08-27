import { buildMetadata } from '@/lib/seo';
import { Check, X } from 'lucide-react';
import { pricingPlans, comparisonRows } from '@/lib/pricing-data';
import RevealSection from '@/components/RevealSection';
import CTASection from '@/components/CTASection';

export const metadata = buildMetadata({
  title: 'Course Fees',
  description: 'Transparent course fee plans and comparisons for DigitalAI Learning Institute online programs.',
  path: '/fees',
});

export default function FeesPage() {
  return (
    <div className="pt-16">
      <RevealSection className="mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h1 className="font-display text-4xl font-extrabold lg:text-5xl">Course Fees</h1>
        <p className="mt-4 text-mist leading-relaxed">
          Transparent pricing with EMI options and no hidden costs. Contact us for current fees — see
          your chosen course page for program-specific details.
        </p>
      </RevealSection>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-14 sm:grid-cols-3 lg:px-8">
        {pricingPlans.map((plan, i) => (
          <RevealSection key={plan.id} delay={i * 0.08}>
            <div className={`flex h-full flex-col rounded-2xl border p-7 ${plan.highlighted ? 'border-signal-blue bg-ink-900 shadow-glow' : 'border-white/8 bg-ink-900'}`}>
              {plan.badge && (
                <span className="mb-3 inline-block w-fit rounded-full bg-gradient-to-r from-signal-blue to-signal-violet px-3 py-1 text-[11px] font-semibold">
                  {plan.badge}
                </span>
              )}
              <h2 className="font-display text-lg font-semibold">{plan.name}</h2>
              <p className="mt-1 text-sm text-mist">{plan.description}</p>
              <p className="mt-5 font-display text-3xl font-extrabold">{plan.price}</p>
              {plan.emiAvailable && <p className="text-xs text-mist">EMI available</p>}
              <ul className="mt-6 flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-mist">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal-cyan" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </RevealSection>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-14 lg:px-8">
        <RevealSection className="mb-6">
          <h2 className="font-display text-2xl font-bold">Compare Plans</h2>
        </RevealSection>

        {/* Desktop table */}
        <RevealSection className="hidden overflow-hidden rounded-2xl border border-white/8 sm:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-ink-900 text-left text-mist">
                <th className="px-5 py-4 font-medium">Feature</th>
                <th className="px-5 py-4 font-medium">Basic</th>
                <th className="px-5 py-4 font-medium">Professional</th>
                <th className="px-5 py-4 font-medium">Premium</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.feature} className="border-b border-white/5 last:border-0">
                  <td className="px-5 py-4 text-mist">{row.feature}</td>
                  <td className="px-5 py-4">{row.basic ? <Check className="h-4 w-4 text-signal-cyan" /> : <X className="h-4 w-4 text-mist/40" />}</td>
                  <td className="px-5 py-4">{row.professional ? <Check className="h-4 w-4 text-signal-cyan" /> : <X className="h-4 w-4 text-mist/40" />}</td>
                  <td className="px-5 py-4">{row.premium ? <Check className="h-4 w-4 text-signal-cyan" /> : <X className="h-4 w-4 text-mist/40" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </RevealSection>

        {/* Mobile stacked cards */}
        <div className="space-y-3 sm:hidden">
          {comparisonRows.map((row) => (
            <div key={row.feature} className="rounded-xl border border-white/8 bg-ink-900 p-4">
              <p className="text-sm font-medium">{row.feature}</p>
              <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-mist">
                <span className="flex items-center gap-1">{row.basic ? <Check className="h-3.5 w-3.5 text-signal-cyan" /> : <X className="h-3.5 w-3.5 text-mist/40" />} Basic</span>
                <span className="flex items-center gap-1">{row.professional ? <Check className="h-3.5 w-3.5 text-signal-cyan" /> : <X className="h-3.5 w-3.5 text-mist/40" />} Pro</span>
                <span className="flex items-center gap-1">{row.premium ? <Check className="h-3.5 w-3.5 text-signal-cyan" /> : <X className="h-3.5 w-3.5 text-mist/40" />} Premium</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        headline="Not Sure Which Plan Fits You?"
        text="Talk to a learning counsellor to find the right plan for your goals and budget."
        primaryLabel="Book Free Counselling"
        primaryHref="/contact#counselling"
        secondaryLabel="Explore Courses"
        secondaryHref="/courses"
      />
    </div>
  );
}
