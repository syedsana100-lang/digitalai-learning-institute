import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/lms/auth-helpers';

const schema = z.object({
  studentId: z.string(),
  sanitySlug: z.string().min(1),
  courseTitle: z.string().min(1),
  totalPrice: z.coerce.number().int().min(0),
  discount: z.coerce.number().int().min(0).default(0),
  courseStartDate: z.string().optional(),
  courseEndDate: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Invalid input.' }, { status: 400 });
  const { studentId, sanitySlug, courseTitle, totalPrice, discount, courseStartDate, courseEndDate } = parsed.data;

  // Reuse the LmsCourse if one already exists for this Sanity course slug
  // (keeps modules/lessons shared across all students enrolled in it),
  // otherwise create it on the fly from the details the admin entered.
  const course = await prisma.lmsCourse.upsert({
    where: { sanitySlug },
    update: {},
    create: { sanitySlug, title: courseTitle, totalPrice },
  });

  const finalPrice = Math.max(0, totalPrice - discount);

  const existing = await prisma.enrollment.findUnique({
    where: { studentId_courseId: { studentId, courseId: course.id } },
  });
  if (existing) {
    return NextResponse.json({ error: 'This student is already enrolled in this course.' }, { status: 409 });
  }

  const enrollment = await prisma.enrollment.create({
    data: {
      studentId,
      courseId: course.id,
      totalPrice,
      discount,
      finalPrice,
      courseStartDate: courseStartDate ? new Date(courseStartDate) : undefined,
      courseEndDate: courseEndDate ? new Date(courseEndDate) : undefined,
    },
  });

  return NextResponse.json({ enrollment });
}
