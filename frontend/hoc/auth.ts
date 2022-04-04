import { QueryClient } from 'react-query';

import { dehydrate } from 'react-query/hydration';

import API from 'services/api';

export function withProtection() {
  return async (context: any) => {
    const queryClient = new QueryClient();
    // remember to proxy cookies
    await queryClient.prefetchQuery('user', () =>
      API.get('/', {
        headers: {
          Cookie: context.req.headers.cookie || '',
        },
      })
        .then((response) => {
          context.res.setHeader('set-cookie', response.headers['set-cookie']);
          return response.data;
        })
        .catch((error) => {
          if (error.response.headers['set-cookie']) {
            context.res.setHeader('set-cookie', error.response.headers['set-cookie']);
          }
        })
    );
    const user = queryClient.getQueryData('user');
    const { resolvedUrl } = context;

    if (!user) {
      return {
        redirect: {
          destination: `/sign-in?callbackUrl=${resolvedUrl}`, // I know missing language
          permanent: false,
        },
      };
    }

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
    };
  };
}
