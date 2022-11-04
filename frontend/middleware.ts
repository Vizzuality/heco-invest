import { NextResponse } from 'next/server';

import nextAuthMiddleware, { WithAuthArgs } from 'next-auth/middleware';

export function middleware(...params) {
  const authRequired =
    !!process.env.HTTP_AUTH_USERNAME &&
    !!process.env.HTTP_AUTH_PASSWORD &&
    !!process.env.NEXTAUTH_SECRET &&
    !!process.env.NEXTAUTH_URL;

  if (authRequired) {
    return nextAuthMiddleware(...(params as WithAuthArgs));
  }

  return NextResponse.next();
}
