import axios from 'axios';
import Jsona from 'jsona';

import { ErrorResponse } from './types';

const dataFormatter = new Jsona();

const baseUrl =
  process.env.NEXT_PUBLIC_PROXY_BACKEND === 'true'
    ? // This path must correspond to the one stored in `next.config.js` in the `rewrites` function
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/backend`
    : process.env.NEXT_PUBLIC_BACKEND_URL;

const API = axios.create({
  baseURL: baseUrl,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  xsrfCookieName: 'csrf_token',
  xsrfHeaderName: 'X-CSRF-TOKEN',
});

const onResponseSuccess = (response) => {
  try {
    const parsedData = JSON.parse(response);
    return {
      data: dataFormatter.deserialize(parsedData),
      meta: parsedData.meta,
    };
  } catch (error) {
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

API.interceptors.response.use(onResponseSuccess, onResponseError);

export default API;
