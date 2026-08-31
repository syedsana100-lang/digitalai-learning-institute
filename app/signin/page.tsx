'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Loader2 } from 'lucide-react';

const oauthErrorMessages: Record<string, string> = {
  Configuration: 'Google Sign-In is not configured correctly on the server. Check GOOGLE_CLIENT_ID/SECRET and the authorized redirect URI in Google Cloud Console.',
  AccessDenied: 'Access was denied by Google, or your account is not on the approved test-user list yet (if the app is still in "Testing" mode).',
  OAuthAccountNotLinked: 'This email is already registered with a password. Sign in with your password instead, or use the same method you originally signed up with.',
  OAuthCallback: 'Google sign-in failed during the callback step — usually a redirect URI mismatch. Check Google Cloud Console.',
  OAuthSignin: 'Could not start the Google sign-in flow. Check GOOGLE_CLIENT_ID/SECRET are set correctly.',
  Default: 'Something went wrong signing in with Google. Please try again or use email/password.',
};

function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get('callbackUrl') || '/student-dashboard';
  const oauthError = params.get('error');

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    if (res?.ok) {
      router.push(callbackUrl);
      router.refresh();
    } else {
      setError('Incorrect email or password.');
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-5 py-16">
      <h1 className="font-display text-3xl font-extrabold">Welcome Back</h1>
      <p className="mt-2 text-sm text-mist">Sign in to access your student dashboard.</p>

      {oauthError && (
        <p className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {oauthErrorMessages[oauthError] || oauthErrorMessages.Default}
          {' '}
          <span className="text-mist">(code: {oauthError})</span>
        </p>
      )}

      <button
        type="button"
        onClick={() => signIn('google', { callbackUrl })}
        className="focus-ring mt-6 flex items-center justify-center gap-3 rounded-full border border-white/15 py-3 text-sm font-semibold transition-colors hover:bg-white/5"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09A6.94 6.94 0 0 1 5.44 12c0-.73.13-1.44.4-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Continue with Google
      </button>

      <div className="my-6 flex items-center gap-3 text-xs text-mist">
        <div className="h-px flex-1 bg-white/10" /> OR <div className="h-px flex-1 bg-white/10" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-mist">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="focus-ring w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-sm"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-mist">Password</label>
          <input
            required
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="focus-ring w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-sm"
          />
        </div>

        {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="focus-ring flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-signal-blue to-signal-violet px-6 py-3.5 text-sm font-semibold shadow-glow transition-transform duration-150 hover:scale-[1.02] active:scale-95 disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Sign In
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-mist">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="font-semibold text-signal-cyan hover:underline">
          Create One
        </Link>
      </p>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInForm />
    </Suspense>
  );
}
