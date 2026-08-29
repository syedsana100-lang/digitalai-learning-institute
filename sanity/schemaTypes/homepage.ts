import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * Singleton document (enforced in sanity/structure.ts). Everything here is
 * optional — the frontend keeps using the existing hardcoded copy in
 * components/Hero.tsx, StatsSection.tsx etc. as a fallback until a field is
 * filled in, so publishing an empty Homepage document changes nothing.
 */
export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'stats', title: 'Stats' },
    { name: 'about', title: 'About' },
    { name: 'why', title: 'Why Choose Us' },
    { name: 'courses', title: 'Courses' },
    { name: 'testimonials', title: 'Testimonials' },
    { name: 'cta', title: 'CTA' },
  ],
  fields: [
    // Hero
    defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'string', group: 'hero' }),
    defineField({ name: 'heroHighlight', title: 'Highlighted Heading Text', type: 'string', group: 'hero' }),
    defineField({ name: 'heroDescription', title: 'Hero Description', type: 'text', rows: 3, group: 'hero' }),
    defineField({ name: 'heroPrimaryCtaText', title: 'Primary CTA Text', type: 'string', group: 'hero' }),
    defineField({ name: 'heroPrimaryCtaLink', title: 'Primary CTA Link', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSecondaryCtaText', title: 'Secondary CTA Text', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSecondaryCtaLink', title: 'Secondary CTA Link', type: 'string', group: 'hero' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', group: 'hero' }),
    defineField({ name: 'heroImageAlt', title: 'Hero Image Alt Text', type: 'string', group: 'hero' }),

    // Stats
    defineField({
      name: 'stats',
      title: 'Trust / Statistics',
      type: 'array',
      group: 'stats',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          fields: [
            { name: 'value', type: 'string', title: 'Value (e.g. "10+", "Online + Offline")' },
            { name: 'label', type: 'string', title: 'Label' },
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        }),
      ],
    }),

    // About
    defineField({ name: 'aboutTitle', title: 'Section Title', type: 'string', group: 'about' }),
    defineField({ name: 'aboutDescription', title: 'Description', type: 'text', rows: 4, group: 'about' }),
    defineField({ name: 'aboutImage', title: 'Image', type: 'image', group: 'about' }),
    defineField({ name: 'aboutImageAlt', title: 'Image Alt Text', type: 'string', group: 'about' }),
    defineField({ name: 'aboutCtaText', title: 'CTA Text', type: 'string', group: 'about' }),
    defineField({ name: 'aboutCtaLink', title: 'CTA Link', type: 'string', group: 'about' }),

    // Why Choose Us
    defineField({
      name: 'whyChooseUs',
      title: 'Why Choose Us — Feature Cards',
      type: 'array',
      group: 'why',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'feature',
          fields: [
            { name: 'icon', type: 'image', title: 'Icon or Image' },
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
          ],
          preview: { select: { title: 'title', subtitle: 'description', media: 'icon' } },
        }),
      ],
    }),

    // Courses section
    defineField({ name: 'coursesSectionTitle', title: 'Section Title', type: 'string', group: 'courses' }),
    defineField({ name: 'coursesSectionDescription', title: 'Section Description', type: 'text', rows: 2, group: 'courses' }),
    defineField({ name: 'coursesToShow', title: 'Number of Courses to Display', type: 'number', group: 'courses' }),
    defineField({
      name: 'featuredCourses',
      title: 'Selected Courses',
      type: 'array',
      group: 'courses',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'course' }] })],
      description: 'Leave empty to show the most recent courses automatically.',
    }),

    // Testimonials
    defineField({
      name: 'featuredTestimonials',
      title: 'Testimonials to Feature on Homepage',
      type: 'array',
      group: 'testimonials',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'testimonial' }] })],
      description: 'Leave empty to show the most recent published testimonials automatically.',
    }),

    // CTA
    defineField({ name: 'ctaHeading', title: 'Heading', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaDescription', title: 'Description', type: 'text', rows: 2, group: 'cta' }),
    defineField({ name: 'ctaBackgroundImage', title: 'Background Image', type: 'image', group: 'cta' }),
    defineField({ name: 'ctaButtonText', title: 'Button Text', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaButtonLink', title: 'Button Link', type: 'string', group: 'cta' }),
  ],
  preview: {
    prepare() {
      return { title: 'Homepage' };
    },
  },
});
