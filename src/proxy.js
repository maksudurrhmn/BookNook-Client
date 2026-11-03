import { NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

export function proxy(request) {
  const sessionCookie = getSessionCookie(request);

  // No session cookie: redirect to login.
  if (!sessionCookie) {
    const loginUrl = new URL('/login', request.url);

    // Remember the page the user wanted to visit.
    const callbackUrl = `${request.nextUrl.pathname}${request.nextUrl.search}`;
    loginUrl.searchParams.set('callbackUrl', callbackUrl);
    if (request.nextUrl.pathname.startsWith('/books/')) {
      loginUrl.searchParams.set('message', 'Please log in to view book details.');
    }

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/add-book/:path*', '/my-books/:path*', '/my-borrows/:path*', '/books/:id'],
};
