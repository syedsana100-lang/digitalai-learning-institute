import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/lms/auth-helpers';
import type { Prisma, LeadStatus, LeadSource } from '@prisma/client';

export async function GET(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q')?.trim();
  const status = searchParams.get('status');
  const source = searchParams.get('source');

  const where: Prisma.LeadWhereInput = {};
  if (q) {
    where.OR = [
      { fullName: { contains: q, mode: 'insensitive' } },
      { email: { contains: q, mode: 'insensitive' } },
      { phone: { contains: q, mode: 'insensitive' } },
      { leadCode: { contains: q, mode: 'insensitive' } },
    ];
  }
  if (status) where.status = status as LeadStatus;
  if (source) where.source = source as LeadSource;

  const leads = await prisma.lead.findMany({ where, orderBy: { createdAt: 'desc' }, take: 300 });
  return NextResponse.json({ leads });
}
