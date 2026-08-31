import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getMergedCourses } from '@/sanity/lib/content';
import StudentDetailPanel from '@/components/lms/StudentDetailPanel';

export default async function AdminStudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [student, availableCourses] = await Promise.all([
    prisma.studentProfile.findUnique({
      where: { id },
      include: {
        user: true,
        documents: { orderBy: { uploadedAt: 'desc' } },
        enrollments: {
          include: { course: true, payments: { orderBy: { paymentDate: 'desc' } }, certificate: true },
          orderBy: { enrollmentDate: 'desc' },
        },
      },
    }),
    getMergedCourses(),
  ]);

  if (!student) notFound();

  return (
    <StudentDetailPanel
      student={student}
      availableCourses={availableCourses.map((c) => ({ slug: c.slug, title: c.title, fee: c.fee }))}
    />
  );
}
