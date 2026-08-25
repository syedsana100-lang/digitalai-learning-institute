'use client';

import { useState } from 'react';
import { Linkedin, Twitter, Facebook, Link2, Check } from 'lucide-react';

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    { icon: Linkedin, label: 'Share on LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { icon: Twitter, label: 'Share on X', href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { icon: Facebook, label: 'Share on Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable — no-op
    }
  }

  return (
    <div className="flex items-center gap-2">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.label}
          className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-mist transition-colors hover:border-signal-cyan/50 hover:text-signal-cyan"
        >
          <l.icon className="h-4 w-4" />
        </a>
      ))}
      <button
        onClick={copyLink}
        aria-label="Copy link"
        className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-mist transition-colors hover:border-signal-cyan/50 hover:text-signal-cyan"
      >
        {copied ? <Check className="h-4 w-4 text-signal-cyan" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
