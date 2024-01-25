interface ApiResponse<T> {
    data: T;
  }
  
  class Api {
    private baseUrl: string;
  
    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }
  
    private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data: T = await response.json();
      return { data };
    }
  
    async get<T>(endpoint: string): Promise<ApiResponse<T>> {
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      return this.handleResponse<T>(response);
    }
  
  }
  
  export default new Api('http://localhost:3000');
  