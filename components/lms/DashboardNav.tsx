'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard, User, BookOpen, FileText, CreditCard, Award, LogOut, Users, ShieldCheck,
} from 'lucide-react';

const studentLinks = [
  { label: 'Overview', href: '', icon: LayoutDashboard },
  { label: 'My Profile', href: '/profile', icon: User },
  { label: 'My Courses', href: '/courses', icon: BookOpen },
  { label: 'Documents', href: '/documents', icon: FileText },
  { label: 'Payments', href: '/payments', icon: CreditCard },
  { label: 'Certificates', href: '/certificates', icon: Award },
];

const adminLinks = [
  { label: 'Overview', href: '', icon: LayoutDashboard },
  { label: 'Students', href: '/students', icon: Users },
  { label: 'Documents', href: '/documents', icon: ShieldCheck },
  { label: 'Courses', href: '/courses', icon: BookOpen },
];

export default function DashboardNav({
  studentName,
  studentCode,
  base,
  role,
}: {
  studentName: string;
  studentCode?: string;
  base: string;
  role: 'STUDENT' | 'ADMIN';
}) {
  const pathname = usePathname();
  const links = role === 'ADMIN' ? adminLinks : studentLinks;

  return (
    <>
      {/* Mobile: horizontal scrollable tab strip */}
      <nav className="scrollbar-none -mx-5 mb-2 flex gap-2 overflow-x-auto border-b border-white/8 px-5 pb-3 lg:hidden">
        {links.map((l) => {
          const href = `${base}${l.href}`;
          const active = pathname === href;
          return (
            <Link
              key={l.href}
              href={href}
              className={`focus-ring flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium transition-colors ${
                active ? 'bg-white/10 text-paper' : 'text-mist hover:text-paper'
              }`}
            >
              <l.icon className="h-3.5 w-3.5" /> {l.label}
            </Link>
          );
        })}
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="focus-ring flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium text-mist hover:text-paper"
        >
          <LogOut className="h-3.5 w-3.5" /> Logout
        </button>
      </nav>

      {/* Desktop: sticky sidebar */}
      <aside className="hidden w-56 shrink-0 lg:block">
        <div className="sticky top-24">
          <div className="mb-6">
            <p className="font-display text-sm font-semibold">{studentName}</p>
            {studentCode && <p className="text-xs text-mist">{studentCode}</p>}
          </div>
          <nav className="space-y-1">
            {links.map((l) => {
              const href = `${base}${l.href}`;
              const active = pathname === href;
              return (
                <Link
                  key={l.href}
                  href={href}
                  className={`focus-ring flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active ? 'bg-white/8 text-paper' : 'text-mist hover:bg-white/5 hover:text-paper'
                  }`}
                >
                  <l.icon className="h-4 w-4" /> {l.label}
                </Link>
              );
            })}
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="focus-ring flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-mist transition-colors hover:bg-white/5 hover:text-paper"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </nav>
        </div>
      </aside>
    </>
  );
}
