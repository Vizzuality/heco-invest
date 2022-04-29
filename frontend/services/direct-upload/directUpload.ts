import API from 'services/api';

const DirectUpload =
  typeof window !== 'undefined' ? require('@rails/activestorage').DirectUpload : null;

const csrfToken = () => document.cookie.match(/csrf_token.*(;|$)/)[0].replace('csrf_token=', '');

export const directUpload = async (file: File) => {
  const upload = new DirectUpload(
    file,
    API.defaults.baseURL + '/rails/active_storage/direct_uploads',
    {
      directUploadWillCreateBlobWithXHR: (xhr) => {
        xhr.withCredentials = true;
        console.log(csrfToken);
        xhr.setRequestHeader(API.defaults.xsrfHeaderName, csrfToken());
      },
    }
  );

  await upload.create((error, blob) => {
    if (error) {
      console.log(error);
    } else {
      console.log(blob);
      // blob.signed_id, a String, is the key piece of data that lets Rails identify the file we are referring to
      let signed_id = blob.signed_id;
      // BONUS: We can already request the uploaded file from Rails by using this url.
      let url = `/rails/active_storage/blobs/${signed_id}/${'whatever_we_want_the_filename_to_be'}`;
      let request_body = {
        name: file.name,
        file: signed_id,
      };
      console.log(request_body);
      API.post(url, request_body);
    }
  });
};
