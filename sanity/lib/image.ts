import createImageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from './client';

const builder = client ? createImageUrlBuilder(client) : null;

/** Returns a Sanity CDN image URL builder, or null if Sanity isn't configured. */
export function urlFor(source: SanityImageSource) {
  if (!builder) return null;
  return builder.image(source);
}
