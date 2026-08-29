import { buildMetadata } from '@/lib/seo';
import CourseGrid from '@/components/CourseGrid';
import RevealSection from '@/components/RevealSection';
import { getMergedCourses } from '@/sanity/lib/content';

export const metadata = buildMetadata({
  title: 'Online Courses',
  description:
    'Explore online technical and digital courses in AI, Data Science, Programming, Development, Digital Marketing, Cloud & Security and Design — open to students across India.',
  path: '/courses',
});

export default async function CoursesPage() {
  const courses = await getMergedCourses();
  return (
    <div className="pt-16">
      <RevealSection className="mx-auto max-w-3xl px-5 text-center lg:px-8">
        <h1 className="font-display text-4xl font-extrabold lg:text-5xl">Online Courses</h1>
        <p className="mt-4 text-mist leading-relaxed">
          Practical, career-focused online programs — learn from anywhere in India.
        </p>
      </RevealSection>
      <CourseGrid courses={courses} />
    </div>
  );
}
