'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText, Download, Check, X, Loader2 } from 'lucide-react';
import type { StudentDocument } from '@prisma/client';

type DocWithStudent = StudentDocument & { student: { fullName: string; studentCode: string; id: string } };

const statusClass: Record<string, string> = {
  PENDING: 'bg-amber-500/15 text-amber-400',
  VERIFIED: 'bg-emerald-500/15 text-emerald-400',
  REJECTED: 'bg-red-500/15 text-red-400',
};

export default function DocumentReviewList({ initialDocuments }: { initialDocuments: DocWithStudent[] }) {
  const [documents, setDocuments] = useState(initialDocuments);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function updateStatus(id: string, status: 'VERIFIED' | 'REJECTED') {
    setBusyId(id);
    const res = await fetch(`/api/admin/documents/${id}/verify`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setDocuments((docs) => docs.map((d) => (d.id === id ? { ...d, status } : d)));
    }
    setBusyId(null);
  }

  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <div key={doc.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/8 bg-ink-900 p-4">
          <div className="flex items-center gap-3">
            <FileText className="h-4 w-4 shrink-0 text-mist" />
            <div>
              <Link href={`/admin/students/${doc.student.id}`} className="text-sm font-medium hover:underline">
                {doc.student.fullName} <span className="text-xs text-mist">({doc.student.studentCode})</span>
              </Link>
              <p className="text-xs text-mist">{doc.label} • {new Date(doc.uploadedAt).toLocaleDateString('en-IN')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass[doc.status]}`}>{doc.status}</span>
            <a href={`/api/documents/${doc.id}/download`} target="_blank" rel="noopener noreferrer" className="focus-ring text-mist hover:text-paper">
              <Download className="h-4 w-4" />
            </a>
            {doc.status === 'PENDING' && (
              <>
                <button
                  onClick={() => updateStatus(doc.id, 'VERIFIED')}
                  disabled={busyId === doc.id}
                  className="focus-ring rounded-full bg-emerald-500/15 p-1.5 text-emerald-400 hover:bg-emerald-500/25 disabled:opacity-50"
                  aria-label="Verify"
                >
                  {busyId === doc.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => updateStatus(doc.id, 'REJECTED')}
                  disabled={busyId === doc.id}
                  className="focus-ring rounded-full bg-red-500/15 p-1.5 text-red-400 hover:bg-red-500/25 disabled:opacity-50"
                  aria-label="Reject"
                >
                  <X className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>
      ))}
      {documents.length === 0 && <p className="text-sm text-mist">No documents uploaded yet.</p>}
    </div>
  );
}
