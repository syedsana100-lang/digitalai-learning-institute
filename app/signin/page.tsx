import type { Metadata } from 'next';
import SignInForm from '@/components/auth/SignInForm';

// Account/auth pages are utility pages, not content — they add no SEO value
// and a logged-out sign-in page indexed by Google is just noise in search
// results, so this (and signup/verify-certificate) are deliberately noindex.
export const metadata: Metadata = {
  title: 'Sign In — DigitalAI Learning Institute',
  description: 'Sign in to your DigitalAI Learning Institute student account.',
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return <SignInForm />;
}
