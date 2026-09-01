'use client';

import { useState, useMemo } from 'react';
import { Download, Search } from 'lucide-react';
import type { Lead } from '@prisma/client';

const statusOptions = ['NEW', 'CONTACTED', 'FOLLOW_UP', 'CONVERTED', 'LOST'] as const;

const statusClass: Record<string, string> = {
  NEW: 'bg-blue-500/15 text-blue-400',
  CONTACTED: 'bg-amber-500/15 text-amber-400',
  FOLLOW_UP: 'bg-violet-500/15 text-violet-400',
  CONVERTED: 'bg-emerald-500/15 text-emerald-400',
  LOST: 'bg-red-500/15 text-red-400',
};

export default function LeadsPanel({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (statusFilter && l.status !== statusFilter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        l.fullName.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.phone.includes(q) ||
        l.leadCode.toLowerCase().includes(q)
      );
    });
  }, [leads, query, statusFilter]);

  async function updateStatus(id: string, status: string) {
    setUpdatingId(id);
    const res = await fetch(`/api/admin/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: status as Lead['status'] } : l)));
    }
    setUpdatingId(null);
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, phone, lead ID…"
            className="focus-ring w-full rounded-xl border border-white/10 bg-ink-900 py-2.5 pl-9 pr-4 text-sm"
          />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="focus-ring rounded-xl border border-white/10 bg-ink-900 px-3 py-2.5 text-sm">
          <option value="">All Statuses</option>
          {statusOptions.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
        </select>
        <a
          href="/api/admin/leads/export"
          className="focus-ring flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold hover:bg-white/5"
        >
          <Download className="h-4 w-4" /> Export CSV
        </a>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/8">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-wide text-mist">
            <tr>
              <th className="px-4 py-3">Lead</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Course</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Received</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/8">
            {filtered.map((lead) => (
              <tr key={lead.id}>
                <td className="px-4 py-3">
                  <p className="font-medium">{lead.fullName}</p>
                  <p className="text-xs text-mist">{lead.leadCode}</p>
                </td>
                <td className="px-4 py-3 text-mist">
                  <p>{lead.email}</p>
                  <p>{lead.phone}</p>
                </td>
                <td className="px-4 py-3 text-mist">{lead.courseInterested || '—'}</td>
                <td className="px-4 py-3 text-mist">{lead.source.replace('_', ' ')}</td>
                <td className="px-4 py-3 text-mist">{new Date(lead.createdAt).toLocaleDateString('en-IN')}</td>
                <td className="px-4 py-3">
                  <select
                    value={lead.status}
                    disabled={updatingId === lead.id}
                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                    className={`rounded-full border-0 px-2.5 py-1 text-xs font-semibold ${statusClass[lead.status]}`}
                  >
                    {statusOptions.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                  </select>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-mist">No leads found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
