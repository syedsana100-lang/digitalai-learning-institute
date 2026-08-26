import { defineType, defineField, defineArrayMember } from 'sanity';

// Keep in sync with CourseCategory / categoryMeta in lib/courses-data.ts.
const categories = [
  { title: 'AI & Data', value: 'ai-data' },
  { title: 'Programming', value: 'programming' },
  { title: 'Development', value: 'development' },
  { title: 'Digital Marketing', value: 'digital-marketing' },
  { title: 'Cloud & Security', value: 'cloud-security' },
  { title: 'Design', value: 'design' },
];

const curriculumModule = defineArrayMember({
  type: 'object',
  name: 'curriculumModule',
  title: 'Module',
  fields: [
    { name: 'title', type: 'string', title: 'Module Title' },
    { name: 'summary', type: 'text', title: 'Summary', rows: 2 },
    { name: 'lessons', type: 'number', title: 'Number of Lessons' },
    { name: 'durationLabel', type: 'string', title: 'Duration Label', description: 'e.g. "2 weeks"' },
    { name: 'topics', type: 'array', title: 'Topics', of: [{ type: 'string' }] },
  ],
  preview: { select: { title: 'title', subtitle: 'durationLabel' } },
});

export default defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Course Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'URL Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: categories }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'heroImage', title: 'Hero Section Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'shortDescription', title: 'Short Description', type: 'text', rows: 2, validation: (Rule) => Rule.required().max(200) }),
    defineField({ name: 'overview', title: 'Overview', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: 'durationLabel', title: 'Duration Label', type: 'string', description: 'e.g. "16 weeks"' }),
    defineField({ name: 'level', title: 'Level', type: 'string', options: { list: ['Beginner', 'Intermediate', 'Advanced'] } }),
    defineField({ name: 'deliveryLabel', title: 'Delivery Label', type: 'string', description: 'e.g. "Live Online + Recorded"' }),
    defineField({ name: 'fee', title: 'Fee (INR)', type: 'number', description: 'Leave empty to show "Contact for fee" — never invent a real price.' }),
    defineField({ name: 'offerFee', title: 'Offer Fee (INR)', type: 'number' }),
    defineField({ name: 'technologies', title: 'Tools / Technologies Covered', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({ name: 'learningOutcomes', title: 'Skills You Will Learn', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'eligibility', title: 'Eligibility', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'curriculum', title: 'Curriculum', type: 'array', of: [curriculumModule] }),
    defineField({ name: 'projects', title: 'Projects', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'instructorName', title: 'Instructor Name', type: 'string' }),
    defineField({ name: 'faqs', title: 'FAQs', type: 'array', of: [{ type: 'faqItem' }] }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'heroImage' },
  },
});
