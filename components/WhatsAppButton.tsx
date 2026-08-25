'use client';

import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export default function WhatsAppButton() {
  const { whatsappNumber, whatsappDefaultMessage } = siteConfig.contact;

  // No fake number is hard-coded — button only renders once a real number is configured.
  if (!whatsappNumber) return null;

  const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappDefaultMessage)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onClick={() => {
        // analytics hook: track('whatsapp_click')
      }}
      className="focus-ring fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-card transition-transform hover:scale-105"
    >
      <MessageCircle className="h-7 w-7 text-white" fill="white" />
    </a>
  );
}
