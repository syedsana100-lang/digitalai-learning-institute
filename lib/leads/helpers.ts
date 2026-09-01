import { prisma } from '@/lib/prisma';
import type { LeadSource } from '@prisma/client';

export async function generateLeadCode(): Promise<string> {
  const year = new Date().getFullYear();
  const count = await prisma.lead.count();
  return `LEAD-${year}-${String(count + 1).padStart(6, '0')}`;
}

/**
 * Best-effort source classification from UTM params / referrer. This is
 * intentionally simple heuristics, not a full attribution engine — good
 * enough for the "where did this lead come from" dashboard breakdown.
 */
export function detectLeadSource(params: {
  utmSource?: string | null;
  referrer?: string | null;
}): LeadSource {
  const utm = params.utmSource?.toLowerCase() || '';
  const ref = params.referrer?.toLowerCase() || '';

  if (utm.includes('google') || ref.includes('google') && utm.includes('cpc')) return 'GOOGLE_ADS';
  if (utm.includes('facebook') || utm.includes('fb') || utm.includes('instagram') || ref.includes('facebook')) return 'FACEBOOK_ADS';
  if (utm.includes('whatsapp') || ref.includes('wa.me') || ref.includes('whatsapp')) return 'WHATSAPP';
  if (utm) return 'REFERRAL'; // some other tagged campaign
  if (ref && !ref.includes(process.env.NEXT_PUBLIC_SITE_URL || '')) {
    if (ref.includes('google.')) return 'ORGANIC';
    return 'REFERRAL';
  }
  return 'DIRECT';
}
