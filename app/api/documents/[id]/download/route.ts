import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

/**
 * The only sanctioned way to fetch a student document. Client code and API
 * responses never expose the raw Blob URL directly (see app/api/documents) —
 * every download goes through this route so ownership/role is re-checked
 * server-side on every single access, not just at upload time.
 */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });

  const doc = await prisma.studentDocument.findUnique({
    where: { id },
    include: { student: { select: { userId: true } } },
  });
  if (!doc) return NextResponse.json({ error: 'Not found.' }, { status: 404 });

  const isOwner = doc.student.userId === session.user.id;
  const isAdmin = session.user.role === 'ADMIN';
  if (!isOwner && !isAdmin) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  }

  return NextResponse.redirect(doc.fileUrl);
}
