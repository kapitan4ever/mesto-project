import '../pages/index.css';

import { enableValidation, hideErorrs } from './validate.js';
import { openPopup, closePopup } from './modal.js';
import {
  popupProfile, popupCard, popupAvatar, profileEdit,
  profileAddButton, cardsContainer,
  formPlace, createCardButton, formProfile,
  validationSettings, editAvatar, buttonAvatar,
  profileName, profileDescription, nameInput, jobInput
} from './utils';
import { createCard, likes, isLiked, clickLikeButton } from './card.js';
import { editProfileInfo, renderUserData, editAvatarImg } from './profile.js';
import { getInitialCards, printError, getUserData, postCard } from './api.js';
import { api } from './ApiClass.js';
import { Card } from './CardClass.js';
import { Section } from './SectionClass.js';
import { UserInfo } from './UserInfo.js';
const addPopupButton = popupCard.querySelector('.form__button');

api.getInitialCards()
  .then((res) => {
      const section =  new Section(res, '.cards');
      section.renderCards();
  });

let userId;
Promise.all([getUserData(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    renderUserData(userData);
    cards.forEach((card) => {
      cardsContainer.append(createCard(card, userId));
    });
  })
  .catch(printError);

//profile
profileEdit.addEventListener('click', () => {
  hideErorrs(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
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
    .then(card => cardsContainer.prepend(createCard(card, userId)))
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
  if (button.name === 'create-card-button') {
    button.textContent = isLoading ? 'Сохранение...' : 'Создать'
  } else {
    button.textContent = isLoading ? 'Сохранение...' : 'Сохранить'
  }
}


