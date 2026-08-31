import Link from 'next/link';
import { BookOpen, Award, CreditCard, CheckCircle2 } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { requireStudentProfile, calculatePending, paymentStatusLabel } from '@/lib/lms/auth-helpers';

export default async function DashboardOverviewPage() {
  const profile = await requireStudentProfile();
  if (!profile) return null;

  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: profile.id },
    include: { course: true, payments: true, certificate: true },
  });

  const activeCourses = enrollments.filter((e) => e.status === 'ACTIVE').length;
  const completedCourses = enrollments.filter((e) => e.status === 'COMPLETED').length;
  const certificatesCount = enrollments.filter((e) => e.certificate).length;
  const totalPending = enrollments.reduce((sum, e) => {
    const paid = e.payments.filter((p) => p.status === 'PAID').reduce((s, p) => s + p.amount, 0);
    return sum + calculatePending(e.finalPrice, paid);
  }, 0);

  const profileFieldsFilled = [profile.fatherName, profile.qualification, profile.mobile, profile.address].filter(Boolean).length;
  const profileCompletion = Math.round((profileFieldsFilled / 4) * 100);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Welcome back, {profile.fullName.split(' ')[0]}</h1>
      <p className="mt-1 text-sm text-mist">
        Student ID: {profile.studentCode} • Joined {profile.createdAt.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      {profileCompletion < 100 && (
        <div className="mt-4 flex items-center justify-between rounded-xl border border-signal-blue/30 bg-signal-blue/5 px-4 py-3 text-sm">
          <span>Your profile is {profileCompletion}% complete.</span>
          <Link href="/student-dashboard/profile" className="font-semibold text-signal-cyan hover:underline">Complete it →</Link>
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Active Courses', value: activeCourses, icon: BookOpen },
          { label: 'Completed', value: completedCourses, icon: CheckCircle2 },
          { label: 'Certificates', value: certificatesCount, icon: Award },
          { label: 'Pending Amount', value: `₹${totalPending.toLocaleString('en-IN')}`, icon: CreditCard },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/8 bg-ink-900 p-5">
            <s.icon className="h-5 w-5 text-signal-cyan" />
            <p className="mt-3 font-display text-2xl font-bold">{s.value}</p>
            <p className="mt-1 text-xs text-mist">{s.label}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 mb-4 font-display text-lg font-semibold">My Enrollments</h2>
      {enrollments.length === 0 ? (
        <div className="rounded-2xl border border-white/8 bg-ink-900 p-8 text-center text-sm text-mist">
          You&apos;re not enrolled in any course yet.{' '}
          <Link href="/courses" className="font-semibold text-signal-cyan hover:underline">Browse courses →</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {enrollments.map((e) => {
            const paid = e.payments.filter((p) => p.status === 'PAID').reduce((s, p) => s + p.amount, 0);
            const pending = calculatePending(e.finalPrice, paid);
            const status = paymentStatusLabel(e.finalPrice, paid);
            return (
              <div key={e.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/8 bg-ink-900 p-5">
                <div>
                  <p className="font-display text-sm font-semibold">{e.course.title}</p>
                  <p className="mt-1 text-xs text-mist">
                    Enrolled {e.enrollmentDate.toLocaleDateString('en-IN')} • {e.status}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    status === 'Paid' ? 'bg-emerald-500/15 text-emerald-400'
                    : status === 'Partially Paid' ? 'bg-amber-500/15 text-amber-400'
                    : 'bg-red-500/15 text-red-400'
                  }`}>{status}</span>
                  {pending > 0 && <span className="text-mist">Pending: ₹{pending.toLocaleString('en-IN')}</span>}
                  <Link href={`/student-dashboard/courses/${e.id}`} className="font-semibold text-signal-cyan hover:underline">
                    View →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
