import { prisma } from '@/lib/prisma';
import { requireStudentProfile, calculatePending, paymentStatusLabel } from '@/lib/lms/auth-helpers';

export default async function PaymentsPage() {
  const profile = await requireStudentProfile();
  if (!profile) return null;

  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: profile.id },
    include: { course: true, payments: { orderBy: { paymentDate: 'desc' } } },
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Payments</h1>

      {enrollments.length === 0 && <p className="mt-4 text-sm text-mist">No enrollments yet.</p>}

      <div className="mt-6 space-y-6">
        {enrollments.map((e) => {
          const paid = e.payments.filter((p) => p.status === 'PAID').reduce((s, p) => s + p.amount, 0);
          const pending = calculatePending(e.finalPrice, paid);
          const status = paymentStatusLabel(e.finalPrice, paid);

          return (
            <div key={e.id} className="rounded-2xl border border-white/8 bg-ink-900 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-display text-sm font-semibold">{e.course.title}</p>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  status === 'Paid' ? 'bg-emerald-500/15 text-emerald-400'
                  : status === 'Partially Paid' ? 'bg-amber-500/15 text-amber-400'
                  : 'bg-red-500/15 text-red-400'
                }`}>{status}</span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
                <div>
                  <p className="font-display font-semibold">₹{e.finalPrice.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-mist">Total Fee</p>
                </div>
                <div>
                  <p className="font-display font-semibold text-emerald-400">₹{paid.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-mist">Paid</p>
                </div>
                <div>
                  <p className="font-display font-semibold text-amber-400">₹{pending.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-mist">Pending</p>
                </div>
              </div>

              {e.payments.length > 0 && (
                <div className="mt-4 divide-y divide-white/8 border-t border-white/8">
                  {e.payments.map((p) => (
                    <div key={p.id} className="flex items-center justify-between py-2.5 text-xs">
                      <span className="text-mist">{new Date(p.paymentDate).toLocaleDateString('en-IN')} • {p.method.replace('_', ' ')}</span>
                      <span>₹{p.amount.toLocaleString('en-IN')}</span>
                      <span className={p.status === 'PAID' ? 'text-emerald-400' : 'text-mist'}>{p.status}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
