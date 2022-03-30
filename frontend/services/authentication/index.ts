import axios from 'axios';
import Jsona from 'jsona';

const dataFormatter = new Jsona();

const isServer = typeof window === 'undefined';
const baseUrl = isServer
  ? process.env.NEXT_PUBLIC_BACKEND_HOST + process.env.NEXT_PUBLIC_API_URL
  : process.env.NEXT_PUBLIC_API_URL;

const AUTHENTICATION = axios.create({
  baseURL: `${baseUrl}/session`,
  headers: { 'Content-Type': 'application/json' },
  xsrfCookieName: 'csrf_token',
  xsrfHeaderName: 'X-CSRF-Token',
  withCredentials: true,
});

const onResponseSuccess = (response) => {
  try {
    const parsedData = JSON.parse(response.data);
    return {
      data: dataFormatter.deserialize(parsedData),
      meta: parsedData.meta,
    };
  } catch (error) {
    return response.data;
  }
};

const onResponseError = (error) => {
  if (error.response.data?.errors?.length > 0) {
    return Promise.reject(new Error(error.response.data.errors[0].title));
  }

  // Do something with response error
  return Promise.reject(error);
};

AUTHENTICATION.interceptors.response.use(onResponseSuccess, onResponseError);

export default AUTHENTICATION;
