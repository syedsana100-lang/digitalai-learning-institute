import { defineType, defineField } from 'sanity';

// Keep in sync with BlogCategory in lib/blog-data.ts.
const categories = [
  'AI', 'Generative AI', 'Data Science', 'Programming', 'Web Development',
  'Digital Marketing', 'SEO', 'Cloud', 'Cyber Security', 'Career', 'Technology',
];

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required().max(100) }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt text' }], validation: (Rule) => Rule.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: categories }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 2, validation: (Rule) => Rule.required().max(220) }),
    defineField({ name: 'author', title: 'Author', type: 'reference', to: [{ type: 'author' }], validation: (Rule) => Rule.required() }),
    defineField({ name: 'publishedDate', title: 'Published Date', type: 'datetime', validation: (Rule) => Rule.required() }),
    defineField({ name: 'updatedDate', title: 'Updated Date', type: 'datetime' }),
    defineField({ name: 'body', title: 'Content', type: 'blockContent', validation: (Rule) => Rule.required() }),
    defineField({ name: 'faqs', title: 'FAQ Section', type: 'array', of: [{ type: 'faqItem' }] }),
    defineField({ name: 'featured', title: 'Show as Featured Post', type: 'boolean', initialValue: false }),
    defineField({ name: 'popular', title: 'Show in Popular Blogs', type: 'boolean', initialValue: false }),
    defineField({ name: 'trending', title: 'Show in Trending Articles', type: 'boolean', initialValue: false }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'featuredImage' },
  },
});
