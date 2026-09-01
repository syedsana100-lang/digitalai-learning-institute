import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { generateLeadCode, detectLeadSource } from '@/lib/leads/helpers';
import { sendLeadNotificationEmail } from '@/lib/leads/email';
import { appendLeadToGoogleSheet } from '@/lib/leads/google-sheets';

const leadSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  phone: z.string().trim().min(7).max(20),
  courseInterested: z.string().trim().max(160).optional().or(z.literal('')),
  message: z.string().trim().max(1000).optional().or(z.literal('')),
  sourcePageUrl: z.string().trim().max(300).optional().or(z.literal('')),
  utmSource: z.string().trim().max(100).optional().or(z.literal('')),
  utmMedium: z.string().trim().max(100).optional().or(z.literal('')),
  utmCampaign: z.string().trim().max(100).optional().or(z.literal('')),
  utmTerm: z.string().trim().max(100).optional().or(z.literal('')),
  utmContent: z.string().trim().max(100).optional().or(z.literal('')),
  // Honeypot — a real visitor never fills this (it's visually hidden on
  // every form). Any non-empty value here means a bot filled every field.
  website: z.string().max(0).optional().or(z.literal('')),
});

// Simple in-memory rate limit — resets on cold start, which is fine here:
// its job is to stop a rapid-fire script from one instance, not to be a
// perfectly durable global limiter. Real abuse is also caught by the
// duplicate-lead check below, which IS durable (backed by the database).
const recentSubmissions = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (recentSubmissions.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  recentSubmissions.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many submissions. Please try again in a minute.' }, { status: 429 });
  }

  const parsed = leadSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Invalid input.' }, { status: 400 });
  }

  const data = parsed.data;

  // Honeypot tripped — pretend success so the bot doesn't learn anything,
  // but never actually create a lead.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  // Duplicate prevention: same email+phone submitted in the last 10 minutes
  // is treated as a double-click/resubmit, not a new lead.
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  const existing = await prisma.lead.findFirst({
    where: { email: data.email.toLowerCase(), phone: data.phone, createdAt: { gte: tenMinutesAgo } },
  });
  if (existing) {
    return NextResponse.json({ ok: true, leadCode: existing.leadCode, duplicate: true });
  }

  const referrer = req.headers.get('referer');
  const leadCode = await generateLeadCode();

  const lead = await prisma.lead.create({
    data: {
      leadCode,
      fullName: data.fullName,
      email: data.email.toLowerCase(),
      phone: data.phone,
      courseInterested: data.courseInterested || null,
      message: data.message || null,
      sourcePageUrl: data.sourcePageUrl || referrer || null,
      ipAddress: ip !== 'unknown' ? ip : null,
      utmSource: data.utmSource || null,
      utmMedium: data.utmMedium || null,
      utmCampaign: data.utmCampaign || null,
      utmTerm: data.utmTerm || null,
      utmContent: data.utmContent || null,
      source: detectLeadSource({ utmSource: data.utmSource, referrer }),
    },
  });

  // Fire-and-forget: the visitor gets an instant response; email + Google
  // Sheets sync happen in the background and never slow down or block the
  // form submission (and a failure in either never fails the lead capture
  // itself, which is already safely committed to Postgres above).
  Promise.all([sendLeadNotificationEmail(lead), appendLeadToGoogleSheet(lead)]).catch(() => {});

  return NextResponse.json({ ok: true, leadCode: lead.leadCode });
}
