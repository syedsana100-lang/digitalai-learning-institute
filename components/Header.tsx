'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, Phone, LayoutDashboard, ShieldCheck, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { categoryMeta, getAllCourses } from '@/lib/courses-data';
import MobileMenu from '@/components/MobileMenu';
import type { SanitySiteSettings } from '@/sanity/lib/queries';

const allCourses = getAllCourses();
const coursesByCategory = Object.keys(categoryMeta).map((slug) => ({
  slug,
  meta: categoryMeta[slug as keyof typeof categoryMeta],
  courses: allCourses.filter((c) => c.category === slug),
}));

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
                        className="glass absolute left-1/2 top-full mt-3 max-h-[70vh] w-[640px] -translate-x-1/2 overflow-y-auto rounded-lg p-5 shadow-card"
                      >
                        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                          {coursesByCategory.map(({ slug, meta, courses }) => (
                            <div key={slug}>
                              <Link
                                href={`/courses?category=${slug}`}
                                className="focus-ring block text-xs font-semibold uppercase tracking-wide text-signal-cyan hover:underline"
                              >
                                {meta.label}
                              </Link>
                              <ul className="mt-2 space-y-1.5">
                                {courses.map((c) => (
                                  <li key={c.slug}>
                                    <Link
                                      href={`/courses/${c.slug}`}
                                      className="focus-ring block rounded-md px-1 py-1 text-sm text-mist transition-colors hover:bg-white/5 hover:text-paper"
                                    >
                                      {c.title}
                                    </Link>
                                  </li>
                                ))}
                                {courses.length === 0 && (
                                  <li className="text-xs text-mist/60">Coming soon</li>
                                )}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <Link
                          href="/courses"
                          className="focus-ring mt-4 block border-t border-white/8 pt-3 text-center text-sm font-semibold text-signal-cyan hover:underline"
                        >
                          View All Courses →
                        </Link>
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
                  className="focus-ring hidden rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/5 lg:inline-block"
                >
                  Login
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
