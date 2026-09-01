import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/lms/auth-helpers';

const schema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'FOLLOW_UP', 'CONVERTED', 'LOST']).optional(),
  notes: z.string().max(2000).optional(),
});

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });

  const { id } = await params;
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input.' }, { status: 400 });

  const lead = await prisma.lead.update({ where: { id }, data: parsed.data });
  return NextResponse.json({ lead });
}
