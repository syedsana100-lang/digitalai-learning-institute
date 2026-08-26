import { isSanityConfigured } from '@/sanity/env';
import StudioClient from './StudioClient';

export const dynamic = 'force-static';

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-950 px-6 text-center text-paper">
        <div className="max-w-md">
          <h1 className="font-display text-2xl font-bold">Admin Panel Not Connected Yet</h1>
          <p className="mt-3 text-sm text-mist">
            Set <code className="rounded bg-ink-900 px-1.5 py-0.5">NEXT_PUBLIC_SANITY_PROJECT_ID</code> and{' '}
            <code className="rounded bg-ink-900 px-1.5 py-0.5">NEXT_PUBLIC_SANITY_DATASET</code> in your environment
            variables, then redeploy to activate the CMS admin panel here. See{' '}
            <code className="rounded bg-ink-900 px-1.5 py-0.5">sanity/README.md</code> for the full setup steps.
          </p>
        </div>
      </div>
    );
  }

  return <StudioClient />;
}
