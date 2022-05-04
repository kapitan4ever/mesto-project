import '../pages/index.css';

import { enableValidation, hideErorrs } from './validate.js';
import { openPopup, closePopup } from './modal.js';
import {
  popupProfile, popupCard, popupAvatar, profileEdit,
  profileAddButton, cardsContainer,
  formPlace, createCardButton, formProfile,
  validationSettings, editAvatar, buttonAvatar
} from './utils';
import { createCard, likes, isLiked } from './card.js';
import { editProfileInfo, renderUserData, editAvatarImg } from './profile.js';
import { getInitialCards, printError, getUserData, postCard } from './api.js';

const addPopupButton = popupCard.querySelector('.form__button');

let userId;
//пытаюсь перенести  в card проверку лайка и иконку корзины,
//но ничего не выходит( в консоле нет ошибок и карточки не отображаются.
//Может есть пример как это сделать или где почитать?
Promise.all([getUserData(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    renderUserData(userData);
    cards.forEach(card => {
      const likes = card.likes.length;
      const isLiked = card.likes.some(item => item._id === userId);
      const initialCards = createCard(card.name, card.link, card._id, likes, isLiked);
      const cardRemove = initialCards.querySelector('.card__remove');
      if (card.owner._id !== userId) {
        cardRemove.remove();
      };
      cardsContainer.append(initialCards);
    })

  })
  .catch(printError);


//profile
profileEdit.addEventListener('click', () => {
  hideErorrs(popupProfile);
  openPopup(popupProfile);
});

formProfile.addEventListener('submit', editProfileInfo);

//cards
profileAddButton.addEventListener('click', () => {
  openPopup(popupCard);
});

formPlace.addEventListener('submit', function (evt) {
  evt.preventDefault();
  renderLoading(true, addPopupButton);
  const cardName = formPlace.name.value;
  const cardLink = formPlace.link.value;
  postCard(cardName, cardLink)
    .then(card => cardsContainer.prepend(createCard(cardName, cardLink, card._id, 0, false)))
    .then(() => {
      formPlace.reset();
      createCardButton.classList.add('popup__button_disabled');
      createCardButton.disabled = true;
      closePopup(popupCard);
    })
    .catch(printError)
    .finally(() => renderLoading(false, addPopupButton));
});

//avatar
buttonAvatar.addEventListener('click', () => {
  hideErorrs(popupAvatar);
  openPopup(popupAvatar);
});

editAvatar.addEventListener('submit', function (evt) {
  evt.preventDefault();
  editAvatarImg();
});

//validation
enableValidation(validationSettings);

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
