
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data:    T;
}


export interface PaginationMeta {
  total:      number;
  page:       number;
  limit:      number;
  totalPages: number;
}
