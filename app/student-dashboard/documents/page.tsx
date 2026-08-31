import { prisma } from '@/lib/prisma';
import { requireStudentProfile } from '@/lib/lms/auth-helpers';
import DocumentUploader from '@/components/lms/DocumentUploader';

export default async function DocumentsPage() {
  const profile = await requireStudentProfile();
  if (!profile) return null;

  const documents = await prisma.studentDocument.findMany({
    where: { studentId: profile.id },
    orderBy: { uploadedAt: 'desc' },
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Documents</h1>
      <p className="mt-1 text-sm text-mist">Upload your ID proof and educational certificates. PDF, JPG or PNG — max 10 MB each.</p>
      <div className="mt-6">
        <DocumentUploader initialDocuments={documents} />
      </div>
    </div>
  );
}
