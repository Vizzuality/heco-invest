import axios from 'axios';
import Jsona from 'jsona';

const dataFormatter = new Jsona();

const isServer = typeof window === 'undefined';
const baseUrl = isServer
  ? process.env.NEXT_PUBLIC_BACKEND_HOST + process.env.NEXT_PUBLIC_API_URL
  : process.env.NEXT_PUBLIC_API_URL;

const USERS = axios.create({
  baseURL: `${baseUrl}/user`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  xsrfCookieName: 'csrf_token',
  xsrfHeaderName: 'X-CSRF-TOKEN',
  transformResponse: (data) => {
    try {
      const parsedData = JSON.parse(data);
      return {
        data: dataFormatter.deserialize(parsedData),
        meta: parsedData.meta,
      };
    } catch (error) {
      return data;
    }
  },
});

// const onResponseSuccess = (response) => response;

// const onResponseError = (error) => {
//   return Promise.reject(error);
// };

// USERS.interceptors.response.use(onResponseSuccess, onResponseError);

export default USERS;
