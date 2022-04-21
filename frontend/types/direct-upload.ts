export type DirectUploadDto = {
  blob: {
    byte_size: number;
    checksum: string;
    content_type: string;
    filename: string;
  };
};

export type DirectUploadResult = {
  id: string;
  key: string;
  filename: string;
  content_type: string;
  metadata: {};
  service_name: string;
  byte_size: number;
  checksum: string;
  created_at: string;
  signed_id: string;
  attachable_sgid: string;
  direct_upload: {
    url: string;
    headers: {
      'Content-Type': string;
    };
  };
};
