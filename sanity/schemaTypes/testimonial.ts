import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'studentName', title: 'Student Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'studentPhoto', title: 'Student Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'city', title: 'City', type: 'string' }),
    defineField({ name: 'course', title: 'Course', type: 'string' }),
    defineField({ name: 'review', title: 'Review', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: 'rating', title: 'Rating (1-5)', type: 'number', validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: 'designation', title: 'Company / Designation (optional)', type: 'string' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
    defineField({ name: 'published', title: 'Published', type: 'boolean', initialValue: true }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'studentName', subtitle: 'course', media: 'studentPhoto' } },
});
