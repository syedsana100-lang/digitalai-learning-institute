# Lead Management — Setup Guide

Every form on the site (currently the Contact/Counselling form; follow the
same pattern to wire up any future form) posts to `/api/leads`, which:

1. Validates input, checks a honeypot field, and rate-limits (max 5/min per IP)
2. Prevents duplicate submissions (same email+phone within 10 minutes)
3. Saves the lead to Postgres immediately
4. In the background (never blocking the visitor's page): emails you and
   appends a row to Google Sheets

Both the email and Google Sheets steps are **optional** — leads are always
saved to the database regardless of whether either is configured.

---

## 1. Email notifications (Resend)

1. Go to https://resend.com → sign up (free tier: 3,000 emails/month,
   100/day).
2. **API Keys** → Create API Key → copy it.
3. **Domains** → add `digitalailearning.in` and follow the DNS verification
   steps shown (adds a couple of DNS records — same place you added the
   Vercel A/CNAME records). Verification can take a few minutes to a few
   hours.
4. Add to Vercel Environment Variables:
   ```
   RESEND_API_KEY=re_...
   LEAD_NOTIFICATION_EMAIL=syedsana100@gmail.com
   LEAD_NOTIFICATION_FROM=DigitalAI Learning Leads <leads@digitalailearning.in>
   ```
   (`LEAD_NOTIFICATION_FROM` must use your verified domain — Resend rejects
   sending "from" a domain you haven't verified.)

Until the domain is verified, you can still test with Resend's default
`onboarding@resend.dev` sender — set `LEAD_NOTIFICATION_FROM=DigitalAI
Learning Leads <onboarding@resend.dev>` temporarily.

---

## 2. Google Sheets sync (Apps Script — no service account needed)

1. Create a new Google Sheet. Add a header row: `Lead ID | Name | Email |
   Phone | Course | Message | Source | Page URL | Date`.
2. In the sheet, go to **Extensions → Apps Script**.
3. Delete the default code and paste this:

   ```javascript
   function doPost(e) {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     const data = JSON.parse(e.postData.contents);
     sheet.appendRow([
       data.leadCode,
       data.fullName,
       data.email,
       data.phone,
       data.courseInterested,
       data.message,
       data.source,
       data.sourcePageUrl,
       data.createdAt,
     ]);
     return ContentService.createTextOutput(JSON.stringify({ ok: true }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

4. Click **Deploy → New deployment** → gear icon → **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**, authorize when prompted.
5. Copy the **Web app URL** it gives you (ends in `/exec`).
6. Add to Vercel Environment Variables:
   ```
   GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/xxx/exec
   ```

If you ever edit the script, you must **create a new deployment version**
(Deploy → Manage deployments → edit → new version) for changes to take
effect — the URL itself stays the same.

---

## 3. Redeploy

After adding any of the above env vars, redeploy on Vercel for them to take
effect.

---

## Admin: viewing and managing leads

Sign in as Admin → **Leads** tab (`/admin/leads`):

- Search by name, email, phone, or Lead ID
- Filter by status
- Change a lead's status inline: New → Contacted → Follow Up → Converted /
  Lost
- **Export CSV** button downloads all leads
- Dashboard cards at the top show Total Leads, Today's Leads, This Month,
  and Conversion Rate (converted ÷ total)

## Adding lead capture to another form

Any new form should `POST` to `/api/leads` with this JSON body (all fields
except `fullName`, `email`, `phone` are optional):

```json
{
  "fullName": "...",
  "email": "...",
  "phone": "...",
  "courseInterested": "...",
  "message": "...",
  "sourcePageUrl": "window.location.href",
  "utmSource": "from ?utm_source= if present",
  "website": "" // honeypot — must always be an empty hidden field
}
```

See `components/CounsellingForm.tsx` for a complete working example
(validation, honeypot field, UTM capture, error handling).
