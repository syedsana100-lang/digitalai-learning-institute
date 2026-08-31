import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

/**
 * Server-side route protection — this is the actual security boundary, not
 * just a UI convenience. Every /student-dashboard and /admin request is
 * checked here regardless of what the client does.
 *
 * Deliberately built from the lightweight auth.config.ts (no providers, no
 * bcrypt, no Prisma) rather than the full '@/auth' — middleware runs on the
 * Edge runtime, which has a strict ~1MB bundle size limit that bcrypt +
 * Prisma alone blow past.
 */
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ['/student-dashboard/:path*', '/admin/:path*'],
};
