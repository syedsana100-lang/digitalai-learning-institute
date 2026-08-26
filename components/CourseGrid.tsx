'use client';

import { useState } from 'react';
import { categoryMeta, getAllCourses, type Course, type CourseCategory } from '@/lib/courses-data';
import CourseCard from '@/components/CourseCard';
import RevealSection from '@/components/RevealSection';

const tabs: { label: string; value: CourseCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  ...(Object.entries(categoryMeta).map(([value, meta]) => ({ label: meta.label, value: value as CourseCategory }))),
];

export default function CourseGrid({ courses: coursesProp }: { courses?: Course[] } = {}) {
  const [active, setActive] = useState<CourseCategory | 'all'>('all');
  const allCourses = coursesProp ?? getAllCourses();
  const courses = allCourses.filter((c) => active === 'all' || c.category === active);

  return (
    <section className="section-light py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <RevealSection className="mb-10 text-center">
          <h2 className="font-display text-3xl font-extrabold lg:text-4xl">Popular Courses</h2>
        </RevealSection>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {tabs.map((t) => (
            <button
              key={t.value}
              onClick={() => setActive(t.value)}
              className={`focus-ring rounded-full px-4 py-2 text-xs font-semibold transition-all duration-150 active:scale-95 ${
                active === t.value
                  ? 'bg-gradient-to-r from-signal-blue to-signal-violet text-white'
                  : 'border border-[#0B1020]/15 text-[#0B1020]/60 hover:text-[#0B1020]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
