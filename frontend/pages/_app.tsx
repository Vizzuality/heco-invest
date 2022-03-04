import { IntlProvider } from 'react-intl';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { I18nProvider } from '@react-aria/i18n';
import { OverlayProvider } from '@react-aria/overlays';
import { SSRProvider } from '@react-aria/ssr';
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

const HeCoApp: React.FC<AppProps> = ({ Component, pageProps }: Props) => {
  const { locale, defaultLocale } = useRouter();

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
    <IntlProvider
      locale={locale}
      defaultLocale={defaultLocale}
      messages={pageProps.intlMessages}
      onError={(error) => {
        // By default, FormatJS will display an error each time a translation is missing.
        // Nevertheless, the translations aren't pulled until the application is deployed in
        // production mode. For this reason, the message is removed during development.
        if (
          process.env.NODE_ENV === 'production' ||
          !error.message.startsWith('[@formatjs/intl Error MISSING_TRANSLATION]')
        ) {
          console.error(error);
        }
      }}
    >
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
                <I18nProvider locale={locale}>
                  <OverlayProvider>
                    <Layout {...layoutProps}>
                      <Component {...pageProps} />
                    </Layout>
                  </OverlayProvider>
                </I18nProvider>
              </SSRProvider>
            </AuthenticationProvider>
          </Hydrate>
        </QueryClientProvider>
      </ReduxProvider>
    </IntlProvider>
  );
};

export default HeCoApp;
