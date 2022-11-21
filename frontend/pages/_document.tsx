/* eslint-disable react/no-danger */
import type { DocumentContext, DocumentInitialProps } from 'next/document';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/png" href="/favicon-512x512.png" sizes="512x512" />
          <link rel="icon" type="image/png" href="/favicon-192x192.png" sizes="192x192" />
          <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <meta name="msapplication-TileImage" content="/mstile-150x150.png" />
          <meta name="msapplication-TileColor" content="#316146" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body className="bg-background-light">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
