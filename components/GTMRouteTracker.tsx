'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export default function GTMRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    const url = searchParams?.toString() ? `${pathname}?${searchParams.toString()}` : pathname;
    window.dataLayer.push({ event: 'pageview', page: url });
  }, [pathname, searchParams]);

  return null;
}
