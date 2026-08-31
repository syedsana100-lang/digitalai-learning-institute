import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const number = searchParams.get('number')?.trim();
  if (!number) return NextResponse.json({ error: 'Certificate number is required.' }, { status: 400 });

  const certificate = await prisma.certificate.findUnique({
    where: { certificateNumber: number },
  });

  if (!certificate) {
    return NextResponse.json({ valid: false });
  }

  // Deliberately minimal — never expose email, phone, address, documents,
  // or anything beyond what's needed to confirm the certificate is genuine.
  return NextResponse.json({
    valid: true,
    studentName: certificate.studentNameSnapshot,
    courseTitle: certificate.courseTitleSnapshot,
    certificateNumber: certificate.certificateNumber,
    issueDate: certificate.issueDate,
  });
}
