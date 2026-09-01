import { Resend } from 'resend';
import type { Lead } from '@prisma/client';

const resendClient = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/**
 * Sends the "New Lead Received" notification email. Silently does nothing
 * if RESEND_API_KEY isn't configured — leads are still saved to the
 * database either way, so this is a non-critical enhancement, not a
 * dependency the rest of the flow relies on. See docs/LEADS-SETUP.md.
 */
export async function sendLeadNotificationEmail(lead: Lead) {
  if (!resendClient) return;
  const notifyTo = process.env.LEAD_NOTIFICATION_EMAIL || 'syedsana100@gmail.com';

  try {
    await resendClient.emails.send({
      from: process.env.LEAD_NOTIFICATION_FROM || 'DigitalAI Learning Leads <leads@digitalailearning.in>',
      to: notifyTo,
      subject: `New Lead Received - Digital AI Learning Institute (${lead.leadCode})`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px;">
          <h2>New Lead: ${escapeHtml(lead.fullName)}</h2>
          <table cellpadding="6" style="border-collapse: collapse;">
            <tr><td><strong>Lead ID</strong></td><td>${lead.leadCode}</td></tr>
            <tr><td><strong>Name</strong></td><td>${escapeHtml(lead.fullName)}</td></tr>
            <tr><td><strong>Email</strong></td><td>${escapeHtml(lead.email)}</td></tr>
            <tr><td><strong>Phone</strong></td><td>${escapeHtml(lead.phone)}</td></tr>
            <tr><td><strong>Course Interested</strong></td><td>${escapeHtml(lead.courseInterested || '—')}</td></tr>
            <tr><td><strong>Message</strong></td><td>${escapeHtml(lead.message || '—')}</td></tr>
            <tr><td><strong>Source</strong></td><td>${lead.source}</td></tr>
            <tr><td><strong>Page</strong></td><td>${escapeHtml(lead.sourcePageUrl || '—')}</td></tr>
            <tr><td><strong>Received</strong></td><td>${lead.createdAt.toLocaleString('en-IN')}</td></tr>
          </table>
        </div>
      `,
    });
  } catch (err) {
    // Never let an email failure break lead capture — just log it.
    console.error('Lead notification email failed:', err);
  }
}

function escapeHtml(str: string) {
  return str.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}
