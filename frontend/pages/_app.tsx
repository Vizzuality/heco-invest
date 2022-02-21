import { useEffect } from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { OverlayProvider } from '@react-aria/overlays';
import { SSRProvider } from '@react-aria/ssr';
import { tx } from '@transifex/native';
import { Provider as AuthenticationProvider } from 'next-auth/client';
import { Hydrate } from 'react-query/hydration';

import StaticPageLayout from 'layouts/static-page';
import store from 'store';
import { LayoutStaticProp } from 'types';

import 'styles/globals.css';

type Props = AppProps & {
  Component: {
    layout?: LayoutStaticProp;
  };
};

const queryClient = new QueryClient();

// Initialize Transifex
tx.init({ token: process.env.NEXT_PUBLIC_TRANSIFEX_API_KEY });
tx.setCurrentLocale('es'); // Default locale

const HeCoApp: React.FC<AppProps> = ({ Component, pageProps }: Props) => {
  const { locale } = useRouter();

  // Update the Transifex' locale based on Next.js' one
  useEffect(() => {
    tx.setCurrentLocale(locale);
  }, [locale]);

  // By getting the layout from the child component, we can prevent it from re-rendering when
  // navigating to a page with the same one
  // Source: https://github.com/vercel/next.js/issues/8193#issuecomment-590654825
  // This is useful for the map page where opening a site means navigating to another page
  const Layout = Component.layout?.Component ?? StaticPageLayout;

  let layoutProps = {};
  if (Component.layout?.props) {
    if (typeof Component.layout.props === 'function') {
      layoutProps = Component.layout.props(pageProps);
    } else {
      layoutProps = Component.layout.props;
    }
  }

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AuthenticationProvider
            session={pageProps.session}
            options={{
              clientMaxAge: 5 * 60, // Re-fetch session if cache is older than 60 seconds
              keepAlive: 10 * 60, // Send keepAlive message every 10 minutes
            }}
          >
            <SSRProvider>
              <OverlayProvider>
                <Layout {...layoutProps}>
                  <Component {...pageProps} />
                </Layout>
              </OverlayProvider>
            </SSRProvider>
          </AuthenticationProvider>
        </Hydrate>
      </QueryClientProvider>
    </ReduxProvider>
  );
};

export default HeCoApp;
