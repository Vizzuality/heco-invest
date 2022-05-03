// The @rails/activestorage library cannot be run on the server side, because it uses the client variable File. It's a problem in Next.js, throwing error when imported. This 'conditional' import ensures that the library is only imported on the client side and avoids the error.

/** DirectUpload rails library for client */
export const DirectUpload =
  typeof window !== 'undefined' ? require('@rails/activestorage').DirectUpload : null;

export interface DirectUploadDelegate {
  directUploadWillCreateBlobWithXHR?: ((xhr: XMLHttpRequest) => void) | undefined;

  directUploadWillStoreFileWithXHR?: ((xhr: XMLHttpRequest) => void) | undefined;
}

export interface Blob {
  byte_size: number;
  checksum: string;
  content_type: string;
  filename: string;
  signed_id: string;
}
