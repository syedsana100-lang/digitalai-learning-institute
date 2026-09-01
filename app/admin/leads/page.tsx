import { prisma } from '@/lib/prisma';
import LeadsPanel from '@/components/lms/LeadsPanel';

export default async function AdminLeadsPage() {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [leads, totalLeads, todayLeads, monthLeads, convertedLeads] = await Promise.all([
    prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 300 }),
    prisma.lead.count(),
    prisma.lead.count({ where: { createdAt: { gte: startOfToday } } }),
    prisma.lead.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.lead.count({ where: { status: 'CONVERTED' } }),
  ]);

  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 1000) / 10 : 0;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Leads</h1>
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Total Leads', value: totalLeads },
          { label: "Today's Leads", value: todayLeads },
          { label: 'This Month', value: monthLeads },
          { label: 'Conversion Rate', value: `${conversionRate}%` },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/8 bg-ink-900 p-5">
            <p className="font-display text-2xl font-bold">{s.value}</p>
            <p className="mt-1 text-xs text-mist">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <LeadsPanel initialLeads={leads} />
      </div>
    </div>
  );
}
