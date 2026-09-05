import { buildMetadata } from '@/lib/seo';
import VerifyCertificateClient from '@/components/auth/VerifyCertificateClient';

// Unlike signin/signup, this page has genuine public/SEO value — people
// search for "[institute name] certificate verification" to confirm a
// candidate's credential, so it stays indexable (not noindex).
export const metadata = buildMetadata({
  title: 'Verify a Certificate',
  description: 'Verify the authenticity of a DigitalAI Learning Institute course completion certificate by certificate number.',
  path: '/verify-certificate',
});

export default function VerifyCertificatePage() {
  return <VerifyCertificateClient />;
}
