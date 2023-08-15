export interface ApiReturn<T> {
  data: T;
  message: string;
  status: number;
}

export interface ApiError {
  code?: number;
  message: string;
  status: number;
}

export type UninterceptedApiError = {
  message: string | Record<string, string[]>;
};

type PaginateData<Data> = {
  data_per_page: Data;
  meta: {
    page: number;
    max_page: number;
  };
};

export interface PaginatedApiResponse<DataType> {
  code: number;
  success: string;
  data: PaginateData<DataType>;
}
