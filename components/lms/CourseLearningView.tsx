'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Circle, PlayCircle } from 'lucide-react';
import type { Prisma } from '@prisma/client';

type EnrollmentWithCourse = Prisma.EnrollmentGetPayload<{
  include: {
    course: { include: { modules: { include: { lessons: true } } } };
    progress: true;
  };
}>;

export default function CourseLearningView({ enrollment }: { enrollment: EnrollmentWithCourse }) {
  const router = useRouter();
  const allLessons = enrollment.course.modules.flatMap((m) => m.lessons);
  const [activeLessonId, setActiveLessonId] = useState(allLessons[0]?.id ?? null);
  const [progress, setProgress] = useState(
    new Map(enrollment.progress.map((p) => [p.lessonId, p.completed]))
  );
  const [toggling, setToggling] = useState<string | null>(null);

  const activeLesson = allLessons.find((l) => l.id === activeLessonId);
  const completedCount = [...progress.values()].filter(Boolean).length;
  const pct = allLessons.length > 0 ? Math.round((completedCount / allLessons.length) * 100) : 0;

  async function toggleLesson(lessonId: string) {
    setToggling(lessonId);
    const res = await fetch(`/api/lessons/${lessonId}/toggle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enrollmentId: enrollment.id }),
    });
    if (res.ok) {
      const data = await res.json();
      setProgress((prev) => new Map(prev).set(lessonId, data.completed));
      router.refresh();
    }
    setToggling(null);
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">{enrollment.course.title}</h1>
      <div className="mt-3 flex items-center gap-3">
        <div className="h-1.5 w-40 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-signal-blue to-signal-cyan" style={{ width: `${pct}%` }} />
        </div>
        <span className="text-xs text-mist">{pct}% complete</span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr,320px]">
        <div>
          {activeLesson ? (
            <div>
              {activeLesson.videoUrl ? (
                <video
                  key={activeLesson.id}
                  controls
                  className="aspect-video w-full rounded-2xl border border-white/8 bg-black"
                  src={activeLesson.videoUrl}
                />
              ) : (
                <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-white/8 bg-ink-900 text-sm text-mist">
                  Video not uploaded yet for this lesson.
                </div>
              )}
              <h2 className="mt-4 font-display text-lg font-semibold">{activeLesson.title}</h2>
              {activeLesson.description && <p className="mt-1 text-sm text-mist">{activeLesson.description}</p>}
              <button
                onClick={() => toggleLesson(activeLesson.id)}
                disabled={toggling === activeLesson.id}
                className="focus-ring mt-4 flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/5 disabled:opacity-60"
              >
                {progress.get(activeLesson.id) ? (
                  <><CheckCircle2 className="h-4 w-4 text-signal-cyan" /> Marked Complete</>
                ) : (
                  <><Circle className="h-4 w-4" /> Mark as Complete</>
                )}
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/8 bg-ink-900 p-8 text-center text-sm text-mist">
              No lessons have been added to this course yet.
            </div>
          )}
        </div>

        <aside className="space-y-4">
          {enrollment.course.modules.map((mod) => (
            <div key={mod.id} className="rounded-2xl border border-white/8 bg-ink-900 p-4">
              <p className="font-display text-sm font-semibold">{mod.title}</p>
              <ul className="mt-3 space-y-1">
                {mod.lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <button
                      onClick={() => setActiveLessonId(lesson.id)}
                      className={`focus-ring flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs transition-colors ${
                        lesson.id === activeLessonId ? 'bg-white/8 text-paper' : 'text-mist hover:bg-white/5 hover:text-paper'
                      }`}
                    >
                      {progress.get(lesson.id) ? (
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-signal-cyan" />
                      ) : (
                        <PlayCircle className="h-3.5 w-3.5 shrink-0" />
                      )}
                      <span className="truncate">{lesson.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
