'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { getAllCourses } from '@/lib/courses-data';

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  qualification: string;
  interestedCourse: string;
  experienceLevel: string;
  preferredMode: string;
  message: string;
}

const initialState: FormState = {
  fullName: '', phone: '', email: '', city: '', qualification: '',
  interestedCourse: '', experienceLevel: '', preferredMode: 'Online', message: '',
};

export default function CounsellingForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const courses = getAllCourses();

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = 'Full name is required';
    if (!/^[0-9]{10}$/.test(form.phone.trim())) next.phone = 'Enter a valid 10-digit phone number';
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = 'Enter a valid email address';
    if (!form.city.trim()) next.city = 'City is required';
    if (!form.interestedCourse) next.interestedCourse = 'Please select a course';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    // TODO: replace with real API/CRM integration
    // await fetch('/api/counselling', { method: 'POST', body: JSON.stringify(form) })
    // analytics hook: track('counselling_form_submit')
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center rounded-2xl border border-white/8 bg-ink-900 p-10 text-center"
      >
        <CheckCircle2 className="h-12 w-12 text-signal-cyan" />
        <h3 className="mt-4 font-display text-xl font-semibold">Thanks — we&apos;ve got your details</h3>
        <p className="mt-2 max-w-sm text-sm text-mist">
          A learning counsellor will reach out to you shortly to help you pick the right course.
        </p>
      </motion.div>
    );
  }

  const inputClass =
    'w-full rounded-lg border border-white/10 bg-ink-950 px-4 py-3 text-sm text-paper placeholder:text-mist/50 focus-ring focus:border-signal-blue';

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-white/8 bg-ink-900 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input
            className={inputClass}
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            aria-invalid={!!errors.fullName}
          />
          {errors.fullName && <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>}
        </div>
        <div>
          <input
            className={inputClass}
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
        </div>
        <div>
          <input
            className={inputClass}
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
        </div>
        <div>
          <input
            className={inputClass}
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            aria-invalid={!!errors.city}
          />
          {errors.city && <p className="mt-1 text-xs text-red-400">{errors.city}</p>}
        </div>
        <input
          className={inputClass}
          placeholder="Current Qualification"
          value={form.qualification}
          onChange={(e) => setForm({ ...form, qualification: e.target.value })}
        />
        <div>
          <select
            className={inputClass}
            value={form.interestedCourse}
            onChange={(e) => setForm({ ...form, interestedCourse: e.target.value })}
            aria-invalid={!!errors.interestedCourse}
          >
            <option value="">Interested Course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.slug}>{c.title}</option>
            ))}
          </select>
          {errors.interestedCourse && <p className="mt-1 text-xs text-red-400">{errors.interestedCourse}</p>}
        </div>
        <select
          className={inputClass}
          value={form.experienceLevel}
          onChange={(e) => setForm({ ...form, experienceLevel: e.target.value })}
        >
          <option value="">Experience Level</option>
          <option>Beginner</option>
          <option>Some Experience</option>
          <option>Working Professional</option>
        </select>
        <select
          className={inputClass}
          value={form.preferredMode}
          onChange={(e) => setForm({ ...form, preferredMode: e.target.value })}
        >
          <option>Online — Live</option>
          <option>Online — Self-Paced</option>
        </select>
      </div>
      <textarea
        className={`${inputClass} mt-4 min-h-[100px] resize-none`}
        placeholder="Message (optional)"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      <button
        type="submit"
        className="focus-ring mt-6 w-full rounded-full bg-gradient-to-r from-signal-blue to-signal-violet px-7 py-3.5 text-sm font-semibold shadow-glow transition-transform duration-150 hover:scale-[1.01] active:scale-95 sm:w-auto"
      >
        Get Free Counselling
      </button>
    </form>
  );
}
