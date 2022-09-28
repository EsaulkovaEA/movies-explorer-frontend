class MoviesApi {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    _checkPromise(res) {
      if (res.ok) {
        return res.json();
      } return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}/beatfilm-movies`, {
        method: "GET",
        headers: this._headers,
      })
      .then((res) => this._checkPromise(res));
    }
  } 
  
  export const moviesApi = new MoviesApi({
    baseUrl: "https://api.nomoreparties.co",
    headers: {
      "Content-Type": "application/json",
    },
  });
  