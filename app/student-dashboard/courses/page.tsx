import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { requireStudentProfile } from '@/lib/lms/auth-helpers';

export default async function MyCoursesPage() {
  const profile = await requireStudentProfile();
  if (!profile) return null;

  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: profile.id },
    include: { course: { include: { modules: { include: { lessons: true } } } }, progress: true },
    orderBy: { enrollmentDate: 'desc' },
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">My Courses</h1>
      {enrollments.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-white/8 bg-ink-900 p-8 text-center text-sm text-mist">
          You&apos;re not enrolled in any course yet.{' '}
          <Link href="/courses" className="font-semibold text-signal-cyan hover:underline">Browse courses →</Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {enrollments.map((e) => {
            const totalLessons = e.course.modules.reduce((s, m) => s + m.lessons.length, 0);
            const completedLessons = e.progress.filter((p) => p.completed).length;
            const pct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
            return (
              <Link
                key={e.id}
                href={`/student-dashboard/courses/${e.id}`}
                className="focus-ring block rounded-2xl border border-white/8 bg-ink-900 p-5 transition-colors hover:border-signal-blue/40"
              >
                <p className="font-display text-sm font-semibold">{e.course.title}</p>
                <p className="mt-1 text-xs text-mist">{e.status}</p>
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-signal-blue to-signal-cyan" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-1.5 text-xs text-mist">Course Progress: {pct}%</p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
