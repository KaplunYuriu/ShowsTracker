export default class ShowsService {
  constructor() {
    this.baseUrl = 'api/shows';
  }

  async searchMovies(query, pageNumber) {
    return await fetch(`${this.baseUrl}/search?query=${query}&page=${pageNumber}`)
      .then(response => {
        if (!response.ok) {
          this.handleResponseError(response);
        };

        return response.json();
      });
  }

  async getShow(id) {
    return await fetch(`${this.baseUrl}/${id}`)
      .then(response => {
        if (!response.ok) {
          this.handleResponseError(response);
        };

        return response.json();
      });
  }

  async getSeason(seriesId, seasonNumber) {
    return await fetch(`${this.baseUrl}/${seriesId}/seasons/${seasonNumber}`)
      .then(response => {
        if (!response.ok) {
          this.handleResponseError(response);
        };

        return response.json();
      });
  }

  handleResponseError(response) {
    throw new Error("HTTP error, status = " + response.status);
  }
}