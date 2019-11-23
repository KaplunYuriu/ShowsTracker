import { RequestType } from './WatchlistService';

export default class ShowsService {
  constructor() {
    this.baseUrl = 'api/users';
  }

  async authenticate(emailAddress, password) {
    return await this.executeRequest(`${this.baseUrl}/authenticate`, RequestType.POST, {
      emailAddress: emailAddress,
      password: password
    });
  }

  async register(emailAddress, password, name) {
    return await this.executeRequest(`${this.baseUrl}/register`, RequestType.POST, {
      emailAddress: emailAddress,
      password: password,
      fullName: name
    });
  }

  async executeRequest(url, method, body) {
    return await fetch(url, {
      method: method,
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(body)
    }).then(response => {
      if (!response.ok) {
        return { 
          success: false
        };
      };

      return response.json();
    });
  }
}