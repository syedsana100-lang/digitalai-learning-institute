import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string', validation: (Rule) => Rule.max(70) }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3, validation: (Rule) => Rule.max(160) }),
    defineField({ name: 'canonicalUrl', title: 'Canonical URL (override)', type: 'url', description: 'Leave empty to use the default page URL.' }),
    defineField({ name: 'ogImage', title: 'Open Graph / Twitter Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'noIndex', title: 'Hide from search engines (noindex)', type: 'boolean', initialValue: false }),
  ],
});
