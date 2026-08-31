import Link from 'next/link';
import { Users, FileText, CreditCard, Award } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export default async function AdminOverviewPage() {
  const [studentCount, pendingDocs, activeEnrollments, certificatesIssued] = await Promise.all([
    prisma.studentProfile.count(),
    prisma.studentDocument.count({ where: { status: 'PENDING' } }),
    prisma.enrollment.count({ where: { status: 'ACTIVE' } }),
    prisma.certificate.count(),
  ]);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Admin Overview</h1>
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Total Students', value: studentCount, icon: Users, href: '/admin/students' },
          { label: 'Documents Pending Review', value: pendingDocs, icon: FileText, href: '/admin/documents' },
          { label: 'Active Enrollments', value: activeEnrollments, icon: CreditCard, href: '/admin/students' },
          { label: 'Certificates Issued', value: certificatesIssued, icon: Award, href: '/admin/students' },
        ].map((s) => (
          <Link key={s.label} href={s.href} className="focus-ring rounded-2xl border border-white/8 bg-ink-900 p-5 transition-colors hover:border-signal-blue/40">
            <s.icon className="h-5 w-5 text-signal-cyan" />
            <p className="mt-3 font-display text-2xl font-bold">{s.value}</p>
            <p className="mt-1 text-xs text-mist">{s.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
