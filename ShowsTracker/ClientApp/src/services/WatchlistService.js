import { AuthCookieName } from '../store/Login';
import Cookies from 'universal-cookie';

export default class ShowsService {
  constructor() {
    this.baseUrl = 'api/watchlist';
    this.cookies = new Cookies();
  }

  async getAll() {
    return (await this.executeRequest(`${this.baseUrl}/all`, RequestType.GET)).json();
  }

  async getStatus(id) {
    return (await this.executeRequest(`${this.baseUrl}/shows/${id}`, RequestType.GET)).text();
  }

  async addShow(id, status) {
    return (await this.executeRequest(`${this.baseUrl}/shows/${id}`, RequestType.POST, { WatchStatus: status })).text();
  }

  async updateShow(id, status) {
    return (await this.executeRequest(`${this.baseUrl}/shows/${id}`, RequestType.PUT, { WatchStatus: status })).text();
  }

  async deleteShow(id) {
    return (await this.executeRequest(`${this.baseUrl}/shows/${id}`, RequestType.DELETE)).text();
  }

  async executeRequest(url, method, body) {
    const accessToken = this.cookies.get(AuthCookieName);

    return await fetch(url, {
      method: method,
      headers: new Headers({
        'Authorization': `Bearer ${accessToken}`, 
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

export const RequestType = {
  GET: 'GET',
  POST: 'POST', 
  PUT: 'PUT',
  DELETE: 'DELETE'
}