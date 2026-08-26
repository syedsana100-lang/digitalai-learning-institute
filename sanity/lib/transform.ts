import type { ContentBlock } from '@/lib/blog-data';
import { slugifyHeading } from '@/lib/blog-data';
import { urlFor } from './image';

// Minimal shape of a Sanity Portable Text block/span — avoids pulling in the
// full @portabletext/types package for this one-way, one-purpose transform.
interface PortableSpan { text?: string; marks?: string[] }
interface PortableBlock {
  _type: string;
  style?: string;
  listItem?: 'bullet' | 'number';
  children?: PortableSpan[];
  // custom object block types (see sanity/schemaTypes/blockContent.ts)
  asset?: unknown;
  alt?: string;
  caption?: string;
  language?: string;
  code?: string;
  videoId?: string;
  title?: string;
}

function plainText(block: PortableBlock): string {
  return (block.children || []).map((c) => c.text || '').join('');
}

/** Best-effort conversion of Sanity's Portable Text into the site's ContentBlock[] format. */
export function portableTextToContentBlocks(body: PortableBlock[] | undefined): ContentBlock[] {
  if (!Array.isArray(body)) return [];

  const blocks: ContentBlock[] = [];
  let listBuffer: { style: 'ul' | 'ol'; items: string[] } | null = null;

  const flushList = () => {
    if (listBuffer) {
      blocks.push({ type: listBuffer.style, items: listBuffer.items });
      listBuffer = null;
    }
  };

  for (const block of body) {
    if (block._type === 'block') {
      if (block.listItem) {
        const style = block.listItem === 'number' ? 'ol' : 'ul';
        if (!listBuffer || listBuffer.style !== style) {
          flushList();
          listBuffer = { style, items: [] };
        }
        listBuffer.items.push(plainText(block));
        continue;
      }
      flushList();

      const text = plainText(block);
      if (!text.trim()) continue;

      switch (block.style) {
        case 'h2':
          blocks.push({ type: 'h2', text, id: slugifyHeading(text) });
          break;
        case 'h3':
          blocks.push({ type: 'h3', text, id: slugifyHeading(text) });
          break;
        case 'h4':
          // No H4 case in the existing renderer — render as H3 rather than dropping the heading.
          blocks.push({ type: 'h3', text, id: slugifyHeading(text) });
          break;
        case 'blockquote':
          blocks.push({ type: 'quote', text });
          break;
        default:
          blocks.push({ type: 'p', text });
      }
    } else if (block._type === 'image') {
      flushList();
      const built = urlFor(block as never);
      const src = built ? built.width(1200).url() : '';
      if (src) blocks.push({ type: 'image', src, alt: block.alt || '', caption: block.caption });
    } else if (block._type === 'codeBlock') {
      flushList();
      blocks.push({ type: 'code', text: block.code || '', language: block.language });
    } else if (block._type === 'youtubeEmbed') {
      flushList();
      if (block.videoId) blocks.push({ type: 'youtube', videoId: block.videoId, title: block.title || 'Embedded video' });
    }
  }
  flushList();

  return blocks;
}
