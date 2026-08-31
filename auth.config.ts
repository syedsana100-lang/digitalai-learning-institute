import type { NextAuthConfig } from 'next-auth';

/**
 * The edge-safe half of the auth config. Middleware runs on the Edge
 * runtime with a strict bundle size limit — it must never pull in bcrypt or
 * the Prisma client (both are Node-only and huge). This file has zero
 * providers and touches no database; it only reads the already-decoded JWT
 * session to decide whether a request is allowed through.
 *
 * The full config (providers, database-backed callbacks) lives in auth.ts,
 * which extends this one and runs in the normal Node.js runtime (API
 * routes, server components) where bundle size isn't constrained.
 */
export const authConfig = {
  pages: {
    signIn: '/signin',
  },
  providers: [], // populated in auth.ts — kept empty here so nothing Node-only leaks into the edge bundle
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const isLoggedIn = !!auth?.user;
      const role = (auth?.user as { role?: string } | undefined)?.role;

      const isAdminRoute = pathname.startsWith('/admin');
      const isStudentRoute = pathname.startsWith('/student-dashboard');

      if (!isAdminRoute && !isStudentRoute) return true;
      if (!isLoggedIn) return false; // NextAuth redirects to `pages.signIn` with callbackUrl automatically
      if (isAdminRoute && role !== 'ADMIN') {
        return Response.redirect(new URL('/student-dashboard', request.nextUrl.origin));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
