import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/lms/auth-helpers';

const schema = z.object({ status: z.enum(['VERIFIED', 'REJECTED']) });

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });

  const { id } = await params;
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid status.' }, { status: 400 });

  const doc = await prisma.studentDocument.update({
    where: { id },
    data: { status: parsed.data.status, verifiedAt: new Date(), verifiedById: session.user.id },
  });

  return NextResponse.json({ document: doc });
}
