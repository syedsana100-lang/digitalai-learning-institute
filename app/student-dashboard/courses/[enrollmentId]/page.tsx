import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { requireStudentProfile } from '@/lib/lms/auth-helpers';
import CourseLearningView from '@/components/lms/CourseLearningView';

export default async function CourseLearningPage({ params }: { params: Promise<{ enrollmentId: string }> }) {
  const { enrollmentId } = await params;
  const profile = await requireStudentProfile();
  if (!profile) return null;

  const enrollment = await prisma.enrollment.findUnique({
    where: { id: enrollmentId },
    include: {
      course: { include: { modules: { orderBy: { order: 'asc' }, include: { lessons: { orderBy: { order: 'asc' } } } } } },
      progress: true,
    },
  });

  // A student can only ever open their own enrollment — this is the access
  // control that keeps video URLs scoped to enrolled students only.
  if (!enrollment || enrollment.studentId !== profile.id) notFound();

  return <CourseLearningView enrollment={enrollment} />;
}
