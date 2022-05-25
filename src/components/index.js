import '../pages/index.css';
import { enableValidation, hideErorrs } from './validate.js';
import { openPopup, closePopup } from './modal.js';
import {
  popupProfile, popupCard, popupAvatar, profileEdit,
  profileAddButton, cardsContainer,
  formPlace, createCardButton, formProfile,
  validationSettings, editAvatar, buttonAvatar,
  profileName, profileDescription, nameInput, jobInput, config, profile
} from './utils';
import { createCard, likes, isLiked, clickLikeButton } from './card.js';
import { editProfileInfo, renderUserData, editAvatarImg } from './profile.js';
import { getInitialCards, printError, getUserData, postCard } from './api.js';
import { Api } from './ApiClass.js';
import { Section } from './SectionClass.js';
import { UserInfo } from './UserInfo.js';
import {Popup} from './Popup.js';

const addPopupButton = popupCard.querySelector('.form__button');

export const api = new Api(config.baseUrl, config.headers);

export const userInfo = new UserInfo(profile);
userInfo.getUserInfo();

api.getInitialCards()
  .then((cards) => {
    const section = new Section(cards, '.cards');
    section.renderCards();
  });

const popupUser = new Popup(popupProfile);
popupUser.setEventListeners();
const popupC = new Popup(popupCard);
popupC.setEventListeners();
const popupA = new Popup(popupAvatar);
popupA.setEventListeners();

profileEdit.addEventListener('click', () => {
  hideErorrs(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  popupUser.open();
});

buttonAvatar.addEventListener('click', () => {
  hideErorrs(popupAvatar);
  popupA.open();
});

//cards
profileAddButton.addEventListener('click', () => {
  popupC.open();
});

//Сабмиты форм

//profile
formProfile.addEventListener('submit', editProfileInfo);

//avatar
editAvatar.addEventListener('submit', function (evt) {
  evt.preventDefault();
  editAvatarImg();
});

//card
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



//validation
enableValidation(validationSettings);

export function renderLoading(isLoading, button) {
  if (button.name === 'create-card-button') {
    button.textContent = isLoading ? 'Сохранение...' : 'Создать'
  } else {
    button.textContent = isLoading ? 'Сохранение...' : 'Сохранить'
  }
}


