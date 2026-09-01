'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { signOut } from 'next-auth/react';

const publicLinks = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

type Role = 'STUDENT' | 'ADMIN' | undefined;

export default function MobileMenu({ open, onClose, role }: { open: boolean; onClose: () => void; role?: Role }) {
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
            <span className="flex items-center gap-2.5 font-display text-lg font-extrabold">
              <Image src="/images/logo.png" alt="" width={32} height={30} className="h-8 w-auto" aria-hidden="true" />
              Digital<span className="text-gradient">AI</span> Learning
            </span>
            <button aria-label="Close menu" onClick={onClose} className="focus-ring rounded-md p-2">
              <X className="h-6 w-6" />
            </button>
          </div>

          {role === 'ADMIN' ? (
            <nav className="flex flex-col gap-1 px-5 py-6">
              <Link href="/admin" onClick={onClose} className="focus-ring block border-b border-white/5 py-4 font-display text-2xl font-semibold">
                Admin Panel
              </Link>
              <button onClick={() => signOut({ callbackUrl: '/' })} className="focus-ring block py-4 text-left font-display text-2xl font-semibold text-mist">
                Logout
              </button>
            </nav>
          ) : role === 'STUDENT' ? (
            <nav className="flex flex-col gap-1 px-5 py-6">
              <Link href="/student-dashboard" onClick={onClose} className="focus-ring block border-b border-white/5 py-4 font-display text-2xl font-semibold">
                Dashboard
              </Link>
              <button onClick={() => signOut({ callbackUrl: '/' })} className="focus-ring block py-4 text-left font-display text-2xl font-semibold text-mist">
                Logout
              </button>
            </nav>
          ) : (
            <>
              <nav className="flex flex-col gap-1 px-5 py-6">
                {publicLinks.map((l, i) => (
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
              <div className="space-y-3 px-5">
                <div className="flex gap-3">
                  <Link
                    href="/signin"
                    onClick={onClose}
                    className="focus-ring flex-1 rounded-full border border-white/15 px-6 py-3 text-center font-semibold"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={onClose}
                    className="focus-ring flex-1 rounded-full border border-white/15 px-6 py-3 text-center font-semibold"
                  >
                    Signup
                  </Link>
                </div>
                <a
                  href="tel:+919310378799"
                  onClick={onClose}
                  className="focus-ring block rounded-full bg-gradient-to-r from-signal-blue to-signal-violet px-6 py-3.5 text-center font-semibold shadow-glow"
                >
                  Call Now — +91 9310378799
                </a>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
