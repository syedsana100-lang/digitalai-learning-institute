'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, Phone, LayoutDashboard, ShieldCheck, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { categoryMeta } from '@/lib/courses-data';
import MobileMenu from '@/components/MobileMenu';
import type { SanitySiteSettings } from '@/sanity/lib/queries';

const publicNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

type Role = 'STUDENT' | 'ADMIN' | undefined;

export default function Header({
  settings,
  role,
}: {
  settings?: SanitySiteSettings | null;
  role?: Role;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const logoUrl = settings?.logoUrl || '/images/logo.png';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-150 ${
          scrolled ? 'py-2 glass shadow-card' : 'py-4 bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="focus-ring flex items-center gap-2.5" aria-label="DigitalAI Learning Institute — Home">
            <Image
              src={logoUrl}
              alt="DigitalAI Learning Institute logo"
              width={40}
              height={38}
              priority
              className="h-9 w-auto sm:h-10"
            />
            <span className="font-display text-base font-extrabold tracking-tight sm:text-lg">
              Digital<span className="text-gradient">AI</span> Learning
            </span>
          </Link>

          {role === 'ADMIN' ? (
            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="focus-ring hidden items-center gap-1.5 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/5 lg:flex"
              >
                <ShieldCheck className="h-4 w-4" /> Admin Panel
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="focus-ring hidden items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-mist transition-colors hover:text-paper lg:flex"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
              <button aria-label="Open menu" onClick={() => setMobileOpen(true)} className="focus-ring rounded-md p-2 lg:hidden">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          ) : role === 'STUDENT' ? (
            <div className="flex items-center gap-3">
              <Link
                href="/student-dashboard"
                className="focus-ring hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-signal-blue to-signal-violet px-5 py-2.5 text-sm font-semibold shadow-glow lg:flex"
              >
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="focus-ring hidden items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-mist transition-colors hover:text-paper lg:flex"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
              <button aria-label="Open menu" onClick={() => setMobileOpen(true)} className="focus-ring rounded-md p-2 lg:hidden">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          ) : (
            <>
              <nav className="hidden items-center gap-7 lg:flex">
                <div
                  className="relative"
                  onMouseEnter={() => setCoursesOpen(true)}
                  onMouseLeave={() => setCoursesOpen(false)}
                >
                  <button className="focus-ring group flex items-center gap-1 py-2 text-sm font-medium text-mist transition-colors hover:text-paper">
                    Courses <ChevronDown className={`h-4 w-4 transition-transform ${coursesOpen ? 'rotate-180' : ''}`} />
                    <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-gradient-to-r from-signal-blue to-signal-cyan transition-all duration-200 group-hover:w-full" />
                  </button>
                  <AnimatePresence>
                    {coursesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.12 }}
                        className="glass absolute left-1/2 top-full mt-3 w-[560px] -translate-x-1/2 rounded-lg p-5 shadow-card"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(categoryMeta).map(([slug, meta]) => (
                            <Link
                              key={slug}
                              href={`/courses?category=${slug}`}
                              className="focus-ring rounded-md p-3 transition-colors hover:bg-white/5"
                            >
                              <p className="font-display text-sm font-semibold">{meta.label}</p>
                              <p className="mt-1 text-xs leading-relaxed text-mist">{meta.description}</p>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {publicNavLinks.map((l) => {
                  const active = pathname === l.href;
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={`focus-ring group relative py-2 text-sm font-medium transition-colors ${
                        active ? 'text-paper' : 'text-mist hover:text-paper'
                      }`}
                    >
                      {l.label}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-[1.5px] bg-gradient-to-r from-signal-blue to-signal-cyan transition-all duration-200 ${
                          active ? 'w-full shadow-glow' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </Link>
                  );
                })}
              </nav>

              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="focus-ring hidden rounded-full px-4 py-2.5 text-sm font-semibold text-mist transition-colors hover:text-paper lg:inline-block"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="focus-ring hidden rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-white/5 lg:inline-block"
                >
                  Signup
                </Link>
                <a
                  href="tel:+919310378799"
                  className="focus-ring hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-signal-blue to-signal-violet px-5 py-2.5 text-sm font-semibold shadow-glow transition-transform duration-150 hover:scale-[1.03] active:scale-95 lg:flex"
                >
                  <Phone className="h-3.5 w-3.5" /> Call Now
                </a>
                <button
                  aria-label="Open menu"
                  onClick={() => setMobileOpen(true)}
                  className="focus-ring rounded-md p-2 lg:hidden"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </>
          )}
        </div>
      </header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} role={role} />
    </>
  );
}
