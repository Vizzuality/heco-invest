/** Default paged request params */
export type PagedRequest = {
  'page[number]'?: number;
  'page[size]'?: number;
  'fields[]'?: string;
};

/** Default API single item response structure */
export type ResponseData<Data> = {
  data: Data;
};

/** Default API paged response structure */
export type PagedResponse<ResponseData> = {
  data: ResponseData[];
  meta: {
    page: number;
    per_page: number;
    from: number;
    to: number;
    total: number;
    pages: number;
  };
  links: {
    first: string;
    self: string;
    last: string;
    next: string;
  };
};

/** Default API error response structure */
export type ErrorResponse = {
  message: { title: string; code?: string }[];
};
