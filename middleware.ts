import { auth } from '@/auth';
import { NextResponse } from 'next/server';

/**
 * Server-side route protection — this is the actual security boundary, not
 * just a UI convenience. Every /student-dashboard and /admin request is
 * checked here regardless of what the client does.
 */
export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const role = (req.auth?.user as { role?: string } | undefined)?.role;

  const isAdminRoute = pathname.startsWith('/admin');
  const isStudentRoute = pathname.startsWith('/student-dashboard');

  if ((isAdminRoute || isStudentRoute) && !isLoggedIn) {
    const signInUrl = new URL('/signin', req.nextUrl.origin);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (isAdminRoute && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/student-dashboard', req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/student-dashboard/:path*', '/admin/:path*'],
};
