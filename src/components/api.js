import { API_URL, token } from './utils.js';

const config = {
  baseUrl: `${API_URL}`,
  headers: {
    authorization: `${token}`,
    'Content-Type': 'application/json'
  }
}

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
  return fetch(`${API_URL}/cards`, {
    headers: config.headers
  })
  .then(responseCheck)
  .catch(printError)
};

//add new card to server
export const postCard = (name, link) => {
  return fetch(`${API_URL}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
};

//delete card
export const deleteCard = (cardId) => {
  return fetch(`${API_URL}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
};

//liked card
export const addLike = (cardId, likes) => {
  return fetch(`${API_URL}/cards/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify({
      likes: likes
  })
  })
};

//unliked card
export const deleteLike = (cardId) => {
  return fetch(`${API_URL}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
};

//upload data profile from server
export const getUserData = () => {
  return fetch(`${API_URL}/users/me`, {
    headers: config.headers
  })
  .then(responseCheck)
};
//setting profile
export const editProfile = (name, description) => {
  return fetch(`${API_URL}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: description
    })
  })
};

export function renderLoading(isLoading, button) {
  if (isLoading) {
      button.textContent = 'Сохранение...';
      button.disabled = true;
  }
  else {
      if (button.classList.contains('popup__button_create')) {
          button.textContent = 'Создать';
      }
      else {
          button.textContent = 'Сохранить';
      }
      button.disabled = false;
  }
}

