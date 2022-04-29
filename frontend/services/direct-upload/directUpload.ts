import { DirectUpload } from '@rails/activestorage';

import API from 'services/api';

import { Blob } from './helper';

const csrfToken = () => document.cookie.match(/csrf_token.*(;|$)/)[0].replace('csrf_token=', '');

/** Upload file using the rails activestorage.DirectUpload library. Returns the singed_id used to identify the file */
export const directUpload = async (file: File): Promise<Blob> => {
  const upload = new DirectUpload(
    file,
    API.defaults.baseURL + '/rails/active_storage/direct_uploads',
    {
      directUploadWillCreateBlobWithXHR: (xhr: XMLHttpRequest) => {
        xhr.withCredentials = true;
        xhr.setRequestHeader(API.defaults.xsrfHeaderName, csrfToken());
      },
    }
  );

  return await new Promise((resolve, reject) =>
    upload.create((error: Error, blob: Blob) => {
      if (error) {
        reject(error);
      } else {
        // blob.signed_id, a String, is the key piece of data that lets Rails identify the file we are referring to
        return resolve(blob);
      }
    })
  );
};
