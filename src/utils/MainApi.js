class MainApi {
    constructor({ baseUrl, baseMovieUrl, headers }) {
      this._baseUrl = baseUrl;
      this._baseMovieUrl = baseMovieUrl;
      this._headers = headers;
    }
  
    _checkPromise(res) {
      if (res.ok) {
        return res.json();
      } return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    getInitialProfile() {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          }
      })
        .then((res) => this._checkPromise(res));
    }
  
    editProfile({ name, email }) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          },
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      })
      .then((res) => this._checkPromise(res));
    }
  
  register (name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name, email, password})
    })
    .then((res) => this._checkPromise(res));
    };
  
    authorize (email, password) {
      return fetch(`${this._baseUrl}/signin`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({email, password})
      })
      .then((res) => this._checkPromise(res));
      };
    
      getContent = (token) => {
        return fetch(`${this._baseUrl}/users/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        })
        .then(res => this._checkPromise(res))
      }

      saveMovie(movie, token) {
        return fetch(`${this._baseUrl}/movies`, {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            country: movie.country ? movie.country : 'default',
            director: movie.director ? movie.director : 'default',
            duration: movie.duration ? movie.duration : 0,
            year: movie.year ? movie.year : 0,
            description: movie.description ? movie.description : 'default',
            image: movie.image.url ? this._baseMovieUrl + movie.image.url : movie.image,
            trailerLink: movie.trailerLink,
            nameRU: movie.nameRU ? movie.nameRU : 'default',
            nameEN: movie.nameEN ? movie.nameEN : 'default',
            thumbnail: movie.thumbnail ? movie.thumbnail : this._baseMovieUrl + movie.image.formats.thumbnail.url,
            movieId: movie.id,
          }),
        })
          .then(res => this._checkPromise(res));
      }

      deleteCard(id) {
        return fetch(`${this._baseUrl}/movies/${id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
            "Content-Type": "application/json",
          },
        })
          .then(res => this._checkPromise(res));
      }

      getSavedCards() {
        return fetch(`${this._baseUrl}/movies`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        })
        .then((res) => this._checkPromise(res));
      }
  }
  
  export const auth = new MainApi({
    baseUrl: "https://api.esaulkovamovies.nomoredomains.sbs",
    baseMovieUrl: "https://api.nomoreparties.co",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
  });
  