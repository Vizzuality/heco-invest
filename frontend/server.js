const { createServer } = require('http');
const { parse } = require('url');

const auth = require('basic-auth');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);

      /** Return `true` if the user and password are correct */
      const matchCredentials = (name, pass) => {
        let valid = true;

        valid = name === process.env.HTTP_AUTH_USERNAME && valid;
        valid = pass === process.env.HTTP_AUTH_PASSWORD && valid;

        return valid;
      };

      const basicAuthEnabled =
        process.env.NODE_ENV === 'production' &&
        !!process.env.HTTP_AUTH_USERNAME &&
        !!process.env.HTTP_AUTH_PASSWORD;

      const credentials = auth(req);
      const validCredentials =
        !!credentials && matchCredentials(credentials.name, credentials.pass);

      if (basicAuthEnabled && !validCredentials) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Access to the staging site"');
        res.statusCode = 401;
        res.end('Unauthorized');
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
