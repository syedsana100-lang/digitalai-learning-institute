import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function AdminStudentsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;

  const students = await prisma.studentProfile.findMany({
    where: q
      ? {
          OR: [
            { fullName: { contains: q, mode: 'insensitive' } },
            { studentCode: { contains: q, mode: 'insensitive' } },
            { mobile: { contains: q, mode: 'insensitive' } },
            { user: { email: { contains: q, mode: 'insensitive' } } },
          ],
        }
      : undefined,
    include: { user: true, enrollments: true },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Students</h1>

      <form className="mt-4">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search by name, student ID, mobile or email…"
          className="focus-ring w-full max-w-md rounded-xl border border-white/10 bg-ink-900 px-4 py-2.5 text-sm"
        />
      </form>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/8">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-wide text-mist">
            <tr>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Mobile</th>
              <th className="px-4 py-3">Courses</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/8">
            {students.map((s) => (
              <tr key={s.id}>
                <td className="px-4 py-3">
                  <p className="font-medium">{s.fullName}</p>
                  <p className="text-xs text-mist">{s.studentCode}</p>
                </td>
                <td className="px-4 py-3 text-mist">{s.user.email}</td>
                <td className="px-4 py-3 text-mist">{s.mobile || '—'}</td>
                <td className="px-4 py-3 text-mist">{s.enrollments.length}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/students/${s.id}`} className="font-semibold text-signal-cyan hover:underline">View →</Link>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-mist">No students found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
