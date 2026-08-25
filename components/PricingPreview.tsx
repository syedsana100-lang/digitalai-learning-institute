'use client';

import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { pricingPlans } from '@/lib/pricing-data';
import RevealSection from '@/components/RevealSection';

export default function PricingPreview() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <RevealSection className="mb-12 text-center">
        <h2 className="font-display text-3xl font-extrabold lg:text-4xl">Simple, Transparent Pricing</h2>
        <p className="mx-auto mt-3 max-w-xl text-mist">Choose a plan that fits your goals — EMI available on every plan.</p>
      </RevealSection>

      <div className="grid gap-5 sm:grid-cols-3">
        {pricingPlans.map((plan, i) => (
          <RevealSection key={plan.id} delay={i * 0.08}>
            <div className={`flex h-full flex-col rounded-2xl border p-6 ${plan.highlighted ? 'border-signal-blue bg-ink-900 shadow-glow' : 'border-white/8 bg-ink-900'}`}>
              {plan.badge && (
                <span className="mb-3 inline-block w-fit rounded-full bg-gradient-to-r from-signal-blue to-signal-violet px-3 py-1 text-[11px] font-semibold">
                  {plan.badge}
                </span>
              )}
              <h3 className="font-display text-base font-semibold">{plan.name}</h3>
              <p className="mt-1 text-xs text-mist">{plan.description}</p>
              <p className="mt-4 font-display text-2xl font-extrabold">{plan.price}</p>
              <ul className="mt-4 flex-1 space-y-2">
                {plan.features.slice(0, 3).map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-mist">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal-cyan" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </RevealSection>
        ))}
      </div>

      <RevealSection className="mt-10 text-center" delay={0.2}>
        <Link
          href="/fees"
          className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-white/5"
        >
          View Full Pricing & Comparison <ArrowRight className="h-4 w-4" />
        </Link>
      </RevealSection>
    </section>
  );
}
