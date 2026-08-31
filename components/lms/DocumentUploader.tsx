'use client';

import { useState } from 'react';
import { UploadCloud, FileText, Loader2, Download, Clock, CheckCircle2, XCircle } from 'lucide-react';
import type { StudentDocument } from '@prisma/client';
import { DOCUMENT_TYPE_OPTIONS } from '@/lib/lms/documents';

const statusMeta: Record<string, { label: string; className: string; icon: typeof Clock }> = {
  PENDING: { label: 'Pending Review', className: 'bg-amber-500/15 text-amber-400', icon: Clock },
  VERIFIED: { label: 'Verified', className: 'bg-emerald-500/15 text-emerald-400', icon: CheckCircle2 },
  REJECTED: { label: 'Rejected', className: 'bg-red-500/15 text-red-400', icon: XCircle },
};

export default function DocumentUploader({ initialDocuments }: { initialDocuments: StudentDocument[] }) {
  const [documents, setDocuments] = useState(initialDocuments);
  const [type, setType] = useState<string>(DOCUMENT_TYPE_OPTIONS[0].value);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    formData.append('label', DOCUMENT_TYPE_OPTIONS.find((o) => o.value === type)?.label || file.name);

    const res = await fetch('/api/documents', { method: 'POST', body: formData });
    const data = await res.json();
    setUploading(false);
    if (!res.ok) {
      setError(data.error || 'Upload failed.');
      return;
    }
    setDocuments((docs) => [data.document, ...docs]);
    setFile(null);
  }

  return (
    <div>
      <form onSubmit={handleUpload} className="rounded-2xl border border-white/8 bg-ink-900 p-5">
        <div className="grid gap-4 sm:grid-cols-[1fr,1fr,auto] sm:items-end">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-mist">Document Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="focus-ring w-full rounded-xl border border-white/10 bg-ink-950 px-4 py-2.5 text-sm">
              {DOCUMENT_TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-mist">File (PDF, JPG, PNG — max 10 MB)</label>
            <input
              type="file"
              accept="application/pdf,image/jpeg,image/jpg,image/png"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="focus-ring w-full rounded-xl border border-white/10 bg-ink-950 px-3 py-2 text-xs file:mr-3 file:rounded-full file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-xs file:text-paper"
            />
          </div>
          <button
            type="submit"
            disabled={!file || uploading}
            className="focus-ring flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-signal-blue to-signal-violet px-5 py-2.5 text-sm font-semibold shadow-glow disabled:opacity-60"
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
            Upload
          </button>
        </div>
        {error && <p className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>}
      </form>

      <div className="mt-6 space-y-2">
        {documents.length === 0 && <p className="text-sm text-mist">No documents uploaded yet.</p>}
        {documents.map((doc) => {
          const meta = statusMeta[doc.status];
          return (
            <div key={doc.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/8 bg-ink-900 p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 shrink-0 text-mist" />
                <div>
                  <p className="text-sm font-medium">{doc.label}</p>
                  <p className="text-xs text-mist">Uploaded {new Date(doc.uploadedAt).toLocaleDateString('en-IN')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${meta.className}`}>
                  <meta.icon className="h-3 w-3" /> {meta.label}
                </span>
                <a href={`/api/documents/${doc.id}/download`} target="_blank" rel="noopener noreferrer" className="focus-ring text-mist hover:text-paper">
                  <Download className="h-4 w-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
