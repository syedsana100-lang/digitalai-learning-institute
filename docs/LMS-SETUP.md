# Student Portal / LMS — Setup Guide

This adds a private student portal (sign-up/sign-in, profile, document
uploads, course videos, payments, certificates) and an admin panel,
completely separate from the public website content in Sanity.

You need three things, all free to start:

1. A Postgres database (Supabase)
2. A Vercel Blob store (for document/certificate storage)
3. (Optional) A Google OAuth Client ID, for "Continue with Google"

---

## 1. Database — Supabase (free)

1. Go to https://supabase.com → **New Project**. Pick any name/region, set a
   database password (save it somewhere).
2. Once the project is ready, go to **Project Settings → Database →
   Connection String** and copy the **URI** under **"Connection pooling"**
   (recommended for serverless — use the "Transaction" mode pooler on port
   6543). It looks like:
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-xxxx.pooler.supabase.com:6543/postgres
   ```
3. Put that in `.env.local` (and later, in Vercel's Environment Variables) as:
   ```
   DATABASE_URL=postgresql://...
   ```
4. Create all the tables from `prisma/schema.prisma`:
   ```bash
   npm install
   npm run db:push
   ```
   This is safe to re-run any time you change the schema — it won't touch
   existing data unless the schema itself changed in a conflicting way.

You now have a real Postgres database. `npm run db:studio` opens a local
GUI to browse/edit the tables directly if you ever need to.

---

## 2. Document Storage — Vercel Blob (free on Hobby)

1. In your Vercel project dashboard → **Storage** tab → **Create Database**
   → **Blob**.
2. Once created, Vercel shows you a `BLOB_READ_WRITE_TOKEN` — copy it.
3. Add it to `.env.local` and to Vercel's Environment Variables:
   ```
   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
   ```

**Important security note:** Vercel Blob doesn't support fully private
files — uploaded documents get an unguessable, randomly-suffixed URL, which
is reasonable but not the same as a true authenticated file store. This app
never exposes that raw URL directly: every document/certificate download
goes through `/api/documents/[id]/download` and
`/api/certificates/[id]/pdf`, which re-check that the requester is the
owning student or an admin on every single request. If you need stronger
guarantees later (e.g. for very sensitive documents), consider migrating to
Cloudflare R2 with signed URLs — the upload/download code is isolated in
`lib/lms/documents.ts` and the two download routes, so swapping the backend
is a contained change.

---

## 3. Auth secret

Generate one secret and add it to both `.env.local` and Vercel:

```bash
openssl rand -base64 32
```

```
AUTH_SECRET=<paste the generated value>
```

Email/password sign-up and sign-in already work with just this + the
database — Google Sign-In (next section) is optional.

---

## 4. Google Sign-In (optional)

1. Go to https://console.cloud.google.com/apis/credentials
2. Create a project (or use an existing one) → **Create Credentials →
   OAuth Client ID** → Application type: **Web application**.
3. Add an **Authorized redirect URI**:
   ```
   https://yourdomain.com/api/auth/callback/google
   ```
   (and `http://localhost:3000/api/auth/callback/google` for local testing)
4. Copy the **Client ID** and **Client Secret** into:
   ```
   GOOGLE_CLIENT_ID=...
   GOOGLE_CLIENT_SECRET=...
   ```

Leave these blank to skip — the "Continue with Google" button simply won't
appear, and email/password sign-up/sign-in is unaffected.

---

## 5. Create your first Admin account

After `DATABASE_URL` is set and `npm run db:push` has been run:

```bash
npm run make-admin -- yourname@digitalai.in "A Strong Password123"
```

This creates (or promotes, if the email already signed up as a student) an
ADMIN account. Sign in at `/signin` with that email/password, then visit
`/admin`.

---

## 6. Course videos

Video files themselves are **never** uploaded into this repo or stored in
the app's own database — only a video *URL* is stored per lesson
(`CourseLesson.videoUrl`). Host the actual video file on one of:

- **Cloudflare Stream** or **Mux** — built for this, gives adaptive
  streaming (auto quality switching), the closest to a "real" LMS video
  experience. Paid, but usage-based and reasonably priced for a small
  catalog.
- **YouTube (Unlisted)** — free, simplest to start with. Not enrollment-
  gated at the video-host level (anyone with the link can watch), but the
  link itself is never shown anywhere on the public site — only inside the
  authenticated `/student-dashboard/courses/[id]` page, which checks the
  student owns that enrollment before rendering it.
- **Bunny Stream** — a cheaper middle ground with real access control
  (signed URLs) if you outgrow YouTube but Mux/Cloudflare feel like
  overkill.

To add a video: sign in as Admin → **Courses** tab → pick a course → add a
Module → add a Lesson with the video's playback URL.

---

## How everything fits together

| Area | Where it lives |
|---|---|
| Public website content (courses, blog, homepage, FAQs) | Sanity CMS — unaffected by any of this |
| Student accounts, profiles, documents, payments, enrollments, certificates | Postgres (this guide) — **never** touches Sanity |
| Uploaded documents & generated certificate PDFs | Vercel Blob |
| Course video files | An external video host you choose (see above) — only the URL is stored here |

## Quick reference: student & admin flows

- **Student signs up** → `/signup` (email/password or Google) → lands on
  `/student-dashboard`.
- **Student uploads documents** → Dashboard → Documents → upload PDF/JPG/PNG
  (max 10 MB) → shows "Pending Review" until an admin verifies it.
- **Admin verifies a document** → `/admin/documents` (or from a student's
  detail page) → Verify / Reject.
- **Admin enrolls a student** → `/admin/students/[id]` → "Enroll in a
  Course" → pick the course, set the fee/discount.
- **Admin records a payment** → same page → "Record Payment" — this is a
  manual step; nothing is ever auto-marked paid (not even from a UPI QR
  scan). Confirm the transaction yourself first (bank statement / UPI app),
  then record it.
- **Pending amount** is always `finalPrice − sum(payments where status =
  PAID)`, calculated live — never stored/duplicated.
- **Admin marks a course complete & issues a certificate** → same page →
  "Mark Complete & Issue Certificate". This is the *only* way a certificate
  is created; nothing issues one automatically.
- **Student downloads their certificate** → Dashboard → Certificates →
  Download PDF.
- **Anyone can verify a certificate** → public page `/verify-certificate` —
  shows only student name, course, certificate number and issue date;
  nothing else.

## Environment variables checklist

Copy `.env.example` to `.env.local` and fill in:

```
DATABASE_URL=              # from Supabase
AUTH_SECRET=                # openssl rand -base64 32
BLOB_READ_WRITE_TOKEN=      # from Vercel Storage tab
GOOGLE_CLIENT_ID=           # optional
GOOGLE_CLIENT_SECRET=       # optional
```

Then set the same variables in **Vercel → Project → Settings →
Environment Variables** before deploying.
