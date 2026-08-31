import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/lms/auth-helpers';

const schema = z.object({ status: z.enum(['ACTIVE', 'CANCELLED', 'SUSPENDED']) });

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });

  const { id } = await params;
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid status.' }, { status: 400 });

  const enrollment = await prisma.enrollment.update({ where: { id }, data: { status: parsed.data.status } });
  return NextResponse.json({ enrollment });
}
