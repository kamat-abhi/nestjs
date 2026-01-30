export interface Paginated<T> {
  data: T[];
  meta: {
    itemPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
  };
  links: {
    firstPage: string;
    lastPage: string;
    currentPage: string;
    nextPage: string;
    prevPage: string;
  };
}
