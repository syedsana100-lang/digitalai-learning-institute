'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const whyTeach = [
  'Reach students across India through an online-first platform',
  'Flexible teaching schedule around live or recorded sessions',
  'Be part of a curriculum built around practical, project-based learning',
];

const requirements = [
  'Demonstrated expertise in your subject area',
  'Prior teaching, training or mentorship experience preferred',
  'Comfortable teaching in an online, camera-on format',
];

const process = [
  'Submit your application below',
  'Initial screening call with our academic team',
  'Demo session on a sample topic',
  'Onboarding and curriculum alignment',
];

export default function BecomeInstructorPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', expertise: '', experience: '', linkedin: '', portfolio: '', message: '' });
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.expertise) {
      setError('Please fill in your name, email and area of expertise.');
      return;
    }
    setError('');
    // TODO: connect to real API/CRM
    setSubmitted(true);
  }

  const inputClass = 'w-full rounded-lg border border-white/10 bg-ink-950 px-4 py-3 text-sm text-paper placeholder:text-mist/50 focus-ring focus:border-signal-blue';

  return (
    <div className="pt-16 pb-20">
      <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h1 className="font-display text-4xl font-extrabold lg:text-5xl">Become an Instructor</h1>
        <p className="mt-4 text-mist leading-relaxed">
          Share your expertise with learners across India through DigitalAI Learning Institute.
        </p>
      </div>

      <section className="mx-auto grid max-w-5xl gap-8 px-5 py-14 sm:grid-cols-3 lg:px-8">
        <div>
          <h2 className="font-display text-base font-semibold">Why Teach With Us</h2>
          <ul className="mt-3 space-y-2 text-sm text-mist">
            {whyTeach.map((t) => <li key={t}>• {t}</li>)}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-base font-semibold">Requirements</h2>
          <ul className="mt-3 space-y-2 text-sm text-mist">
            {requirements.map((t) => <li key={t}>• {t}</li>)}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-base font-semibold">Process</h2>
          <ol className="mt-3 space-y-2 text-sm text-mist">
            {process.map((t, i) => <li key={t}>{i + 1}. {t}</li>)}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-5 pb-14 lg:px-8">
        {submitted ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center rounded-2xl border border-white/8 bg-ink-900 p-10 text-center">
            <CheckCircle2 className="h-12 w-12 text-signal-cyan" />
            <h3 className="mt-4 font-display text-xl font-semibold">Application received</h3>
            <p className="mt-2 max-w-sm text-sm text-mist">Our academic team will review your application and reach out.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-2xl border border-white/8 bg-ink-900 p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <input className={inputClass} placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input className={inputClass} placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input className={inputClass} placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <input className={inputClass} placeholder="Area of Expertise" value={form.expertise} onChange={(e) => setForm({ ...form, expertise: e.target.value })} />
              <input className={inputClass} placeholder="Years of Experience" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} />
              <input className={inputClass} placeholder="LinkedIn URL" value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} />
            </div>
            <input className={`${inputClass} mt-4`} placeholder="Portfolio / Website URL" value={form.portfolio} onChange={(e) => setForm({ ...form, portfolio: e.target.value })} />
            <textarea className={`${inputClass} mt-4 min-h-[100px] resize-none`} placeholder="Tell us about yourself" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
            <button type="submit" className="focus-ring mt-6 w-full rounded-full bg-gradient-to-r from-signal-blue to-signal-violet px-7 py-3.5 text-sm font-semibold shadow-glow sm:w-auto">
              Submit Application
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
