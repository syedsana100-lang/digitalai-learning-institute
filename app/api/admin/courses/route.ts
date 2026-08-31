import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/lms/auth-helpers';

const schema = z.object({
  sanitySlug: z.string().min(1),
  title: z.string().min(1),
  totalPrice: z.coerce.number().int().min(0).default(0),
});

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input.' }, { status: 400 });

  const course = await prisma.lmsCourse.upsert({
    where: { sanitySlug: parsed.data.sanitySlug },
    update: {},
    create: parsed.data,
  });

  return NextResponse.json({ course });
}
