import { useMutation, UseMutationResult } from 'react-query';

import axios, { AxiosResponse, AxiosError } from 'axios';

// import { UploadDto, UploadResponse } from 'types/upload';

const isServer = typeof window === 'undefined';
const baseUrl = isServer
  ? process.env.NEXT_PUBLIC_BACKEND_HOST + process.env.NEXT_PUBLIC_UPLOAD_API_URL
  : process.env.NEXT_PUBLIC_UPLOAD_API_URL;

const UPLOAD = axios.create({
  baseURL: baseUrl,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  xsrfCookieName: 'csrf_token',
  xsrfHeaderName: 'X-CSRF-TOKEN',
});

export function useUpload(): UseMutationResult<AxiosResponse<any>, AxiosError, any> {
  const upload = async (dto: any): Promise<AxiosResponse<any>> => {
    return await UPLOAD.post('/', dto);
  };
  return useMutation(upload);
}
