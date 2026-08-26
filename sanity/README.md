# Sanity CMS Setup

This project ships with a full Sanity CMS layer already wired in — but it runs
entirely on the existing static content in `lib/` until you connect a real
Sanity project. Nothing breaks if you never do this; it's purely additive.

## What's already built

- **Schemas** (`sanity/schemaTypes/`): `Blog Post`, `Course`, `Site FAQ`,
  `Author`, plus reusable `SEO` and `FAQ Item` field types.
- **Embedded admin panel** at `/studio` (`sanity.config.ts` +
  `app/studio/[[...tool]]/page.tsx`) — no separate deployment needed, it's
  part of this Next.js app.
- **Content merge layer** (`sanity/lib/content.ts`): every page that reads
  blog posts, courses, or FAQs asks for the *merged* list — Sanity content
  first, then any static entries from `lib/` that don't share a slug/question
  with something in Sanity. If Sanity isn't configured, or a fetch fails for
  any reason, you silently get the static list only — the site never breaks
  because of the CMS.

## 1. Create a Sanity project

1. Go to [sanity.io](https://www.sanity.io/) and create a free account.
2. Create a new project (any name). Note the **Project ID** it gives you.
3. Create a dataset named `production` (the default).

## 2. Set environment variables

In `.env.local` (and in your Vercel project's Environment Variables):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
```

Redeploy (or restart `npm run dev`). The `/studio` route will now show the
real Sanity Studio instead of the "not connected" message.

## 3. Log in and add content

1. Visit `yourdomain.com/studio` (or `localhost:3000/studio` locally).
2. Sign in with the same account you used to create the Sanity project.
3. The left sidebar has four sections: **Blog Posts**, **Courses**, **Site
   FAQs**, **Authors**.

### Creating a blog post

1. Go to **Authors** first and create at least one author (name, bio,
   avatar) — every blog post needs one.
2. Go to **Blog Posts** → **Create** → **Blog Post**.
3. Fill in: Title (the slug auto-generates from it — click "Generate"),
   Featured Image, Category, Tags, Excerpt, Author, Published Date.
4. Write the article in the **Content** field — this is a rich text editor
   with headings (H2–H4), bold/italic/underline, bullet/numbered lists,
   quotes, links, images, code blocks and YouTube embeds.
5. Optionally add an **FAQ Section** (question/answer pairs — these render
   under the article and also generate FAQPage schema automatically).
6. Fill in **SEO** (meta title, meta description, canonical override, OG
   image) — if left blank, the site falls back to the title/excerpt.
7. Toggle **Featured / Popular / Trending** if you want it to appear in
   those homepage/blog-listing sections.
8. Click **Publish**. The post appears at `/blog/your-slug` on the next
   deploy (or immediately in dev).

### Creating a course page

1. Go to **Courses** → **Create** → **Course**.
2. Fill in Title, Category, Short Description, Overview, Duration, Level,
   Delivery Label, Fee (leave blank to show "Contact for fee" — never
   invent a real price), Technologies, Learning Outcomes, Eligibility.
3. Build the **Curriculum** as a list of modules (title, summary, lesson
   count, duration, topics).
4. Add **FAQs** and **SEO** the same way as blog posts.
5. Publish. It appears at `/courses/your-slug`.

**Note:** the `Instructor Name` field on a CMS course is a plain text field,
not linked to the existing `lib/instructors-data.ts` instructor bios/photos
— those are still managed in code. If you want full instructor profiles for
CMS-authored courses, that would need its own Sanity document type; it
wasn't in scope here.

### Managing FAQs (homepage + /faq page)

1. Go to **Site FAQs** → **Create** → **Site FAQ**.
2. Fill in Question, Answer, Topic (for grouping), and Display Order.
3. Toggle **Show on Homepage** for the ~6 FAQs you want in the homepage
   widget — the `/faq` page always shows all published FAQs.
4. Once you publish your first Site FAQ, it takes priority: any static FAQ
   in `lib/faq-data.ts` with the exact same question text is hidden so you
   don't get duplicates; unmatched static FAQs still show underneath.

## 4. Deployment (Vercel)

This is a standard Next.js 15 App Router project — deploy it to Vercel the
usual way (`vercel` CLI or connect the GitHub repo in the Vercel dashboard).

Required environment variables in your Vercel project settings:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION` (optional, defaults to `2025-01-01`)
- Everything already listed in `.env.example` (site URL, contact info, GTM,
  etc.)

The `/studio` route ships as part of the same Next.js deployment — nothing
extra to configure or host separately. CORS: in your Sanity project
dashboard → API → CORS Origins, add your production domain (and
`http://localhost:3000` for local dev) so the Studio can read/write data
from those origins.

## 5. Known limitations (by design, to keep this change additive)

- Reads are **published-only** — there's no live preview of drafts on the
  site. Adding that (`next-sanity/live` + a preview route) is a reasonable
  follow-up but wasn't required here.
- Blog card bylines (`components/BlogCard.tsx`,
  `components/FeaturedPostCard.tsx`) still resolve the author from the
  static `lib/blog-authors-data.ts` list only, so a CMS post by a
  CMS-only author shows the default "DigitalAI Team" byline on *cards*
  (the full post page itself resolves the real CMS author correctly).
  Fixing this fully would mean passing the merged author list through
  several more components — a larger change than the "only make the
  required changes" instruction called for.
- The Portable Text → `ContentBlock` conversion
  (`sanity/lib/transform.ts`) supports the same block types the existing
  renderer already supports (H2–H4, paragraphs, lists, quotes, code,
  images, YouTube), but not custom Sanity block types beyond that set.
