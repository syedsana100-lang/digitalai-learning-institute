import type { Metadata } from 'next';
import { Mail, Phone, MapPin, MessageCircle, UserCheck, ClipboardList, GraduationCap, CalendarCheck } from 'lucide-react';
import CounsellingForm from '@/components/CounsellingForm';
import FAQAccordion from '@/components/FAQAccordion';
import RevealSection from '@/components/RevealSection';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Contact & Free Counselling',
  description: 'Get in touch with DigitalAI Learning Institute — call, WhatsApp, email, or book a free learning counselling session.',
};

const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(siteConfig.contact.whatsappDefaultMessage)}`;

const contactCards = [
  { icon: Phone, label: 'Call Us', value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone.replace(/\s/g, '')}` },
  { icon: MessageCircle, label: 'WhatsApp Us', value: 'Chat instantly', href: whatsappHref },
  { icon: Mail, label: 'Email Us', value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
  { icon: MapPin, label: 'Visit Us', value: siteConfig.contact.address, href: siteConfig.contact.mapEmbedUrl },
];

const supportSteps = [
  { icon: ClipboardList, title: 'Submit Your Query', text: 'Fill the counselling form or message us on WhatsApp.' },
  { icon: UserCheck, title: 'Counsellor Call', text: 'A learning counsellor reaches out within 24 hours.' },
  { icon: GraduationCap, title: 'Course Recommendation', text: 'Get a plan matched to your goals and experience level.' },
  { icon: CalendarCheck, title: 'Enroll & Start', text: 'Confirm your batch and begin learning.' },
];

const faqs = [
  { question: 'How fast will I get a response?', answer: 'Our team typically responds within 24 hours on business days.' },
  { question: 'Can I visit the Noida centre without an appointment?', answer: 'We recommend booking a slot first so a counsellor is available to meet you.' },
  { question: 'Is counselling really free?', answer: 'Yes — counselling and course guidance are completely free, with no obligation to enroll.' },
  { question: 'Can I get support after enrolling?', answer: 'Yes, enrolled students get ongoing doubt support through the course.' },
];

export default function ContactPage() {
  return (
    <div className="pb-20">
      <section className="relative overflow-hidden bg-mesh-gradient pb-16 pt-24">
        <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
        <RevealSection className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
          <h1 className="font-display text-4xl font-extrabold lg:text-5xl">Let&apos;s Talk</h1>
          <p className="mt-4 text-mist leading-relaxed">
            Questions about a course, fees, or your career path? Reach us however works best for
            you — call, WhatsApp, email, or visit our Noida centre.
          </p>
        </RevealSection>
      </section>

      <section className="mx-auto -mt-8 grid max-w-6xl gap-4 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {contactCards.map((c, i) => (
          <RevealSection key={c.label} delay={i * 0.06}>
            <a
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="focus-ring glass flex h-full flex-col rounded-2xl p-6 transition-transform hover:-translate-y-1"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-signal-blue/15 text-signal-cyan">
                <c.icon className="h-5 w-5" />
              </div>
              <p className="font-display text-sm font-semibold">{c.label}</p>
              <p className="mt-1 text-xs text-mist">{c.value}</p>
            </a>
          </RevealSection>
        ))}
      </section>

      <section className="mx-auto grid max-w-5xl gap-10 px-5 py-16 lg:grid-cols-[1fr,1.4fr] lg:px-8">
        <RevealSection>
          <h2 className="mb-1 font-display text-xl font-semibold">Visit Our Centre</h2>
          <p className="mb-4 text-sm text-mist">{siteConfig.contact.address} • {siteConfig.contact.businessHours}</p>
          <div className="overflow-hidden rounded-2xl border border-white/8">
            <iframe
              src={siteConfig.contact.mapEmbedUrl}
              width="100%"
              height="320"
              style={{ border: 0, filter: 'grayscale(0.3) invert(0.92) contrast(0.9)' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="DigitalAI Learning Institute Noida centre map"
            />
          </div>
        </RevealSection>

        <RevealSection id="counselling" delay={0.1}>
          <h2 className="mb-4 font-display text-xl font-semibold">Book Free Counselling</h2>
          <CounsellingForm />
        </RevealSection>
      </section>

      <section className="section-light py-16">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <RevealSection className="mb-10 text-center">
            <h2 className="font-display text-2xl font-bold">What Happens After You Reach Out</h2>
          </RevealSection>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {supportSteps.map((s, i) => (
              <RevealSection key={s.title} delay={i * 0.08}>
                <div className="card-light h-full rounded-2xl p-6">
                  <span className="font-mono text-xs text-signal-blue">{String(i + 1).padStart(2, '0')}</span>
                  <div className="mt-3 mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-signal-blue/10 text-signal-blue">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-sm font-semibold">{s.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-mist">{s.text}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
        <RevealSection className="mb-6">
          <h2 className="font-display text-2xl font-bold">Frequently Asked Questions</h2>
        </RevealSection>
        <FAQAccordion items={faqs} />
      </section>
    </div>
  );
}
