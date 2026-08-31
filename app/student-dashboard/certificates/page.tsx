import { Award, Download } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { requireStudentProfile } from '@/lib/lms/auth-helpers';

export default async function CertificatesPage() {
  const profile = await requireStudentProfile();
  if (!profile) return null;

  const certificates = await prisma.certificate.findMany({
    where: { studentId: profile.id },
    orderBy: { issueDate: 'desc' },
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">My Certificates</h1>

      {certificates.length === 0 ? (
        <p className="mt-4 text-sm text-mist">
          No certificates yet — these appear here once you complete a course and it&apos;s confirmed by the institute.
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {certificates.map((c) => (
            <div key={c.id} className="rounded-2xl border border-white/8 bg-ink-900 p-5">
              <Award className="h-6 w-6 text-signal-cyan" />
              <p className="mt-3 font-display text-sm font-semibold">{c.courseTitleSnapshot}</p>
              <p className="mt-1 text-xs text-mist">Certificate No: {c.certificateNumber}</p>
              <p className="text-xs text-mist">Issued {c.issueDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <a
                href={`/api/certificates/${c.id}/pdf`}
                className="focus-ring mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold transition-colors hover:bg-white/5"
              >
                <Download className="h-3.5 w-3.5" /> Download PDF
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
