import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'courseCategory',
  title: 'Course Category',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Category Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
    defineField({ name: 'image', title: 'Image (optional)', type: 'image', options: { hotspot: true } }),
  ],
  preview: { select: { title: 'title', media: 'image' } },
});
