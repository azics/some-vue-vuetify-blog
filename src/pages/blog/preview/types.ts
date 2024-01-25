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

  export interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
  }
  
  export interface ApiResponse extends Pagination{
    data: Comment[];
  }

  export type SortItem = { key: string, order?: boolean | 'asc' | 'desc' }