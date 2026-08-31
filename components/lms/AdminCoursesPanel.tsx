'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Loader2, PlayCircle, ChevronDown, ChevronRight } from 'lucide-react';
import type { Prisma } from '@prisma/client';

type LmsCourseWithContent = Prisma.LmsCourseGetPayload<{ include: { modules: { include: { lessons: true } } } }>;

const inputClass = 'focus-ring w-full rounded-lg border border-white/10 bg-ink-950 px-3 py-2 text-sm';

export default function AdminCoursesPanel({
  lmsCourses,
  sanityCourses,
}: {
  lmsCourses: LmsCourseWithContent[];
  sanityCourses: { slug: string; title: string }[];
}) {
  const router = useRouter();
  const [newCourseSlug, setNewCourseSlug] = useState('');
  const [creating, setCreating] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(lmsCourses[0]?.id ?? null);

  const unlinkedCourses = sanityCourses.filter((sc) => !lmsCourses.some((lc) => lc.sanitySlug === sc.slug));

  async function handleAddCourse(e: React.FormEvent) {
    e.preventDefault();
    const course = sanityCourses.find((c) => c.slug === newCourseSlug);
    if (!course) return;
    setCreating(true);
    await fetch('/api/admin/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sanitySlug: course.slug, title: course.title }),
    });
    setCreating(false);
    setNewCourseSlug('');
    router.refresh();
  }

  return (
    <div>
      {unlinkedCourses.length > 0 && (
        <form onSubmit={handleAddCourse} className="mb-6 flex flex-wrap items-end gap-3 rounded-xl border border-white/8 bg-ink-900 p-4">
          <div className="min-w-[220px] flex-1">
            <label className="mb-1 block text-xs font-medium text-mist">Add video content for a course</label>
            <select value={newCourseSlug} onChange={(e) => setNewCourseSlug(e.target.value)} className={inputClass}>
              <option value="">Select a course…</option>
              {unlinkedCourses.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
            </select>
          </div>
          <button type="submit" disabled={!newCourseSlug || creating} className="focus-ring flex items-center gap-2 rounded-full bg-gradient-to-r from-signal-blue to-signal-violet px-5 py-2.5 text-sm font-semibold shadow-glow disabled:opacity-60">
            {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Add
          </button>
        </form>
      )}

      <div className="space-y-3">
        {lmsCourses.map((course) => (
          <div key={course.id} className="rounded-xl border border-white/8 bg-ink-900">
            <button
              onClick={() => setExpanded(expanded === course.id ? null : course.id)}
              className="focus-ring flex w-full items-center justify-between px-4 py-3 text-left"
            >
              <span className="font-semibold">{course.title}</span>
              {expanded === course.id ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            {expanded === course.id && <CourseModules course={course} onChange={() => router.refresh()} />}
          </div>
        ))}
        {lmsCourses.length === 0 && <p className="text-sm text-mist">No courses have video content yet.</p>}
      </div>
    </div>
  );
}

function CourseModules({ course, onChange }: { course: LmsCourseWithContent; onChange: () => void }) {
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [addingModule, setAddingModule] = useState(false);

  async function addModule(e: React.FormEvent) {
    e.preventDefault();
    if (!newModuleTitle.trim()) return;
    setAddingModule(true);
    await fetch('/api/admin/modules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId: course.id, title: newModuleTitle.trim() }),
    });
    setAddingModule(false);
    setNewModuleTitle('');
    onChange();
  }

  return (
    <div className="space-y-3 border-t border-white/8 px-4 py-4">
      {course.modules.map((mod) => (
        <div key={mod.id} className="rounded-lg border border-white/8 bg-ink-950 p-3">
          <p className="text-sm font-medium">{mod.title}</p>
          <ul className="mt-2 space-y-1">
            {mod.lessons.map((lesson) => (
              <li key={lesson.id} className="flex items-center gap-2 text-xs text-mist">
                <PlayCircle className="h-3.5 w-3.5" /> {lesson.title} {!lesson.videoUrl && <span className="text-amber-400">(no video yet)</span>}
              </li>
            ))}
          </ul>
          <AddLessonForm moduleId={mod.id} onAdded={onChange} />
        </div>
      ))}

      <form onSubmit={addModule} className="flex items-end gap-2">
        <div className="flex-1">
          <label className="mb-1 block text-xs font-medium text-mist">New Module Title</label>
          <input value={newModuleTitle} onChange={(e) => setNewModuleTitle(e.target.value)} className={inputClass} placeholder="e.g. Module 1: Introduction" />
        </div>
        <button type="submit" disabled={addingModule} className="focus-ring rounded-full bg-white/10 px-4 py-2 text-xs font-semibold hover:bg-white/15 disabled:opacity-50">
          {addingModule ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Add Module'}
        </button>
      </form>
    </div>
  );
}

function AddLessonForm({ moduleId, onAdded }: { moduleId: string; onAdded: () => void }) {
  const [form, setForm] = useState({ title: '', videoUrl: '', description: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    setError(null);
    const res = await fetch('/api/admin/lessons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moduleId, title: form.title, videoUrl: form.videoUrl, description: form.description }),
    });
    setSaving(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Could not add lesson.');
      return;
    }
    setForm({ title: '', videoUrl: '', description: '' });
    onAdded();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 grid gap-2 border-t border-white/8 pt-3 sm:grid-cols-2">
      <input placeholder="Lesson title" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className={inputClass} />
      <input placeholder="Video URL (Cloudflare Stream / Mux / YouTube unlisted)" value={form.videoUrl} onChange={(e) => setForm((f) => ({ ...f, videoUrl: e.target.value }))} className={inputClass} />
      <input placeholder="Short description (optional)" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className={`${inputClass} sm:col-span-2`} />
      {error && <p className="sm:col-span-2 text-xs text-red-400">{error}</p>}
      <button type="submit" disabled={saving} className="focus-ring justify-self-start rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold hover:bg-white/15 disabled:opacity-50 sm:col-span-2">
        {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Add Lesson'}
      </button>
    </form>
  );
}
