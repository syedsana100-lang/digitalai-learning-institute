import RevealSection from "@/components/RevealSection";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cookie Policy",
  description: "Cookie Policy for DigitalAI Learning Institute.",
  path: "/cookie-policy",
});

export default function Page() {
  return (
    <div className="pt-16 pb-20">
      <RevealSection className="mx-auto max-w-3xl px-5 lg:px-8">
        <h1 className="font-display text-4xl font-extrabold">Cookie Policy</h1>
        <p className="mt-3 text-xs text-mist">Last updated: [DATE — set before publishing]</p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-mist">
          <p>
            <strong className="text-paper">Placeholder content.</strong> This page contains
            professional placeholder legal text. It must be reviewed and finalized by a qualified
            legal professional, and all bracketed [business-specific] fields completed, before
            this page is published live.
          </p>
          <div>
            <h2 className="font-display text-lg font-semibold text-paper">1. Overview</h2>
            <p className="mt-2">
              This Cookie Policy explains how DigitalAI Learning Institute ("we", "us", "our"), an
              online technical education institute, handles [insert relevant scope] for students
              and website visitors across India.
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-paper">2. Scope</h2>
            <p className="mt-2">
              This policy applies to all users of {siteConfig.brand.domain.replace(/^https?:\/\//, '')} and all online courses
              offered by DigitalAI Learning Institute. [Insert business-specific detail here.]
            </p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-paper">3. Contact</h2>
            <p className="mt-2">
              For questions about this policy, contact us at [insert real business email]. See our
              <a href="/contact" className="underline"> Contact page</a> for more ways to reach us.
            </p>
          </div>
        </div>
      </RevealSection>
    </div>
  );
}
