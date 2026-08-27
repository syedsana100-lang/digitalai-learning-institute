'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const links = [
  { label: 'Courses', href: '/courses' },
  { label: 'Programs', href: '/courses' },
  { label: 'Career Support', href: '/career-support' },
  { label: 'About', href: '/about' },
  { label: 'Resources', href: '/resources' },
  { label: 'Blog', href: '/blog' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[60] bg-ink-950/98 backdrop-blur-lg lg:hidden"
        >
          <div className="flex items-center justify-between px-5 py-4">
            <span className="font-display text-lg font-extrabold">
              Digital<span className="text-gradient">AI</span> Learning
            </span>
            <button aria-label="Close menu" onClick={onClose} className="focus-ring rounded-md p-2">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-5 py-6">
            {links.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.02, duration: 0.2 }}
              >
                <Link
                  href={l.href}
                  onClick={onClose}
                  className="focus-ring block border-b border-white/5 py-4 font-display text-2xl font-semibold"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="px-5">
            <Link
              href="/contact#counselling"
              onClick={onClose}
              className="focus-ring block rounded-full bg-gradient-to-r from-signal-blue to-signal-violet px-6 py-3.5 text-center font-semibold shadow-glow"
            >
              Book Free Counselling
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
