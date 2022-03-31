import axios from 'axios';
import Jsona from 'jsona';
import { getSession, signOut } from 'next-auth/client';

/**
 * API service require to be authenticated.
 * Then, by default all the request are sending the authorization header.
 */

const dataFormatter = new Jsona();

const defaultConfig = {
  baseURL: `${process.env.NEXT_PUBLIC_API_URL || process.env.STORYBOOK_API_URL}/api/v1/`,
  headers: { 'Content-Type': 'application/json' },
};

// const authorizedRequest = async (config) => {
//   const { accessToken } = await getSession();
//   config.headers['Authorization'] = `Bearer ${accessToken}`;
//   return config;
// };
const onResponseSuccess = (response) => response;

const onResponseError = (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  if (error.response.status === 401) {
    signOut();
  }
  if (error.response.data?.errors?.length > 0) {
    return Promise.reject(new Error(error.response.data.errors[0].title));
  }
  // Do something with response error
  return Promise.reject(error);
};

// This endpoint by default will deserialize the data
export const apiService = axios.create(defaultConfig);

apiService.interceptors.response.use(
  (response) => ({
    ...response,
    data: {
      ...response.data,
      data: !!response.data && dataFormatter.deserialize(response.data), // JSON API deserialize
    },
  }),
  onResponseError
);

apiService.interceptors.request.use(onResponseSuccess, onResponseError);

// Use this endpoint when JSON API spec is not needed
// or the response doesn't follow this format
export const apiRawService = axios.create(defaultConfig);

apiRawService.interceptors.response.use((response) => response, onResponseError);
apiRawService.interceptors.request.use(onResponseSuccess, onResponseError);

export default apiService;
