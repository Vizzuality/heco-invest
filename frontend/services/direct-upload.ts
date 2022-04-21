import API from './api';

// This is just for testing! I will create additional configurations to deal with the server side, because it is creating an error when importing the 'activestorage' library
const DirectUpload =
  typeof window !== 'undefined' ? require('@rails/activestorage').DirectUpload : null;

export const directUpload = (name: string, file: File) => {
  // name is a string, the_attachment is a File object
  const upload = new DirectUpload(
    file,
    API.defaults.baseURL + '/rails/active_storage/direct_uploads' // This url is exposed by default in your app
  );

  upload.create((error, blob) => {
    if (error) {
      console.log(error);
    } else {
      console.log(blob);
      // blob.signed_id, a String, is the key piece of data that lets Rails identify the file we are referring to
      let signed_id = blob.signed_id;
      // BONUS: We can already request the uploaded file from Rails by using this url.
      let url = `/rails/active_storage/blobs/${signed_id}/${'whatever_we_want_the_filename_to_be'}`;
      let request_body = {
        name: name,
        file: signed_id,
      };
      console.log(request_body);
      // post_thing_to_rails(request_body); // This can be REST, or GraphQL, doesn't matter
    }
  });
};
