'use client';

import { useState } from 'react';
import { ShieldCheck, ShieldX, Loader2, Search } from 'lucide-react';
import RevealSection from '@/components/RevealSection';

interface Result {
  valid: boolean;
  studentName?: string;
  courseTitle?: string;
  certificateNumber?: string;
  issueDate?: string;
}

export default function VerifyCertificatePage() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!number.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/verify-certificate?number=${encodeURIComponent(number.trim())}`);
      const data = await res.json();
      setResult(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto min-h-[70vh] max-w-xl px-5 py-20 lg:px-8">
      <RevealSection className="text-center">
        <h1 className="font-display text-3xl font-extrabold lg:text-4xl">Verify a Certificate</h1>
        <p className="mt-3 text-mist">
          Enter the certificate number to confirm it was issued by DigitalAI Learning Institute.
        </p>
      </RevealSection>

      <form onSubmit={handleSubmit} className="mt-8 flex gap-3">
        <input
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="e.g. DAI-CERT-2026-000123"
          className="focus-ring flex-1 rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="focus-ring flex items-center gap-2 rounded-xl bg-gradient-to-r from-signal-blue to-signal-violet px-5 py-3 text-sm font-semibold shadow-glow disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          Verify
        </button>
      </form>

      {result && (
        <RevealSection className="mt-8 rounded-2xl border border-white/8 bg-ink-900 p-6">
          {result.valid ? (
            <div>
              <div className="flex items-center gap-2 text-signal-cyan">
                <ShieldCheck className="h-5 w-5" />
                <p className="font-display font-semibold">Valid Certificate</p>
              </div>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between gap-4"><dt className="text-mist">Student Name</dt><dd className="font-medium">{result.studentName}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-mist">Course</dt><dd className="font-medium">{result.courseTitle}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-mist">Certificate No.</dt><dd className="font-medium">{result.certificateNumber}</dd></div>
                <div className="flex justify-between gap-4">
                  <dt className="text-mist">Issue Date</dt>
                  <dd className="font-medium">{result.issueDate ? new Date(result.issueDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</dd>
                </div>
              </dl>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-red-400">
              <ShieldX className="h-5 w-5" />
              <p className="font-display font-semibold">No certificate found with that number.</p>
            </div>
          )}
        </RevealSection>
      )}
    </div>
  );
}
