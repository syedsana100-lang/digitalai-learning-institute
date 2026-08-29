import type { StructureResolver } from 'sanity/structure';

/**
 * Sidebar layout. Homepage and Site Settings are wired as singletons here:
 * clicking them opens the one document directly (no "create new" list),
 * so editors can't accidentally create duplicate Homepage/Site Settings docs.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage')
        .id('homepage')
        .child(S.document().schemaType('homepage').documentId('homepage')),
      S.divider(),
      S.listItem().title('Courses').child(S.documentTypeList('course').title('Courses')),
      S.listItem().title('Course Categories').child(S.documentTypeList('courseCategory').title('Course Categories')),
      S.listItem().title('Blog Posts').child(S.documentTypeList('blogPost').title('Blog Posts')),
      S.listItem().title('Blog Categories').child(S.documentTypeList('blogCategory').title('Blog Categories')),
      S.listItem().title('Authors').child(S.documentTypeList('author').title('Authors')),
      S.listItem().title('Testimonials').child(S.documentTypeList('testimonial').title('Testimonials')),
      S.listItem().title('Site FAQs').child(S.documentTypeList('siteFaq').title('Site FAQs')),
      S.divider(),
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    ]);

/** Document types that should never appear in the global "New document" list. */
export const SINGLETON_TYPES = new Set(['homepage', 'siteSettings']);
