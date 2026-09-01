'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import type { SanitySiteSettings } from '@/sanity/lib/queries';

type Role = 'STUDENT' | 'ADMIN' | undefined;

/**
 * The admin panel and student dashboard have their own dedicated layouts
 * (with a sidebar, not the public site chrome) — this wrapper is what keeps
 * the public Header/Footer/WhatsApp button from also rendering on top of
 * them. Path-based rather than a route-group restructure: much lower risk
 * for an already-live site, since it doesn't move any existing route files.
 */
export default function SiteChrome({
  children,
  settings,
  role,
}: {
  children: React.ReactNode;
  settings?: SanitySiteSettings | null;
  role?: Role;
}) {
  const pathname = usePathname();
  const isPortalRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/student-dashboard');

  if (isPortalRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Header settings={settings} role={role} />
      <main>{children}</main>
      <Footer settings={settings} />
      <WhatsAppButton />
    </>
  );
}
