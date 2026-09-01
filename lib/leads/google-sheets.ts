import type { Lead } from '@prisma/client';

/**
 * Appends a lead to Google Sheets via a Google Apps Script Web App —
 * deliberately not using the Google Sheets API + service account (that
 * needs OAuth credential management). A deployed Apps Script Web App is a
 * single URL that behaves like a normal API endpoint from our side. See
 * docs/LEADS-SETUP.md for the exact script to paste and deploy.
 *
 * Silently no-ops if GOOGLE_SHEETS_WEBHOOK_URL isn't configured — the lead
 * is still saved to Postgres either way.
 */
export async function appendLeadToGoogleSheet(lead: Lead) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        leadCode: lead.leadCode,
        fullName: lead.fullName,
        email: lead.email,
        phone: lead.phone,
        courseInterested: lead.courseInterested || '',
        message: lead.message || '',
        source: lead.source,
        sourcePageUrl: lead.sourcePageUrl || '',
        createdAt: lead.createdAt.toISOString(),
      }),
      // Apps Script webhooks are occasionally slow to cold-start — this is
      // fire-and-forget from the caller's perspective anyway (see api/leads),
      // so a generous timeout here doesn't affect the visitor's page.
      signal: AbortSignal.timeout(10_000),
    });
  } catch (err) {
    console.error('Google Sheets lead sync failed:', err);
  }
}
