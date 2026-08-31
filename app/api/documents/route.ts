import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireStudentProfile } from '@/lib/lms/auth-helpers';
import { validateDocumentFile } from '@/lib/lms/documents';

const documentTypeSchema = z.enum(['GOVERNMENT_ID', 'EDUCATIONAL_CERTIFICATE', 'QUALIFICATION_DOCUMENT', 'OTHER']);

export async function GET() {
  const profile = await requireStudentProfile();
  if (!profile) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });

  const documents = await prisma.studentDocument.findMany({
    where: { studentId: profile.id },
    orderBy: { uploadedAt: 'desc' },
  });
  return NextResponse.json({ documents });
}

export async function POST(req: Request) {
  const profile = await requireStudentProfile();
  if (!profile) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'Document storage is not configured yet. Set BLOB_READ_WRITE_TOKEN — see docs/LMS-SETUP.md.' },
      { status: 503 }
    );
  }

  const formData = await req.formData().catch(() => null);
  const file = formData?.get('file');
  const typeRaw = formData?.get('type');
  const label = formData?.get('label');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
  }
  const typeParsed = documentTypeSchema.safeParse(typeRaw);
  if (!typeParsed.success) {
    return NextResponse.json({ error: 'Invalid document type.' }, { status: 400 });
  }

  const validationError = validateDocumentFile({ type: file.type, size: file.size });
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  // A random, unguessable pathname — this is not a substitute for real
  // access control (see /api/documents/[id]/download, which is the only
  // sanctioned way to fetch the file back), but it means the blob URL
  // itself is never predictable or enumerable.
  const blob = await put(`student-documents/${profile.id}/${Date.now()}-${file.name}`, file, {
    access: 'public',
    addRandomSuffix: true,
  });

  const doc = await prisma.studentDocument.create({
    data: {
      studentId: profile.id,
      type: typeParsed.data,
      label: typeof label === 'string' && label.trim() ? label.trim() : file.name,
      fileUrl: blob.url,
      fileName: file.name,
      fileSize: file.size,
    },
  });

  return NextResponse.json({ document: doc });
}
