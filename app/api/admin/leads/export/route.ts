import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/lms/auth-helpers';

function csvEscape(value: string) {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });

  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });

  const headers = ['Lead ID', 'Name', 'Email', 'Phone', 'Course Interested', 'Message', 'Source', 'Status', 'Page URL', 'Received At'];
  const rows = leads.map((l) => [
    l.leadCode, l.fullName, l.email, l.phone, l.courseInterested || '', l.message || '',
    l.source, l.status, l.sourcePageUrl || '', l.createdAt.toISOString(),
  ]);

  const csv = [headers, ...rows].map((row) => row.map((v) => csvEscape(String(v))).join(',')).join('\n');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
