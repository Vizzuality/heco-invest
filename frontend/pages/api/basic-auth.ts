import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * API endpoint that requires a basic HTTP authentication. It is used by the middleware.
 **/
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('WWW-Authenticate', 'Basic realm="Access to the staging site"');
  res.statusCode = 401;
  res.end('Unauthorized');
}
