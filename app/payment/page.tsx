import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, QrCode, CreditCard, MessageCircle, Phone, Mail, AlertTriangle } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';
import RevealSection from '@/components/RevealSection';

export const metadata: Metadata = buildMetadata({
  title: 'Make a Payment — Pay Your Course Fee',
  description: 'Pay your DigitalAI Learning Institute course fee securely via UPI or Debit/Credit Card.',
  path: '/payment',
});

const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent('Hi, I have made a payment and want to confirm my enrollment.')}`;

export default function PaymentPage() {
  return (
    <div className="pb-20">
      <nav aria-label="Breadcrumb" className="mx-auto max-w-4xl px-5 pt-6 lg:px-8">
        <ol className="flex items-center gap-1.5 text-xs text-mist">
          <li><Link href="/" className="focus-ring hover:text-paper">Home</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li className="text-paper">Payment</li>
        </ol>
      </nav>

      <RevealSection className="mx-auto max-w-2xl px-5 pb-10 pt-6 text-center lg:px-8">
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-mist">
          <ShieldCheck className="h-3.5 w-3.5 text-signal-cyan" /> 100% Secure Payment
        </span>
        <h1 className="font-display text-4xl font-extrabold lg:text-5xl">Make a Payment</h1>
        <p className="mt-4 text-mist leading-relaxed">
          Pay your DigitalAI Learning course fee using the option that suits you best — UPI / QR for
          instant transfer, or Debit / Credit Card.
        </p>
      </RevealSection>

      {/* Configuration notice — visible only until real payment credentials are added */}
      {!process.env.NEXT_PUBLIC_RAZORPAY_PAYMENT_LINK && (
        <RevealSection className="mx-auto mb-10 max-w-2xl px-5 lg:px-8">
          <div className="flex items-start gap-3 rounded-2xl border border-yellow-500/30 bg-yellow-500/5 p-5">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-400" />
            <div className="text-sm text-mist">
              <p className="font-semibold text-yellow-300">This page isn\u2019t live yet</p>
              <p className="mt-1">
                No real UPI ID or Razorpay account is connected. Replace the placeholder UPI ID and
                set <code className="rounded bg-black/30 px-1 py-0.5 text-xs">NEXT_PUBLIC_RAZORPAY_PAYMENT_LINK</code> once
                you have a real Razorpay payment link, then remove this notice. Until then, direct
                students to pay via WhatsApp coordination or your existing payment method.
              </p>
            </div>
          </div>
        </RevealSection>
      )}

      <section className="mx-auto grid max-w-4xl gap-6 px-5 lg:grid-cols-2 lg:px-8">
        {/* Option 1 — UPI / QR */}
        <RevealSection>
          <div className="h-full rounded-2xl border border-white/8 bg-ink-900 p-7">
            <p className="text-xs font-medium uppercase tracking-wide text-signal-cyan">Option 1 — UPI / QR</p>
            <h2 className="mt-2 flex items-center gap-2 font-display text-lg font-semibold">
              <QrCode className="h-5 w-5" /> Scan & Pay
            </h2>
            <p className="mt-2 text-sm text-mist">
              Open any UPI app — GPay, PhonePe, Paytm, BHIM — and scan the QR code.
            </p>
            <div className="mx-auto mt-5 flex h-48 w-48 items-center justify-center rounded-xl border border-dashed border-white/15 bg-ink-950 text-center text-xs text-mist">
              QR code placeholder —<br />upload your real UPI QR image here
            </div>
            <p className="mt-5 text-xs text-mist">Or pay to UPI ID</p>
            <div className="mt-1 rounded-lg border border-white/10 bg-ink-950 px-4 py-2.5 font-mono text-sm">
              your-upi-id@bank <span className="text-mist">— TODO: replace</span>
            </div>
            <p className="mt-4 text-xs text-mist">Accepted: GPay • PhonePe • Paytm • Amazon Pay • BHIM UPI</p>
          </div>
        </RevealSection>

        {/* Option 2 — Card / Netbanking */}
        <RevealSection delay={0.08}>
          <div className="h-full rounded-2xl border border-white/8 bg-ink-900 p-7">
            <p className="text-xs font-medium uppercase tracking-wide text-signal-cyan">Option 2 — Card / Netbanking</p>
            <h2 className="mt-2 flex items-center gap-2 font-display text-lg font-semibold">
              <CreditCard className="h-5 w-5" /> Pay via Debit / Credit Card
            </h2>
            <p className="mt-2 text-sm text-mist">
              Use Visa, MasterCard, RuPay, American Express, Netbanking or EMI through a payment
              gateway partner.
            </p>

            <div className="mt-5 rounded-xl border border-white/10 bg-ink-950 p-5">
              <p className="font-mono text-sm text-mist">•••• •••• •••• ••••</p>
              <div className="mt-4 flex justify-between text-xs text-mist">
                <span>Card holder<br /><span className="text-paper">Your Name</span></span>
                <span>Valid thru<br /><span className="text-paper">MM / YY</span></span>
              </div>
            </div>

            <a
              href={process.env.NEXT_PUBLIC_RAZORPAY_PAYMENT_LINK || '#'}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!process.env.NEXT_PUBLIC_RAZORPAY_PAYMENT_LINK}
              className="focus-ring mt-5 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-signal-blue to-signal-violet px-6 py-3 text-sm font-semibold shadow-glow transition-transform duration-150 hover:scale-[1.02] active:scale-95 aria-disabled:pointer-events-none aria-disabled:opacity-50"
            >
              Pay Securely with Razorpay
            </a>
            <p className="mt-3 text-center text-[11px] text-mist">
              256-bit SSL encrypted • PCI-DSS compliant • Powered by Razorpay
            </p>
            <p className="mt-2 text-center text-[11px] text-mist">We accept: Visa • MasterCard • RuPay • Amex • Netbanking • EMI</p>
          </div>
        </RevealSection>
      </section>

      {/* After payment steps */}
      <section className="mx-auto max-w-2xl px-5 py-14 lg:px-8">
        <RevealSection>
          <h2 className="mb-5 font-display text-lg font-semibold">After Making the Payment</h2>
          <ol className="space-y-3">
            {[
              'Take a screenshot of the successful payment confirmation.',
              'Share it with our team on WhatsApp.',
              'Mention your full name, batch and course you\u2019ve enrolled in.',
              'You\u2019ll receive your enrollment confirmation & receipt within 1 working day.',
            ].map((step, i) => (
              <li key={step} className="flex items-start gap-3 rounded-xl border border-white/8 bg-ink-900 p-4 text-sm text-mist">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-signal-blue to-signal-violet text-xs font-bold">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>

          <div className="mt-6 flex flex-wrap gap-4">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="focus-ring flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-transform duration-150 hover:scale-[1.02] active:scale-95">
              <MessageCircle className="h-4 w-4" /> Confirm on WhatsApp
            </a>
            <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="focus-ring flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold hover:bg-white/5">
              <Phone className="h-4 w-4" /> {siteConfig.contact.phone}
            </a>
          </div>

          <p className="mt-5 flex items-center gap-1.5 text-xs text-mist">
            <Mail className="h-3.5 w-3.5" /> Need help with payment? Email {siteConfig.contact.email}
          </p>
        </RevealSection>
      </section>
    </div>
  );
}
