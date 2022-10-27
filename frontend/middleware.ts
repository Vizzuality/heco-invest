import { NextRequest, NextResponse } from 'next/server';

import { parse } from 'basic-auth';

const BASIC_HTTP_AUTH_ENABLED =
  process.env.NODE_ENV === 'production' &&
  !!process.env.HTTP_AUTH_USERNAME &&
  !!process.env.HTTP_AUTH_PASSWORD;

const basicHTTPAuth = (req) => {
  /** Return `true` if the user and password are correct */
  const check = (name: string, pass: string) => {
    let valid = true;

    valid = name === process.env.HTTP_AUTH_USERNAME && valid;
    valid = pass === process.env.HTTP_AUTH_PASSWORD && valid;

    return valid;
  };

  const credentials = parse(req.headers.get('Authorization'));

  if (!credentials || !check(credentials.name, credentials.pass)) {
    // A redirect to an API route is necessary to require basic HTTP authentication otherwise
    // Next.js will leak the SSR-ed HTML
    return NextResponse.rewrite(new URL('/api/basic-auth', req.nextUrl));
  }

  return NextResponse.next();
};

export const middleware = (req: NextRequest) => {
  if (BASIC_HTTP_AUTH_ENABLED) {
    return basicHTTPAuth(req);
  }

  return NextResponse.next();
};
