export class Api {
  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  //методы
  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
  _printError(error) {
    console.log(`Ошибка: ${error}`);
  }

  getUserInfo = () => {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
      .then(this._checkResponse);
  }

  //upload cards from server
  getInitialCards = () => {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
      .then(this._checkResponse)
  };

  //add new card to server
  postCard = (nameCard, linkCard) => {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: nameCard,
        link: linkCard
      })
    })
      .then(this._checkResponse)
  };

  //delete card
  deleteCard = (cardId) => {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(this._checkResponse)
  };

  //liked card
  addLike = (cardId) => {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(this._checkResponse)
  };

  //unliked card
  deleteLike = (cardId) => {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(this._checkResponse)
  };

  //setting profile
  editProfile = (name, description) => {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: description
      })
    })
      .then(this._checkResponse)
  };

  editAvatarProfile = (avatarLink) => {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
      .then(this._checkResponse)
  }
}
