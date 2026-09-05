import type { Metadata } from 'next';
import SignUpForm from '@/components/auth/SignUpForm';

export const metadata: Metadata = {
  title: 'Create Account — DigitalAI Learning Institute',
  description: 'Create your free DigitalAI Learning Institute student account.',
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return <SignUpForm />;
}
