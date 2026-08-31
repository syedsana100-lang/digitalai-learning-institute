import { prisma } from '@/lib/prisma';
import { getMergedCourses } from '@/sanity/lib/content';
import AdminCoursesPanel from '@/components/lms/AdminCoursesPanel';

export default async function AdminCoursesPage() {
  const [lmsCourses, sanityCourses] = await Promise.all([
    prisma.lmsCourse.findMany({ include: { modules: { include: { lessons: true } } }, orderBy: { createdAt: 'desc' } }),
    getMergedCourses(),
  ]);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Course Content</h1>
      <p className="mt-1 text-sm text-mist">
        Add video modules/lessons here. This is separate from the public course page content (managed in Sanity Studio).
      </p>
      <div className="mt-6">
        <AdminCoursesPanel
          lmsCourses={lmsCourses}
          sanityCourses={sanityCourses.map((c) => ({ slug: c.slug, title: c.title }))}
        />
      </div>
    </div>
  );
}
