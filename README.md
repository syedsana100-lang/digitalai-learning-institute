# DigitalAI Learning Institute — Project Report

Production-ready Next.js 15 + TypeScript + Tailwind + Framer Motion website.
Verified with a full `next build` — all 28 routes compile, type-check, and statically
generate with zero errors. (The one build environment used to verify this had no internet
access to fonts.googleapis.com, so Google Fonts were swapped for a local stub for that one
test run only — the shipped code uses the real `next/font/google` imports and will fetch
fonts normally the moment you run `npm install && npm run build` with a normal internet
connection.)

## Quick Start

```bash
npm install
cp .env.example .env.local   # fill in real values — see below
npm run dev                  # http://localhost:3000
npm run build && npm run start   # production build
```

## Pages Created (28 routes)

Home, `/courses`, `/courses/[slug]` (4 example courses), `/fees`, `/career-support`,
`/about`, `/instructors`, `/reviews`, `/faq`, `/blog`, `/blog/[slug]` (2 example posts),
`/resources`, `/contact`, `/become-an-instructor`, 5 legal pages, `/sitemap.xml`, `/robots.txt`.

## Components Created

Header (mega-menu, scroll-shrink), MobileMenu, Footer, WhatsAppButton, Hero,
AnimatedHeroVisual (neural-network SVG), StatsSection (animated counters), WhyDigitalAI,
CategoryGrid, CourseCard, CourseGrid (filterable), CurriculumAccordion, FAQAccordion,
TestimonialCarousel, BlogCard, CTASection, CounsellingForm, Breadcrumbs, RevealSection
(scroll-reveal wrapper used throughout), LearningJourney, SkillStack, AnywhereInIndia.

## Course Architecture

All course content lives in `lib/courses-data.ts` as a typed array. Pages under
`/courses/[slug]` render dynamically from this file via `generateStaticParams` — no
per-course page code is needed.

**How to add a new course:** open `lib/courses-data.ts` and append a new object to the
`courses` array following the existing `Course` type (title, curriculum, fees, FAQs, etc).
The course automatically appears in the course grid, category pages, sitemap, and gets its
own detail page at `/courses/your-slug`.

## Fee Architecture

