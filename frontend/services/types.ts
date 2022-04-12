export type PagedRequest = {
  'page[number]': number;
  'page[size]': number;
  'fields[]': string;
};

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
  };
};

export type ErrorResponse = {
  message: { title: string }[];
};
