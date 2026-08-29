import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * Singleton document (enforced in sanity/structure.ts, not by the schema
 * type itself — Sanity has no native "singleton" flag). Controls branding,
 * contact info, social links, header nav and footer content site-wide.
 * Every field is optional: when empty, the frontend falls back to
 * lib/site-config.ts so the site never breaks because a field is unset.
 */
export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'branding', title: 'Branding' },
    { name: 'contact', title: 'Contact' },
    { name: 'social', title: 'Social Media' },
    { name: 'header', title: 'Header' },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    defineField({ name: 'siteName', title: 'Site Name', type: 'string', group: 'branding' }),
    defineField({ name: 'logo', title: 'Main Logo', type: 'image', group: 'branding' }),
    defineField({ name: 'mobileLogo', title: 'Mobile Logo (optional)', type: 'image', group: 'branding' }),
    defineField({ name: 'footerLogo', title: 'Footer Logo', type: 'image', group: 'branding' }),
    defineField({ name: 'favicon', title: 'Favicon', type: 'image', group: 'branding' }),

    defineField({ name: 'email', title: 'Primary Email', type: 'string', group: 'contact' }),
    defineField({ name: 'secondaryEmail', title: 'Secondary Email (optional)', type: 'string', group: 'contact' }),
    defineField({ name: 'phone', title: 'Phone Number', type: 'string', group: 'contact' }),
    defineField({ name: 'whatsappNumber', title: 'WhatsApp Number (E.164, no +/spaces)', type: 'string', group: 'contact' }),
    defineField({ name: 'address', title: 'Address', type: 'text', rows: 2, group: 'contact' }),
    defineField({ name: 'businessHours', title: 'Business Hours', type: 'string', group: 'contact' }),

    defineField({ name: 'facebook', title: 'Facebook URL', type: 'url', group: 'social' }),
    defineField({ name: 'instagram', title: 'Instagram URL', type: 'url', group: 'social' }),
    defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url', group: 'social' }),
    defineField({ name: 'youtube', title: 'YouTube URL', type: 'url', group: 'social' }),
    defineField({ name: 'twitter', title: 'X / Twitter URL (optional)', type: 'url', group: 'social' }),

    defineField({
      name: 'navLinks',
      title: 'Header Navigation Menu',
      type: 'array',
      group: 'header',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navLink',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'href', type: 'string', title: 'Link (internal path or full URL)' },
            { name: 'order', type: 'number', title: 'Order' },
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        }),
      ],
    }),
    defineField({ name: 'headerCtaText', title: 'Header CTA Button Text', type: 'string', group: 'header' }),
    defineField({ name: 'headerCtaLink', title: 'Header CTA Button Link', type: 'string', group: 'header' }),

    defineField({ name: 'footerDescription', title: 'Footer Description', type: 'text', rows: 3, group: 'footer' }),
    defineField({
      name: 'footerQuickLinks',
      title: 'Footer Quick Links',
      type: 'array',
      group: 'footer',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerLink',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'href', type: 'string', title: 'Link' },
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        }),
      ],
    }),
    defineField({ name: 'copyrightText', title: 'Copyright Text', type: 'string', group: 'footer' }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' };
    },
  },
});
