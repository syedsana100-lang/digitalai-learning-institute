import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireStudentProfile } from '@/lib/lms/auth-helpers';

/**
 * Toggles a single lesson's completion for the requesting student's own
 * enrollment. Completion is always driven by an explicit student action on
 * a specific lesson — never inferred just from opening the course page.
 */
export async function POST(req: Request, { params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  const profile = await requireStudentProfile();
  if (!profile) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const enrollmentId = body?.enrollmentId as string | undefined;
  if (!enrollmentId) return NextResponse.json({ error: 'enrollmentId is required.' }, { status: 400 });

  const enrollment = await prisma.enrollment.findUnique({
    where: { id: enrollmentId },
    include: { course: { include: { modules: { include: { lessons: true } } } }, progress: true },
  });
  if (!enrollment || enrollment.studentId !== profile.id) {
    return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  }

  const lesson = enrollment.course.modules.flatMap((m) => m.lessons).find((l) => l.id === lessonId);
  if (!lesson) return NextResponse.json({ error: 'Lesson not found in this course.' }, { status: 404 });

  const existing = enrollment.progress.find((p) => p.lessonId === lessonId);
  const nowCompleted = !existing?.completed;

  await prisma.lessonProgress.upsert({
    where: { enrollmentId_lessonId: { enrollmentId, lessonId } },
    update: { completed: nowCompleted, completedAt: nowCompleted ? new Date() : null },
    create: { enrollmentId, lessonId, completed: nowCompleted, completedAt: nowCompleted ? new Date() : null },
  });

  // Auto-progress the enrollment to COMPLETED once every lesson is done —
  // this only reflects the enrollment status; it does NOT issue a
  // certificate, which always requires a separate admin action.
  const totalLessons = enrollment.course.modules.reduce((s, m) => s + m.lessons.length, 0);
  const updatedProgress = await prisma.lessonProgress.findMany({ where: { enrollmentId, completed: true } });
  if (totalLessons > 0 && updatedProgress.length >= totalLessons && enrollment.status === 'ACTIVE') {
    await prisma.enrollment.update({ where: { id: enrollmentId }, data: { status: 'COMPLETED', completedAt: new Date() } });
  }

  return NextResponse.json({ completed: nowCompleted });
}
