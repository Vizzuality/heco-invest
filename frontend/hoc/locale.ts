import { GetStaticProps, GetServerSideProps } from 'next';

import API from 'services/api';

type WithLocalizedRequests = {
  <T extends GetStaticProps>(callback?: T): T;
  <T extends GetServerSideProps>(callback?: T): T;
};

/**
 * HOC that ensures that all the requests initiated on the server are correctly localized
 * @param callback `getStaticProps` or `getServerSideprops` callback
 */
export const withLocalizedRequests: WithLocalizedRequests =
  <T extends GetStaticProps & GetServerSideProps>(callback?: T) =>
  async (context: Parameters<T>[0]) => {
    const { locale, defaultLocale } = context;

    API.defaults.params = {
      ...(API.defaults.params ?? {}),
      locale: locale ?? defaultLocale,
    };

    if (callback) {
      return callback(context);
    }

    return {};
  };
