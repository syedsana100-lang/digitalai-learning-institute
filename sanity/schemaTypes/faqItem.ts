import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'object',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
  ],
  preview: { select: { title: 'question' } },
});

export const faqListField = defineField({
  name: 'faqs',
  title: 'FAQs',
  type: 'array',
  of: [defineArrayMember({ type: 'faqItem' })],
});
