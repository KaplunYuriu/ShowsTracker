export default class ShowsService {
  constructor() {
    this.baseUrl = 'api/watchlist';
    this.accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjMiLCJuYmYiOjE1NzQ0OTkxODgsImV4cCI6MTU3NTEwMzk4OCwiaWF0IjoxNTc0NDk5MTg4fQ.PdHFF6KNrQ1U0O_XRgCLzwnncfze_kA_gwNtXEl-eoI';
  }

  async getAll() {
    return (await this.executeRequest(`${this.baseUrl}/all`, requestType.GET)).json();
  }

  async getStatus(id) {
    return (await this.executeRequest(`${this.baseUrl}/shows/${id}`, requestType.GET)).text();
  }

  async addShow(id, status) {
    return (await this.executeRequest(`${this.baseUrl}/shows/${id}`, requestType.POST, { WatchStatus: status })).text();
  }

  async updateShow(id, status) {
    return (await this.executeRequest(`${this.baseUrl}/shows/${id}`, requestType.PUT, { WatchStatus: status })).text();
  }

  async deleteShow(id) {
    return (await this.executeRequest(`${this.baseUrl}/shows/${id}`, requestType.DELETE)).text();
  }

  async executeRequest(url, method, body) {
    return await fetch(url, {
      method: method,
      headers: new Headers({
        'Authorization': `Bearer ${this.accessToken}`, 
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(body)
    }).then(response => {
      if (!response.ok) {
        this.handleResponseError(response);
      };
      
      return response;
    });
  }

}

const requestType = {
  GET: 'GET',
  POST: 'POST', 
  PUT: 'PUT',
  DELETE: 'DELETE'
}