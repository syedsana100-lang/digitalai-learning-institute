import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { requireAdmin } from '@/lib/lms/auth-helpers';
import DashboardNav from '@/components/lms/DashboardNav';

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();
  if (!session) redirect('/signin?callbackUrl=/admin');

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-7xl flex-col gap-6 px-5 py-10 lg:flex-row lg:gap-8 lg:px-8">
      <DashboardNav studentName={session.user.name || 'Admin'} base="/admin" role="ADMIN" />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
