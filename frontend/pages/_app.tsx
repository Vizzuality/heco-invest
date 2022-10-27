import { useEffect, useState } from 'react';

import { IntlProvider } from 'react-intl';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { I18nProvider } from '@react-aria/i18n';
import { OverlayProvider } from '@react-aria/overlays';
import { SSRProvider } from '@react-aria/ssr';
import dayjs from 'dayjs';
import { Hydrate } from 'react-query/hydration';

import { getCookie, setCookie } from 'helpers/cookies';

import Analytics from 'components/analytics';
import PrivacyNotice from 'components/privacy-notice';
import StaticPageLayout from 'layouts/static-page';
import localesConfig from 'locales.config.json';
import store from 'store';
import { LayoutStaticProp } from 'types';

import 'styles/globals.css';

// Enable dayjs to display translated dates in all the application's locales
localesConfig.locales.forEach(({ locale }) => require(`dayjs/locale/${locale}.js`));

// Polyfills
import 'url-search-params-polyfill';

type Props = AppProps & {
  Component: {
    layout?: LayoutStaticProp;
  };
};

const HeCoApp: React.FC<AppProps> = ({ Component, pageProps }: Props) => {
  const { locale, defaultLocale } = useRouter();
  dayjs.locale(locale);

  const [queryClient] = useState(() => new QueryClient());

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

  // WARN: do not modify without knowing exactly what are the consequences
  // When the user visits any page, Next.js determines the supported locale the user is using:
  // https://nextjs.org/docs/advanced-features/i18n-routing#automatic-locale-detection
  // This locale is the one that can be retrieved through the `useRouter` hook as well as the one
  // used by the server-side requests made through the `withLocalizedRequests` HOC.
  // The client requests are also localized by default when using the axios instances in
  // `services/api.ts`, nevertheless, they don't rely on Next.js `locale` attribute but rather on
  // the `NEXT_LOCALE` cookie since we can't have access to the Next.js hook there. If no cookie is
  // set, then the requests fallbacks to the default locale set in `locales.config.json`.
  // Look at this example:
  // - The user's browser is set in English
  // - The application's default locale is Spanish
  // - This is the user's first visit
  // - If the user goes on a fully static page (such as the homepage) all of its content will be
  //   displayed in English (Next.js determines the locale based on the `Accept-Language` header)
  // - If the user goes to a non-static page (such as Discover), all the content rendered on the
  //   server will be in English, but all the requests made on the client will fetch content in
  //   Spanish since no `NEXT_LOCALE` cookie exists
  // For this reason, we want to always set the cookie on the first given opportunity.
  useEffect(() => {
    if (!getCookie('NEXT_LOCALE')) {
      // Set a cookie for 1 year
      setCookie('NEXT_LOCALE', `${locale}; path=/; max-age=31536000; secure`);
    }
  }, [locale]);

  return (
    <IntlProvider
      locale={locale}
      defaultLocale={defaultLocale}
      messages={pageProps['intlMessages']}
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
          <Hydrate state={pageProps['dehydratedState']}>
            <SSRProvider>
              <I18nProvider locale={locale}>
                <OverlayProvider>
                  <Analytics />
                  <PrivacyNotice />
                  <Layout {...layoutProps}>
                    <Component {...pageProps} />
                  </Layout>
                </OverlayProvider>
              </I18nProvider>
            </SSRProvider>
          </Hydrate>
        </QueryClientProvider>
      </ReduxProvider>
    </IntlProvider>
  );
};

export default HeCoApp;
