export class ApiClient {
    private baseUrl: string;
  
    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }
  
    // Helper method to build query string from parameters
    private buildQuery(params?: Record<string, string | number>): string {
      if (!params) return '';
      const esc = encodeURIComponent;
      const query = Object.keys(params)
        .map((key) => `${esc(key)}=${esc(params[key])}`)
        .join('&');
      return query ? `?${query}` : '';
    }
  
    // Generic GET request method
    async get<T>(endpoint: string, params?: Record<string, string | number>): Promise<T> {
      const queryString = this.buildQuery(params);
      const url = `${this.baseUrl}${endpoint}${queryString}`;
  
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
      }
      return response.json();
    }
  
    // Generic POST request method
    async post<T>(
      endpoint: string,
      data: any,
      params?: Record<string, string | number>
    ): Promise<T> {
      const queryString = this.buildQuery(params);
      const url = `${this.baseUrl}${endpoint}${queryString}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Failed to post to ${url}: ${response.statusText}`);
      }
      return response.json();
    }
  }
  