Two layers, both centralized and editable:
- `lib/courses-data.ts` — per-course `fee` / `offerFee` (currently `null`, meaning "fee on
  request" — no real prices were invented)
- `lib/pricing-data.ts` — the three tiered plans (Foundation / Professional / Career Track)
  shown on `/fees`, using `₹XX,XXX` placeholders as instructed

**How to update fees:** edit the `fee` field on a course object, or the `price` field on a
plan in `pricing-data.ts`. No component changes needed.

## Animation System

Framer Motion throughout: page/section scroll-reveal (`RevealSection`), animated hero SVG
with staggered node/line entrance, floating tech tag chips, animated stat counters
(`useInView` + `animate`), smooth accordion expand/collapse (curriculum, FAQ), hover lift +
border-glow on cards, testimonial carousel slide transitions, subtle background gradient
motion on CTA sections. `prefers-reduced-motion` is respected globally via CSS in
`globals.css`.

## SEO Implementation

Per-page `generateMetadata` (unique titles/descriptions, canonical URLs), Next.js
`app/sitemap.ts` and `app/robots.ts` (dynamic, auto-includes every course and blog post),
`EducationalOrganization` schema in the root layout, `Course` schema on course pages,
`Article` schema on blog posts, semantic headings, `Breadcrumbs` component with visible +
structured navigation.

## Analytics Implementation

Hooks are stubbed at the point of action (WhatsApp click, counselling form submit) with
`// analytics hook:` comments — wire these to GA4/GTM/Meta Pixel once you add the real
scripts. All IDs are read from environment variables in `lib/site-config.ts` and are blank
by default; **no fake tracking IDs were inserted**.

## Form Implementation

`CounsellingForm` and the instructor application form both do client-side validation
(required fields, phone/email format) and show a success state on submit. Both have a
clearly marked `// TODO` where you'll wire a real API route or CRM — no backend is
connected yet, as instructed.

## Online-First / Offline-Ready Architecture

`lib/site-config.ts` has an `operationMode` flag (`'online_only'` today).
`lib/future-readiness.ts` defines the full data model for campuses, branches, offline
batch timings, etc. — but the `campuses` array is empty and no component renders it, so
there is no empty "campus" UI on the live site. When you open a physical centre: populate
`campuses`, flip `operationMode`, and build the (not-yet-created) `CampusSection` /
`BranchLocator` components against that existing data shape — no redesign required.

## Why /courses/[slug] Feels Slow the First Time in `npm run dev`

This is normal Next.js dev-server behavior, not a bug. In dev mode, each route
compiles on-demand the first time you visit it (not ahead of time) — a dynamic
route like `/courses/[slug]` with Framer Motion + several client components can
take 20-40 seconds to compile on that very first visit. Every visit after that is
instant, because it's cached. **A real production build has none of this delay** —
verified locally: `/courses/[slug]` is only 3.4kB (148kB total) and every one of
the 33 routes statically pre-generates at build time. To feel the real speed:
```bash
npm run build
npm run start
```
and click around — every page will feel instant, including on first click.

## What Was Added in This Update

- **Cyber Security course** — full course added to `lib/courses-data.ts`; it now
  appears automatically in the homepage category grid, course grid, courses page,
  and has its own page at `/courses/cyber-security` — no manual wiring needed.
- **Homepage pricing section** (`PricingPreview`) — summarizes the 3 plans and
  links to the full `/fees` page.
- **Reviews section on homepage** (`ReviewsSection`) — Google rating badge +
  photo-style student review cards. Ratings/reviews are clearly marked placeholders.
- **Google Map on `/contact`** — shows a general India-wide view today (institute
  is online-only), configurable via `NEXT_PUBLIC_MAP_EMBED_URL` in `.env.local`
  once you have a real office address to embed.
- **Blog overhaul** — added 4 more placeholder posts (6 total), real placeholder
  images via a public placeholder image service (`picsum.photos`, seeded so each
  post keeps a consistent image), plus "Top Blogs" and "Recent Blogs" sections on
  `/blog`.
- **Snappier interactions** — reduced animation durations across header, mobile
  menu, accordions, and scroll-reveals; added `active:scale-95` tap feedback to
  all primary buttons and filter tabs.

## Remaining Placeholders (must fix before launch)

- **Fees:** all `₹XX,XXX` values in `lib/pricing-data.ts` and `fee: null` in
  `lib/courses-data.ts`
- **Contact info:** email, phone, WhatsApp number, business hours in `lib/site-config.ts`
  and `.env.local`
- **Instructors:** real names, photos, bios in `lib/instructors-data.ts`
- **Testimonials:** `/reviews` currently shows clearly-labeled placeholder quotes — replace
  with real, consented reviews
- **Blog posts:** the 2 example posts in `lib/blog-data.ts` are placeholder copy — replace
  with original articles
- **Legal pages:** all 5 pages need legal review and business-specific details filled in
  (marked with `[bracketed placeholders]`)
- **Social links:** empty in `lib/site-config.ts` — add real profile URLs
- **Images:** the site currently uses gradient placeholder blocks instead of real photos/
  illustrations (instructor photos, blog featured images) — drop real images into `/public`
  and swap the placeholder `div`s for `next/image`

## Deployment

The project is a standard Next.js app — deploys as-is to Vercel (recommended,
zero-config), or any Node host / Docker container via `npm run build && npm run start`.
Set the environment variables from `.env.example` in your hosting provider before going
live. `next.config.js` has no special requirements beyond image optimization defaults.

## What's Intentionally Not Built Yet

- Payment gateway integration (architecture is ready — enrollment CTA links to the
  counselling form, per the brief's instruction not to implement real payments without
  credentials)
- CMS connection (data files are structured to make a future Sanity/Strapi/WordPress-
  headless migration straightforward — see `lib/courses-data.ts` types)
- Downloadable resource files on `/resources` (currently "Coming Soon" badges)

## Redesign Update (2026-08-24) — Premium SaaS/EdTech Look

- **Color system rebalanced** to 40% dark navy / 40% off-white / 20% purple-blue
  gradient. New `.section-light` / `.card-light` utility classes in `globals.css`
  alternate with the existing dark sections.
- **Real business info wired in**: phone `+91 9310378799`, WhatsApp, email
  `info@digitalai.in`, and a Noida, UP office address — the site now reflects an
  **online + offline** model (`operationMode: 'online_offline'` in `site-config.ts`,
  Noida campus populated in `future-readiness.ts`).
- **Navbar**: animated underline hover, active-page glow, phone number, "Enroll Now" CTA.
- **Hero**: added trust badges (Industry Experts, Live Projects, Placement Support,
  Lifetime Access) and a WhatsApp CTA.
- **New sections**: Placement Partners (honest empty logo slots — no real
  partnerships confirmed yet), Student Success Stories (placeholder salary/company
  data, clearly marked), upgraded testimonials with designation + glassmorphism cards.
- **Footer**: full rebuild — real contact info, mini Google Map card, newsletter
  form, animated social icons.
- **Contact page**: full rebuild — hero banner, 4 contact cards (Call/WhatsApp/
  Email/Visit), real Noida map, support-process timeline, FAQ section.
- **Single CTA**: homepage now has exactly one final CTA section (WhatsApp / Book
  Counselling / Call Now) — duplicate CTAs removed.
- **Cyber Security course** added — appears automatically across the site via
  the existing data-driven architecture.

### ⚠️ Honesty guardrails kept in this update
Two things the brief asked for were **intentionally not fabricated** and need
real data before they can be filled in:
- **Placement Partners** — no company logos shown; the section has empty,
  clearly-labeled slots until real hiring partnerships exist.
- **Student Success Stories & placement stats** — salary figures, "Xk+ students
  trained" type numbers, and success-story details are all bracketed
  placeholders (e.g. `[Before Role/Salary]`). Replace only with real, consented
  data — publishing invented numbers or outcomes is false advertising risk.

### Still TODO
- Exact street address for the Noida office (currently just "Noida, Uttar Pradesh")
  — once you have it, regenerate the map embed URL from Google Maps directly
  (Maps → Share → Embed a map) for a precise pin, and update `NEXT_PUBLIC_MAP_EMBED_URL`.
- Real hiring partner logos once partnerships are signed.
- Real student success stories and placement percentage once available.

## Blog System Rebuild (2026-08-24) — SEO-First, Production-Ready

The blog is now a full content system, not just a list of cards.

### Listing page (`/blog`)
Featured post hero, Trending, Popular, Latest sections, a searchable +
category-filterable archive with "Load More" pagination, and a **crawlable**
"Browse by Category" link row (real `<a>` tags, not JS-only) so tools like
Screaming Frog can discover every category page.

### Single post page (`/blog/[slug]`)
- Structured content blocks (`ContentBlock[]` in `lib/blog-data.ts`) support
  H2/H3 headings, paragraphs, bulleted/numbered lists, quotes, and code blocks
- Sticky, scroll-spy Table of Contents (desktop) + inline TOC (mobile)
- Reading progress bar
- Auto-calculated reading time
- Social share buttons (LinkedIn, X, Facebook) + copy-link
- Author box (bio, designation, article count, social links) — see `lib/blog-authors-data.ts`
- Related / Popular / Latest article sections (3+ each)
- FAQ section (renders `FAQPage` schema when present)
- **Comments UI** — name/email/comment, nested replies, likes, report button.
  ⚠️ **This is UI-only.** Comments live in React state and vanish on refresh —
  there's no backend wired up. Connect a real API/database before launch;
  do not treat this as functional production commenting yet.

### SEO
- Dynamic per-post meta title/description/canonical via the Metadata API (no
  React Helmet — everything renders server-side, visible in page source)
- Open Graph + Twitter Card meta per post
- `Article`, `FAQPage`, `BreadcrumbList` schema per post; sitewide `EducationalOrganization`
  schema in `app/layout.tsx`
- New crawlable routes: `/blog/category/[category]` (6 pages) and
  `/blog/tag/[tag]` (13 pages) — both statically generated and included in
  `sitemap.xml`
- Breadcrumb navigation (visible + schema) on every blog page

### Crawlability
Verified with a real `npm run build`: **52 routes, all statically pre-rendered**
(no client-only navigation gating any URL). Category and tag pages are real
Next.js routes with real `<a href>` links pointing to them — a crawler like
Screaming Frog will find every one without executing JavaScript.

### Performance
Every blog-related route is small (2–10kB page-specific JS, ~150kB first load
including the framework) and pre-rendered at build time — Core Web Vitals
targets (LCP/CLS/INP) are realistic on this architecture. As with the rest of
the site, verify real numbers with `npm run build && npm run start` plus
Lighthouse, since `npm run dev` is not representative of production speed.
