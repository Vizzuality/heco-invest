import axios, { AxiosRequestConfig } from 'axios';
import { deserialize } from 'deserialize-json-api';

import { getCookie } from 'helpers/cookies';

import { ErrorResponse } from './types';

const { locales } = require('locales.config.json');

export const apiBaseUrl =
  process.env.NEXT_PUBLIC_PROXY_BACKEND === 'true'
    ? // This path must correspond to the one stored in `next.config.js` in the `rewrites` function
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/backend`
    : process.env.NEXT_PUBLIC_BACKEND_URL;

const options = {
  baseURL: apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  xsrfCookieName: 'csrf_token',
  xsrfHeaderName: 'X-CSRF-TOKEN',
};

const API = axios.create(options);

const onRequest = (config: AxiosRequestConfig) => {
  // We want to always send the locale to the API automatically. Unfortunately, this can't work for requests made on the server because we can't read the `NEXT_LOCALE` cookie there (`document` is `undefined`) and at that moment in time axios doesn't give us access to the request cookies. For this reason, the following code only sends the correct locale when requests are made on the client.
  const locale =
    // When using withLocalizedRequests, the config?.params?.locale will have a value
    // When setting locale = null for projects to receive the default language
    !!config?.params?.locale || config?.params?.locale === null
      ? config.params.locale
      : // If there is no locale in the params, we try to get it from the cookie or from the locales config
        getCookie('NEXT_LOCALE') ?? locales.find((locale) => locale.default).locale;

  return {
    ...config,
    params: {
      ...(config?.params ?? {}),
      // NOTE: requests made on the server, should already have a `locale` parameter thanks to `withLocalizedRequests`
      locale,
    },
  };
};

const onResponseSuccess = (response) => {
  try {
    return {
      data: {
        // Deserialized data
        data: response.data ? deserialize(response.data)?.data : null,
        // Metadata (pagination) if any
        ...(response.data.meta ? { meta: response.data.meta } : {}),
      },
    };
  } catch (error) {
    console.error('API deserialization error', error);
    return response;
  }
};

const onResponseError = (error) => {
  if (error.response.data?.errors?.length > 0) {
    return Promise.reject<ErrorResponse>({
      message: error.response.data.errors,
    });
  }

  return Promise.reject(error);
};

API.interceptors.request.use(onRequest);
API.interceptors.response.use(onResponseSuccess, onResponseError);

export default API;

const RawApi = axios.create(options);
RawApi.interceptors.request.use(onRequest);

export { RawApi };
