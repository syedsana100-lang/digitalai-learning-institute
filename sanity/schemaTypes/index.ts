import blockContent from './blockContent';
import seo from './seo';
import faqItem from './faqItem';
import author from './author';
import blogPost from './blogPost';
import course from './course';
import siteFaq from './siteFaq';

export const schemaTypes = [
  // Reusable field types first
  blockContent,
  seo,
  faqItem,
  // Documents
  author,
  blogPost,
  course,
  siteFaq,
];
