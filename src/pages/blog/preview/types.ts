export interface Post {
    userId: number;
    id: number;
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

  interface Geo {
    lat: string;
    lng: string;
  }
  
  interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
  }
  
  interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
  }
  
  export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
  }

  export interface User4Front {
    title: string;
    value: string;
  }