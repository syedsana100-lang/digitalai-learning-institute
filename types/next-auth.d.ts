import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      role?: 'STUDENT' | 'ADMIN';
    } & DefaultSession['user'];
  }

  interface User {
    role?: 'STUDENT' | 'ADMIN';
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    role?: 'STUDENT' | 'ADMIN';
  }
}
