import '../pages/index.css';

import { enableValidation } from './validate.js';
import { openPopup, closePopup } from './modal.js';
import {
  popupProfile, popupCard, popupCloseCard, profileEdit,
  profileAddButton, profileName, profileDescription, cardsContainer,
  formPlace, createCardButton, popups, formProfile,
  nameInput, jobInput, validationSettings
} from './utils';
import { createCard } from './card.js';
import { editProfileInfo, renderUserData, fillCurrentInputs} from './profile.js';
import { getInitialCards, printError, getUserData, postCard, editProfile, renderLoading } from './api.js';

const addPopupButton = popupCard.querySelector('.form__button');

//закрытие модального окна по клику
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
});

//promise
let userId;

Promise.all([getUserData(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    cards.forEach(card => {
      const initialCards = createCard(card.name, card.link, card._id, card.likes.length, card.likes.some(item => item._id === userId));
      const cardRemove = initialCards.querySelector('.card__remove');
      if (card.owner._id !== userId) {
        cardRemove.remove();
      };
      cardsContainer.append(initialCards);
    })
    renderUserData(userData);
  })
  .catch(printError);


//профиль
profileEdit.addEventListener('click', () => {

    openPopup(popupProfile);
    fillCurrentInputs(popupProfile);
});

formProfile.addEventListener('submit', editProfileInfo);

//карточки
profileAddButton.addEventListener('click', () => {
  openPopup(popupCard);
});

formPlace.addEventListener('submit', function (evt) {
  evt.preventDefault();
  renderLoading(true, addPopupButton);
  const cardName = formPlace.name.value;
  const cardLink = formPlace.link.value;
  postCard(cardName, cardLink)
    .then(card => cardsContainer.prepend(createCard(cardName, cardLink, card._id)))
    .then(() => {
      formPlace.reset();
      createCardButton.classList.add('popup__button_disabled');
      createCardButton.disabled = true;
      closePopup(popupCard);
    })
    .catch(printError)
    .finally(() => renderLoading(false, addPopupButton));
});

//валидация
enableValidation(validationSettings);
