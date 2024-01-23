export interface Post {
    userId: number;
    id: string;
    title: string;
    body: string;
  }
  
  export interface Pagination {
    first: number;
    prev: number | null;
    next: number | null;
    last: number;
    pages: number;
    items: number;
  }
  
  export interface ApiResponse extends Pagination{
    data: Post[];
  }

  export type SortItem = { key: string, order?: boolean | 'asc' | 'desc' }