'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Download, Award, FileText } from 'lucide-react';
import type { Prisma } from '@prisma/client';
import { calculatePending, paymentStatusLabel } from '@/lib/lms/pricing';

type StudentWithRelations = Prisma.StudentProfileGetPayload<{
  include: {
    user: true;
    documents: true;
    enrollments: { include: { course: true; payments: true; certificate: true } };
  };
}>;

const inputClass = 'focus-ring w-full rounded-xl border border-white/10 bg-ink-950 px-3 py-2 text-sm';
const labelClass = 'mb-1 block text-xs font-medium text-mist';

export default function StudentDetailPanel({
  student,
  availableCourses,
}: {
  student: StudentWithRelations;
  availableCourses: { slug: string; title: string; fee: number | null }[];
}) {
  const router = useRouter();
  const [enrollForm, setEnrollForm] = useState({ sanitySlug: '', totalPrice: '', discount: '0' });
  const [enrolling, setEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState<string | null>(null);

  const [paymentForms, setPaymentForms] = useState<Record<string, { amount: string; method: string; referenceId: string }>>({});
  const [payingId, setPayingId] = useState<string | null>(null);
  const [completingId, setCompletingId] = useState<string | null>(null);

  function selectCourse(slug: string) {
    const course = availableCourses.find((c) => c.slug === slug);
    setEnrollForm({ sanitySlug: slug, totalPrice: course?.fee ? String(course.fee) : '', discount: '0' });
  }

  async function handleEnroll(e: React.FormEvent) {
    e.preventDefault();
    const course = availableCourses.find((c) => c.slug === enrollForm.sanitySlug);
    if (!course) return;
    setEnrolling(true);
    setEnrollError(null);
    const res = await fetch('/api/admin/enrollments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: student.id,
        sanitySlug: course.slug,
        courseTitle: course.title,
        totalPrice: Number(enrollForm.totalPrice) || 0,
        discount: Number(enrollForm.discount) || 0,
      }),
    });
    const data = await res.json();
    setEnrolling(false);
    if (!res.ok) {
      setEnrollError(data.error || 'Could not enroll student.');
      return;
    }
    setEnrollForm({ sanitySlug: '', totalPrice: '', discount: '0' });
    router.refresh();
  }

  async function handlePayment(enrollmentId: string) {
    const form = paymentForms[enrollmentId];
    if (!form?.amount) return;
    setPayingId(enrollmentId);
    const res = await fetch('/api/admin/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        enrollmentId,
        amount: Number(form.amount),
        method: form.method || 'UPI',
        referenceId: form.referenceId,
      }),
    });
    setPayingId(null);
    if (res.ok) {
      setPaymentForms((f) => ({ ...f, [enrollmentId]: { amount: '', method: 'UPI', referenceId: '' } }));
      router.refresh();
    }
  }

  async function handleComplete(enrollmentId: string) {
    if (!confirm('Mark this course complete and issue a certificate? This cannot be undone.')) return;
    setCompletingId(enrollmentId);
    const res = await fetch(`/api/admin/enrollments/${enrollmentId}/complete`, { method: 'POST' });
    setCompletingId(null);
    if (res.ok) router.refresh();
    else {
      const data = await res.json();
      alert(data.error || 'Could not complete enrollment.');
    }
  }

  async function verifyDocument(docId: string, status: 'VERIFIED' | 'REJECTED') {
    await fetch(`/api/admin/documents/${docId}/verify`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    router.refresh();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">{student.fullName}</h1>
      <p className="mt-1 text-sm text-mist">
        {student.studentCode} • {student.user.email} • {student.mobile || 'No mobile on file'}
      </p>

      {/* Documents */}
      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold">Documents</h2>
        <div className="mt-3 space-y-2">
          {student.documents.length === 0 && <p className="text-sm text-mist">No documents uploaded.</p>}
          {student.documents.map((doc) => (
            <div key={doc.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/8 bg-ink-900 p-3">
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-mist" /> {doc.label}
                <span className="text-xs text-mist">({doc.status})</span>
              </div>
              <div className="flex items-center gap-2">
                <a href={`/api/documents/${doc.id}/download`} target="_blank" rel="noopener noreferrer" className="focus-ring text-mist hover:text-paper">
                  <Download className="h-4 w-4" />
                </a>
                {doc.status === 'PENDING' && (
                  <>
                    <button onClick={() => verifyDocument(doc.id, 'VERIFIED')} className="focus-ring rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">Verify</button>
                    <button onClick={() => verifyDocument(doc.id, 'REJECTED')} className="focus-ring rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold text-red-400">Reject</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enroll in a new course */}
      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold">Enroll in a Course</h2>
        <form onSubmit={handleEnroll} className="mt-3 grid gap-3 rounded-xl border border-white/8 bg-ink-900 p-4 sm:grid-cols-4 sm:items-end">
          <div className="sm:col-span-2">
            <label className={labelClass}>Course</label>
            <select value={enrollForm.sanitySlug} onChange={(e) => selectCourse(e.target.value)} className={inputClass} required>
              <option value="">Select a course…</option>
              {availableCourses.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Total Price (₹)</label>
            <input type="number" min={0} value={enrollForm.totalPrice} onChange={(e) => setEnrollForm((f) => ({ ...f, totalPrice: e.target.value }))} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Discount (₹)</label>
            <input type="number" min={0} value={enrollForm.discount} onChange={(e) => setEnrollForm((f) => ({ ...f, discount: e.target.value }))} className={inputClass} />
          </div>
          <button type="submit" disabled={enrolling} className="focus-ring flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-signal-blue to-signal-violet px-5 py-2.5 text-sm font-semibold shadow-glow sm:col-span-4 disabled:opacity-60">
            {enrolling && <Loader2 className="h-4 w-4 animate-spin" />} Enroll Student
          </button>
        </form>
        {enrollError && <p className="mt-2 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{enrollError}</p>}
      </section>

      {/* Enrollments */}
      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold">Enrollments &amp; Payments</h2>
        <div className="mt-3 space-y-4">
          {student.enrollments.map((e) => {
            const paid = e.payments.filter((p) => p.status === 'PAID').reduce((s, p) => s + p.amount, 0);
            const pending = calculatePending(e.finalPrice, paid);
            const status = paymentStatusLabel(e.finalPrice, paid);
            const form = paymentForms[e.id] || { amount: '', method: 'UPI', referenceId: '' };

            return (
              <div key={e.id} className="rounded-xl border border-white/8 bg-ink-900 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">{e.course.title}</p>
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs">{e.status}</span>
                </div>
                <p className="mt-1 text-xs text-mist">
                  Total ₹{e.finalPrice.toLocaleString('en-IN')} • Paid ₹{paid.toLocaleString('en-IN')} • Pending ₹{pending.toLocaleString('en-IN')} • {status}
                </p>

                {e.certificate ? (
                  <p className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400">
                    <Award className="h-3.5 w-3.5" /> Certificate issued: {e.certificate.certificateNumber}
                  </p>
                ) : (
                  e.status !== 'CANCELLED' && (
                    <button
                      onClick={() => handleComplete(e.id)}
                      disabled={completingId === e.id}
                      className="focus-ring mt-3 flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold hover:bg-white/5 disabled:opacity-60"
                    >
                      {completingId === e.id && <Loader2 className="h-3 w-3 animate-spin" />} Mark Complete &amp; Issue Certificate
                    </button>
                  )
                )}

                <div className="mt-4 flex flex-wrap items-end gap-2 border-t border-white/8 pt-3">
                  <div>
                    <label className={labelClass}>Amount (₹)</label>
                    <input type="number" min={1} value={form.amount} onChange={(ev) => setPaymentForms((f) => ({ ...f, [e.id]: { ...form, amount: ev.target.value } }))} className={`${inputClass} w-28`} />
                  </div>
                  <div>
                    <label className={labelClass}>Method</label>
                    <select value={form.method} onChange={(ev) => setPaymentForms((f) => ({ ...f, [e.id]: { ...form, method: ev.target.value } }))} className={inputClass}>
                      <option value="UPI">UPI</option>
                      <option value="BANK_TRANSFER">Bank Transfer</option>
                      <option value="CARD">Card</option>
                      <option value="CASH">Cash</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Reference / UTR</label>
                    <input value={form.referenceId} onChange={(ev) => setPaymentForms((f) => ({ ...f, [e.id]: { ...form, referenceId: ev.target.value } }))} className={inputClass} />
                  </div>
                  <button
                    onClick={() => handlePayment(e.id)}
                    disabled={payingId === e.id || !form.amount}
                    className="focus-ring flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold hover:bg-white/15 disabled:opacity-50"
                  >
                    {payingId === e.id && <Loader2 className="h-3 w-3 animate-spin" />} Record Payment
                  </button>
                </div>
                <p className="mt-2 text-[11px] text-mist">
                  Only record a payment after confirming it yourself (bank statement / UPI app) — nothing here is marked paid automatically.
                </p>
              </div>
            );
          })}
          {student.enrollments.length === 0 && <p className="text-sm text-mist">Not enrolled in any course yet.</p>}
        </div>
      </section>
    </div>
  );
}
