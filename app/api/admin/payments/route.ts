import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/lms/auth-helpers';

const schema = z.object({
  enrollmentId: z.string().min(1),
  amount: z.coerce.number().int().positive(),
  method: z.enum(['UPI', 'BANK_TRANSFER', 'CARD', 'CASH', 'OTHER']),
  referenceId: z.string().max(120).optional(),
  notes: z.string().max(300).optional(),
});

/**
 * Records a payment as PAID. This is a manual admin action only — there is
 * no automatic "mark paid on QR scan/open" path anywhere in this system.
 * The admin is expected to confirm the transaction (bank statement, UPI
 * app, etc.) before recording it here.
 */
export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Invalid input.' }, { status: 400 });
  }
  const { enrollmentId, amount, method, referenceId, notes } = parsed.data;

  const enrollment = await prisma.enrollment.findUnique({ where: { id: enrollmentId } });
  if (!enrollment) return NextResponse.json({ error: 'Enrollment not found.' }, { status: 404 });

  const payment = await prisma.payment.create({
    data: {
      studentId: enrollment.studentId,
      enrollmentId,
      amount,
      method,
      referenceId: referenceId || null,
      notes: notes || null,
      status: 'PAID',
      recordedById: session.user.id,
    },
  });

  return NextResponse.json({ payment });
}
