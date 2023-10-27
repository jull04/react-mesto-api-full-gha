class Api {
  constructor({ baseUrl }) {
    this._url = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInfo(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._checkResponse);
  }

  getCards(token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._checkResponse);
  }

  setUserInfo(data, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
          name: data.firstname,
          about: data.job,
      })
    })
    .then(this._checkResponse);
  }

  setAvatar(data, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
          avatar: data.avatar,
      })
    })
    .then(this._checkResponse);
  }

  addCard(data, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.title,
        link: data.link,
      })
    })
    .then(this._checkResponse);
  }

  putLike(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._checkResponse);
  }
  
  deleteLike(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._checkResponse)
  }
    
  deleteCard(cardId, token){
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._checkResponse)
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
}); 

export default api 