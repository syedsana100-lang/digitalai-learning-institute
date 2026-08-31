import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/lms/auth-helpers';

const schema = z.object({ courseId: z.string().min(1), title: z.string().min(1) });

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input.' }, { status: 400 });

  const count = await prisma.courseModule.count({ where: { courseId: parsed.data.courseId } });
  const module = await prisma.courseModule.create({
    data: { courseId: parsed.data.courseId, title: parsed.data.title, order: count },
  });

  return NextResponse.json({ module });
}
