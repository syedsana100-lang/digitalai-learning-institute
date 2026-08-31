import { prisma } from '@/lib/prisma';
import DocumentReviewList from '@/components/lms/DocumentReviewList';

export default async function AdminDocumentsPage() {
  const documents = await prisma.studentDocument.findMany({
    orderBy: { uploadedAt: 'desc' },
    include: { student: { select: { fullName: true, studentCode: true, id: true } } },
    take: 200,
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Document Review</h1>
      <p className="mt-1 text-sm text-mist">Verify or reject uploaded student documents.</p>
      <div className="mt-6">
        <DocumentReviewList initialDocuments={documents} />
      </div>
    </div>
  );
}
