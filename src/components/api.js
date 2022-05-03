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
    headers: {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(responseCheck)
    .catch(printError)
};

//add new card to server
export const postCard = (name, link) => {
  return fetch(`${API_URL}/cards`, {
    method: 'POST',
    headers: {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    },
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
    headers: {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
};

//liked card
export const addLike = (cardId) => {
  return fetch(`${API_URL}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
};

//unliked card
export const deleteLike = (cardId) => {
  return fetch(`${API_URL}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
};

//upload data profile from server
export const getUserData = () => {
  return fetch(`${API_URL}/users/me`, {
    headers: {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(responseCheck)
};
//setting profile
export const editProfile = (name, description) => {
  return fetch(`${API_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: description
    })
  })
};

export const editAvatarProfile = (avatarLink) => {
  return fetch(`${API_URL}/users/me/avatar`, {
    method: 'PATCH',
    body: JSON.stringify({
      avatar: avatarLink
    }),
    headers: {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
}


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

