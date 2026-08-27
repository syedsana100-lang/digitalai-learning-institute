'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Copy, Check, QrCode, Smartphone } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export default function UpiPaymentSection() {
  const [copied, setCopied] = useState(false);
  const upiId = siteConfig.contact.upiId;

  // Standard UPI deep link — opens the user's default UPI app on mobile.
  // pn (payee name) and cu (currency) are optional context; amount (am) is
  // intentionally left out since fee amounts vary by course/plan.
  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(siteConfig.brand.name)}&cu=INR`;

  async function copyUpiId() {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard API unavailable (very old browser/insecure context) — no-op.
      // The UPI ID is still visible on screen for manual copying.
    }
  }

  return (
    <div className="h-full rounded-2xl border border-white/8 bg-ink-900 p-7">
      <p className="text-xs font-medium uppercase tracking-wide text-signal-cyan">Option 1 — UPI / QR</p>
      <h2 className="mt-2 flex items-center gap-2 font-display text-lg font-semibold">
        <QrCode className="h-5 w-5" /> Scan & Pay
      </h2>
      <p className="mt-2 text-sm text-mist">
        Scan this QR code using PhonePe, Google Pay, Paytm, or any UPI app.
      </p>

      <div className="mx-auto mt-5 w-56 max-w-full overflow-hidden rounded-xl border border-white/10 bg-white p-3">
        <Image
          src="/images/payment-qr.png"
          alt="UPI payment QR code for DigitalAI Learning Institute"
          width={636}
          height={635}
          className="h-auto w-full"
        />
      </div>

      <p className="mt-5 text-xs text-mist">Or pay to UPI ID</p>
      <div className="mt-1 flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-ink-950 px-4 py-2.5">
        <span className="font-mono text-sm">{upiId}</span>
        <button
          onClick={copyUpiId}
          aria-label="Copy UPI ID"
          className="focus-ring flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-white/5"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-signal-cyan" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> Copy
            </>
          )}
        </button>
      </div>
      {copied && (
        <p role="status" className="mt-1.5 text-xs text-signal-cyan">
          UPI ID copied successfully
        </p>
      )}

      <a
        href={upiDeepLink}
        className="focus-ring mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-signal-blue to-signal-violet px-6 py-3 text-sm font-semibold shadow-glow transition-transform duration-150 hover:scale-[1.02] active:scale-95"
      >
        <Smartphone className="h-4 w-4" /> Pay Using Any UPI App
      </a>
      <p className="mt-2 text-center text-[11px] text-mist">
        Opens your default UPI app on mobile. On desktop, scan the QR code instead.
      </p>

      <p className="mt-4 text-xs text-mist">Accepted: GPay • PhonePe • Paytm • Amazon Pay • BHIM UPI</p>
    </div>
  );
}
