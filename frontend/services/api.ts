import axios from 'axios';
import Jsona from 'jsona';

import { getCookie } from 'helpers/cookies';

import { ErrorResponse } from './types';

const { locales } = require('locales.config.json');

const dataFormatter = new Jsona();

export const apiBaseUrl =
  process.env.NEXT_PUBLIC_PROXY_BACKEND === 'true'
    ? // This path must correspond to the one stored in `next.config.js` in the `rewrites` function
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/backend`
    : process.env.NEXT_PUBLIC_BACKEND_URL;

const API = axios.create({
  baseURL: apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  xsrfCookieName: 'csrf_token',
  xsrfHeaderName: 'X-CSRF-TOKEN',
});

const onRequest = (config) => {
  return {
    ...config,
    params: {
      ...config?.params,
      locale: getCookie('NEXT_LOCALE') || locales.find((locale) => locale.default).locale,
    },
  };
};

const onResponseSuccess = (response) => {
  try {
    return {
      data: {
        // Deserialized data
        data: response.data ? dataFormatter.deserialize(response.data) : null,
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
