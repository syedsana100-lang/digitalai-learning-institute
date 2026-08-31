import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/lms/auth-helpers';
import { generateCertificateNumber } from '@/lib/lms/certificate';

/**
 * Marks an enrollment COMPLETED and issues its certificate in one admin
 * action. This is the only way a certificate is created — there is no
 * automatic issuance path, per the requirement that incomplete students
 * never receive one.
 */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });

  const { id } = await params;
  const enrollment = await prisma.enrollment.findUnique({
    where: { id },
    include: { course: true, student: true, certificate: true },
  });
  if (!enrollment) return NextResponse.json({ error: 'Enrollment not found.' }, { status: 404 });
  if (enrollment.certificate) {
    return NextResponse.json({ error: 'A certificate has already been issued for this enrollment.' }, { status: 409 });
  }

  const certificateNumber = await generateCertificateNumber();

  const [, certificate] = await prisma.$transaction([
    prisma.enrollment.update({
      where: { id },
      data: { status: 'COMPLETED', completedAt: new Date(), markedCompleteBy: session.user.id },
    }),
    prisma.certificate.create({
      data: {
        enrollmentId: id,
        studentId: enrollment.studentId,
        certificateNumber,
        studentNameSnapshot: enrollment.student.fullName,
        courseTitleSnapshot: enrollment.course.title,
      },
    }),
  ]);

  return NextResponse.json({ certificate });
}
