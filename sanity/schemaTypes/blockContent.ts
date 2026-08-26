import { defineType, defineArrayMember } from 'sanity';

/**
 * Portable Text body for blog posts — headings, lists, quotes, code and
 * images, matching what the existing ContentBlock renderer already supports
 * on the frontend.
 */
export default defineType({
  name: 'blockContent',
  title: 'Content',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
          { title: 'Underline', value: 'underline' },
          { title: 'Code', value: 'code' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              { name: 'href', type: 'url', title: 'URL' },
              { name: 'newTab', type: 'boolean', title: 'Open in new tab' },
              { name: 'nofollow', type: 'boolean', title: 'No-follow' },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt text', validation: (Rule) => Rule.required() },
        { name: 'caption', type: 'string', title: 'Caption' },
      ],
    }),
    defineArrayMember({
      type: 'object',
      name: 'codeBlock',
      title: 'Code block',
      fields: [
        { name: 'language', type: 'string', title: 'Language' },
        { name: 'code', type: 'text', title: 'Code' },
      ],
    }),
    defineArrayMember({
      type: 'object',
      name: 'youtubeEmbed',
      title: 'YouTube embed',
      fields: [
        { name: 'videoId', type: 'string', title: 'YouTube video ID' },
        { name: 'title', type: 'string', title: 'Title (for accessibility)' },
      ],
    }),
  ],
});
