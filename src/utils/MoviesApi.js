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
  
    // likeCard(id) {
    //   return fetch(`${this._baseUrl}/cards/${id}/likes`, {
    //     method: "PUT",
    //     headers: this._headers,
    //   })
    //   .then((res) => this._checkPromise(res));
    // }
  
    // dislikeCard(id) {
    //   return fetch(`${this._baseUrl}/cards/${id}/likes`, {
    //     method: "DELETE",
    //     headers: this._headers,
    //   })
    //   .then((res) => this._checkPromise(res));
    // }
  
//     editAvatar(link) {
//       return fetch(`${this._baseUrl}/users/me/avatar`, {
//         method: "PATCH",
//         headers: this._headers,
//         body: JSON.stringify({
//           avatar: link
//         })
//       })
//       .then((res) => this._checkPromise(res));
//     }
  } 
  
  export const moviesApi = new MoviesApi({
    baseUrl: "https://api.nomoreparties.co",
    headers: {
      "Content-Type": "application/json",
    },
  });
  