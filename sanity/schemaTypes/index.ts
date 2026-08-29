import blockContent from './blockContent';
import seo from './seo';
import faqItem from './faqItem';
import author from './author';
import blogPost from './blogPost';
import blogCategory from './blogCategory';
import course from './course';
import courseCategory from './courseCategory';
import siteFaq from './siteFaq';
import testimonial from './testimonial';
import homepage from './homepage';
import siteSettings from './siteSettings';

export const schemaTypes = [
  // Reusable field types first
  blockContent,
  seo,
  faqItem,
  // Documents
  author,
  blogPost,
  blogCategory,
  course,
  courseCategory,
  siteFaq,
  testimonial,
  homepage,
  siteSettings,
];
