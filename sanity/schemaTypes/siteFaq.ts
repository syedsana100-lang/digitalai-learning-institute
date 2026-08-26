import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteFaq',
  title: 'Site FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
    defineField({
      name: 'topic',
      title: 'Topic',
      type: 'string',
      description: 'Used to group FAQs — e.g. Digital Marketing, Data Science, AI & ML, Cyber Security, Data Analytics, Placement Support, Certification, Duration, Fees, Careers.',
      options: {
        list: [
          'Digital Marketing', 'Data Science', 'AI & Machine Learning', 'Cyber Security',
          'Data Analytics', 'Placement Support', 'Certification', 'Course Duration',
          'Fees', 'Career Opportunities', 'General',
        ],
      },
    }),
    defineField({ name: 'showOnHomepage', title: 'Show on Homepage', type: 'boolean', initialValue: false, description: 'Home page shows a curated subset; the /faq page shows all published FAQs.' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', description: 'Lower numbers show first.' }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: { select: { title: 'question', subtitle: 'topic' } },
});
