/*export default class Api {
  constructor({ baseUrl, headers }) {
    // тело конструктора
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _responseCheck(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  _printError(error) {
    console.log(`Ошибка: ${error}`);
  }

  getInitialCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(this._responseCheck)
  };

  postCard = (nameCard, linkCard) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: nameCard,
        link: linkCard
      })
    })
      .then(responseCheck)
  };

  deleteCard = (cardId) => {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(responseCheck)
  };

  addLike = (cardId) => {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(responseCheck)
  };

  deleteLike = (cardId) => {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(responseCheck)
  };

  getUserData = () => {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
      .then(responseCheck)
  };

  editProfile = (name, description) => {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: description
      })
    })
      .then(responseCheck)
  };

  editAvatarProfile = (avatarLink) => {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
      .then(responseCheck)
  }
}

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9',
  headers: {
    authorization: 'a4afe3fb-fc08-4be7-8f57-5e8ad24d8399',
    'Content-Type': 'application/json'
  }
});
*/
