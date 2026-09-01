import { cache } from 'react';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export { calculatePending, paymentStatusLabel } from '@/lib/lms/pricing';

/**
 * Server-side helpers used by dashboard pages and API routes. Middleware
 * already blocks unauthenticated/wrong-role requests to /student-dashboard
 * and /admin, but every API route re-checks here too — never trust the
 * client, and never rely on a single layer of defense.
 *
 * Wrapped in React's `cache()`: both the layout AND the page component for
 * a given route call this (the layout to gate access, the page to use the
 * data), which used to mean two database round trips per request. `cache()`
 * memoizes the result for the lifetime of a single request, so the second
 * call is free — this is the standard Next.js App Router pattern for
 * exactly this "layout + page both need the same data" situation.
 */

export const requireStudentProfile = cache(async () => {
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
});

export const requireAdmin = cache(async () => {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== 'ADMIN') return null;
  return session;
});
