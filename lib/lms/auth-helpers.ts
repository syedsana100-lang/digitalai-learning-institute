import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export { calculatePending, paymentStatusLabel } from '@/lib/lms/pricing';

/**
 * Server-side helpers used by dashboard pages and API routes. Middleware
 * already blocks unauthenticated/wrong-role requests to /student-dashboard
 * and /admin, but every API route re-checks here too — never trust the
 * client, and never rely on a single layer of defense.
 */

export async function requireStudentProfile() {
  const session = await auth();
  if (!session?.user?.id) return null;

  let profile = await prisma.studentProfile.findUnique({
    where: { userId: session.user.id },
    include: { user: true },
  });

  // Google sign-in creates the User row but not a StudentProfile — create a
  // minimal one on first dashboard visit so nothing 404s or crashes.
  if (!profile) {
    const year = new Date().getFullYear();
    const count = await prisma.studentProfile.count();
    profile = await prisma.studentProfile.create({
      data: {
        userId: session.user.id,
        studentCode: `DAI-${year}-${String(count + 1).padStart(4, '0')}`,
        fullName: session.user.name || 'Student',
      },
      include: { user: true },
    });
  }

  return profile;
}

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== 'ADMIN') return null;
  return session;
}
