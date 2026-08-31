import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { renderCertificatePdf } from '@/lib/lms/certificate';
import { siteConfig } from '@/lib/site-config';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });

  const certificate = await prisma.certificate.findUnique({
    where: { id },
    include: { student: { select: { userId: true } } },
  });
  if (!certificate) return NextResponse.json({ error: 'Not found.' }, { status: 404 });

  const isOwner = certificate.student.userId === session.user.id;
  const isAdmin = session.user.role === 'ADMIN';
  if (!isOwner && !isAdmin) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });

  const pdfBytes = await renderCertificatePdf({
    studentName: certificate.studentNameSnapshot,
    courseTitle: certificate.courseTitleSnapshot,
    certificateNumber: certificate.certificateNumber,
    issueDate: certificate.issueDate,
    instituteName: siteConfig.brand.name,
  });

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${certificate.certificateNumber}.pdf"`,
    },
  });
}
