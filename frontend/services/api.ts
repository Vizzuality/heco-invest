import axios from 'axios';
import Jsona from 'jsona';

const dataFormatter = new Jsona();

const isServer = typeof window === 'undefined';
const baseUrl = isServer
  ? process.env.NEXT_PUBLIC_BACKEND_DOMAIN + process.env.NEXT_PUBLIC_API_PATH
  : process.env.NEXT_PUBLIC_API_PATH;

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
    return Promise.reject({ message: error.response.data.errors });
  }

  return Promise.reject(error);
};

API.interceptors.response.use(onResponseSuccess, onResponseError);

export default API;
