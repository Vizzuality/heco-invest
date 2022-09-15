export type DirectUploadBlob = {
  attachable_sgid: string;
  byte_size: number;
  checksum: string;
  content_type: string;
  created_at: string;
  direct_upload: {
    url: string;
  };
  filename: string;
  id: string;
  key: string;
  metadata: {};
  service_name: string;
  signed_id: string;
};
