class Api {
  constructor(baseUrl, headers){
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
    .then(responseCheck)
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
    .then(responseCheck)
};

//delete card
  deleteCard = (cardId) => {
  return fetch(`${this.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: this.headers
  })
    .then(responseCheck)
};

//liked card
  addLike = (cardId) => {
  return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: this.headers
  })
    .then(responseCheck)
};

//unliked card
  deleteLike = (cardId) => {
  return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: this.headers
  })
    .then(responseCheck)
};

//upload data profile from server
  getUserData = () => {
  return fetch(`${this.baseUrl}/users/me`, {
    headers: this.headers
  })
    .then(responseCheck)
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

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9',
  headers: {
    authorization: 'a4afe3fb-fc08-4be7-8f57-5e8ad24d8399',
    'Content-Type': 'application/json',
  }
}

export const api = new Api(config.baseUrl, config.headers);
console.log(api.getUserInfo());




export function responseCheck(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export function printError(error) {
  console.log(`Ошибка: ${error}`);
}

//upload cards from server
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(responseCheck)
};

//add new card to server
export const postCard = (nameCard, linkCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: nameCard,
      link: linkCard
    })
  })
    .then(responseCheck)
};

//delete card
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(responseCheck)
};

//liked card
export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(responseCheck)
};

//unliked card
export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(responseCheck)
};

//upload data profile from server
export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(responseCheck)
};
//setting profile
export const editProfile = (name, description) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: description
    })
  })
    .then(responseCheck)
};

export const editAvatarProfile = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
    .then(responseCheck)
}
