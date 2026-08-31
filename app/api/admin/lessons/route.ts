import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/lms/auth-helpers';

const schema = z.object({
  moduleId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().max(500).optional(),
  videoUrl: z.string().url().optional().or(z.literal('')),
  durationSeconds: z.coerce.number().int().min(0).optional(),
});

/**
 * `videoUrl` is expected to be an external host URL (Cloudflare Stream, Mux,
 * Bunny Stream, or an unlisted YouTube link) — see docs/LMS-SETUP.md. Large
 * video files are never uploaded through or stored in this app/repo.
 */
export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Invalid input.' }, { status: 400 });

  const count = await prisma.courseLesson.count({ where: { moduleId: parsed.data.moduleId } });
  const lesson = await prisma.courseLesson.create({
    data: {
      moduleId: parsed.data.moduleId,
      title: parsed.data.title,
      description: parsed.data.description || null,
      videoUrl: parsed.data.videoUrl || null,
      durationSeconds: parsed.data.durationSeconds ?? null,
      order: count,
    },
  });

  return NextResponse.json({ lesson });
}
