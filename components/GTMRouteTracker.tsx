'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { siteConfig } from '@/lib/site-config';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

function GTMRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!siteConfig.analytics.gtmId) return;
    if (typeof window === 'undefined' || !window.dataLayer) return;

    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    window.dataLayer.push({
      event: 'page_view',
      page_path: url,
    });
  }, [pathname, searchParams]);

  return null;
}

export default GTMRouteTracker;
