'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { BookOpen, Hammer, Users, Laptop, LifeBuoy, RefreshCw } from 'lucide-react';
import RevealSection from '@/components/RevealSection';

const defaultIcons = [BookOpen, Hammer, Users, Laptop, LifeBuoy, RefreshCw];

const defaultFeatures = [
  { title: 'Industry-Relevant Curriculum', text: 'Learn skills aligned with current technology and digital industry requirements.' },
  { title: 'Practical Projects', text: 'Build projects that demonstrate real skills, not just theory.' },
  { title: 'Expert-Led Learning', text: 'Learn through structured guidance and mentorship from practitioners.' },
  { title: 'Flexible Online Learning', text: 'Learn live or on your schedule, from anywhere in India.' },
  { title: 'Career Support', text: 'Resume, portfolio and interview guidance built into every program.' },
  { title: 'Continuous Skill Development', text: 'Stay updated with emerging technologies as the industry evolves.' },
];

export default function WhyDigitalAI({
  features: cmsFeatures,
}: {
  features?: { iconUrl?: string; title: string; description: string }[];
}) {
  // A Sanity Homepage document with "Why Choose Us" cards filled in overrides
  // the defaults below; the default lucide icon set is reused (cycling) for
  // any card that doesn't have an uploaded icon image.
  const features =
    cmsFeatures && cmsFeatures.length > 0
      ? cmsFeatures.map((f, i) => ({ title: f.title, text: f.description, iconUrl: f.iconUrl, Icon: defaultIcons[i % defaultIcons.length] }))
      : defaultFeatures.map((f, i) => ({ ...f, iconUrl: undefined, Icon: defaultIcons[i] }));

  return (
    <section className="section-light py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <RevealSection className="mb-12 text-center">
          <h2 className="font-display text-3xl font-extrabold lg:text-4xl">Why Learn With DigitalAI?</h2>
        </RevealSection>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <RevealSection key={f.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                className="card-light group h-full rounded-2xl p-6 transition-colors hover:border-signal-blue/50"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-signal-blue/10 text-signal-blue transition-colors group-hover:bg-signal-blue/20">
                  {f.iconUrl ? (
                    <Image src={f.iconUrl} alt="" width={22} height={22} className="h-5 w-5 object-contain" />
                  ) : (
                    <f.Icon className="h-5 w-5" />
                  )}
                </div>
                <h3 className="font-display text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{f.text}</p>
              </motion.div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
