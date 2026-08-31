'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Check } from 'lucide-react';
import type { StudentProfile } from '@prisma/client';

const inputClass = 'focus-ring w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-2.5 text-sm';
const labelClass = 'mb-1.5 block text-xs font-medium text-mist';

export default function ProfileForm({ profile }: { profile: StudentProfile }) {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: profile.fullName || '',
    fatherName: profile.fatherName || '',
    gender: profile.gender || '',
    qualification: profile.qualification || '',
    institution: profile.institution || '',
    yearOfPassing: profile.yearOfPassing?.toString() || '',
    mobile: profile.mobile || '',
    whatsapp: profile.whatsapp || '',
    address: profile.address || '',
    city: profile.city || '',
    state: profile.state || '',
    postalCode: profile.postalCode || '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await fetch('/api/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) {
      setError(data.error || 'Could not save changes.');
      return;
    }
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Full Name</label>
          <input required value={form.fullName} onChange={(e) => set('fullName', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Father&apos;s Name</label>
          <input value={form.fatherName} onChange={(e) => set('fatherName', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Gender</label>
          <select value={form.gender} onChange={(e) => set('gender', e.target.value)} className={inputClass}>
            <option value="">Prefer not to say</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Highest Qualification</label>
          <input value={form.qualification} onChange={(e) => set('qualification', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Institution</label>
          <input value={form.institution} onChange={(e) => set('institution', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Year of Passing</label>
          <input type="number" value={form.yearOfPassing} onChange={(e) => set('yearOfPassing', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Mobile Number</label>
          <input required value={form.mobile} onChange={(e) => set('mobile', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>WhatsApp Number</label>
          <input value={form.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Address</label>
        <textarea rows={2} value={form.address} onChange={(e) => set('address', e.target.value)} className={inputClass} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={labelClass}>City</label>
          <input value={form.city} onChange={(e) => set('city', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>State</label>
          <input value={form.state} onChange={(e) => set('state', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Postal Code</label>
          <input value={form.postalCode} onChange={(e) => set('postalCode', e.target.value)} className={inputClass} />
        </div>
      </div>

      {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="focus-ring flex items-center gap-2 rounded-full bg-gradient-to-r from-signal-blue to-signal-violet px-6 py-3 text-sm font-semibold shadow-glow transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60"
      >
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : saved ? <Check className="h-4 w-4" /> : null}
        {saved ? 'Saved' : 'Save Changes'}
      </button>
    </form>
  );
}
