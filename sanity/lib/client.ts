import { createClient, type SanityClient } from 'next-sanity';
import { apiVersion, dataset, projectId, isSanityConfigured } from '../env';

/**
 * `client` is `null` until NEXT_PUBLIC_SANITY_PROJECT_ID and
 * NEXT_PUBLIC_SANITY_DATASET are set. Every fetch helper in queries.ts checks
 * for this and returns `null`/`[]` instead of throwing, so the site runs
 * fine on the existing static content (lib/blog-data.ts, lib/courses-data.ts)
 * until a real Sanity project is connected.
 */
export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true, // fast, cached reads — set to false if you need to see edits instantly while testing
      perspective: 'published',
    })
  : null;

export { isSanityConfigured };
