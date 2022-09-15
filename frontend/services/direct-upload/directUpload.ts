import { DirectUpload } from '@rails/activestorage';

import { DirectUploadBlob } from 'types/direct-upload';

import API from 'services/api';

const csrfToken = () => {
  const matched = document.cookie.match(/csrf_token.*(;|$)/);
  if (matched[0]) {
    return matched[0].replace('csrf_token=', '');
  }
  return '';
};

/** Upload file using the rails activestorage.DirectUpload library. Returns the singed_id used to identify the file */
export const directUpload = async (file: File): Promise<DirectUploadBlob> => {
  const token = csrfToken();
  if (token) {
    const upload = new DirectUpload(
      file,
      API.defaults.baseURL + '/rails/active_storage/direct_uploads',
      {
        directUploadWillCreateBlobWithXHR: (xhr: XMLHttpRequest) => {
          xhr.withCredentials = true;
          xhr.setRequestHeader(API.defaults.xsrfHeaderName, token);
        },
      }
    );

    return await new Promise((resolve, reject) =>
      upload.create((error, blob) => {
        if (error) {
          reject(error);
        } else {
          // blob.signed_id, a String, is the key piece of data that lets Rails identify the file we are referring to
          return resolve(blob as DirectUploadBlob);
        }
      })
    );
  } else {
    throw new Error('');
  }
};
