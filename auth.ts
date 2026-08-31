import NextAuth from 'next-auth';
import type { Provider } from 'next-auth/providers';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { authConfig } from '@/auth.config';

/**
 * Full Auth.js (NextAuth v5) config for the student portal — providers plus
 * database-backed callbacks. This file (and everything it imports, like
 * bcrypt and the Prisma client) must NEVER be imported from middleware.ts —
 * it's Node-only and far too large for the Edge runtime. Middleware uses
 * auth.config.ts instead; see that file for why.
 *
 * - Credentials provider: email + password, hashed with bcrypt. Real
 *   accounts only — there is no dummy/bypass login path.
 * - Google provider: only active when GOOGLE_CLIENT_ID/SECRET are set (see
 *   docs/LMS-SETUP.md for how to create them in Google Cloud Console).
 * - JWT session strategy (not database sessions) — this keeps the app able
 *   to build and run even before DATABASE_URL is configured, matching the
 *   same "never break the build" pattern used for Sanity.
 * - `role` (STUDENT/ADMIN) is embedded in the JWT/session so every page and
 *   API route can check it server-side without an extra DB round trip.
 */

const providers: Provider[] = [
  Credentials({
    name: 'Email and Password',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      const email = credentials?.email as string | undefined;
      const password = credentials?.password as string | undefined;
      if (!email || !password) return null;

      const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
      if (!user || !user.passwordHash) return null; // no dummy fallback — must be a real, registered account

      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) return null;

      return { id: user.id, name: user.name, email: user.email, image: user.image, role: user.role };
    },
  }),
];

// Google sign-in only appears once real credentials are configured.
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers,
  session: { strategy: 'jwt' },
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      // First-time Google sign-in: create the User row (and default STUDENT
      // role) since we're not using the Prisma adapter's auto-provisioning
      // (JWT strategy doesn't create users automatically).
      if (account?.provider === 'google' && user.email) {
        const existing = await prisma.user.findUnique({ where: { email: user.email } });
        if (!existing) {
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,
              role: 'STUDENT',
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      // Keep role fresh (e.g. if an admin promotes a user, it reflects on next login/refresh)
      if (!token.role && token.email) {
        const dbUser = await prisma.user.findUnique({ where: { email: token.email } });
        if (dbUser) token.role = dbUser.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        if (token.sub) session.user.id = token.sub;
      }
      return session;
    },
  },
});

