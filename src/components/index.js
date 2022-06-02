import '../pages/index.css';
import {
  popupProfile, popupCard, popupAvatar, profileEdit,
  profileAddButton, createCardButton, validationSettings, buttonAvatar,
  profileName, profileDescription, nameInput, jobInput, profile,
  popupFullsize, createButtonAvatar, profileImage, createProfileButton
} from './utils';
import { api } from './Api.js';
import Section from './Section.js';
import { UserInfo } from './UserInfo.js';
import Card from './Card';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import { FormValidator } from './FormValidator';

const userInfo = new UserInfo(profile);
userInfo.getUserInfo();

const popupFull = new PopupWithImage(popupFullsize);
popupFull.setEventListeners();

//=====
const sectionCard = new Section({ renderer: (cardItem) => createCard(cardItem) }, '.cards');
//=====

const createCard = (cardItem) => {
  const card = new Card(cardItem, {
    selector: '.card-template', handleCardClick: (cardPhoto) => {
      cardPhoto.addEventListener('click', () => {
        popupFull.open(cardPhoto);
      })
    }
  });
  //-- Наполняем созданный объект данными --//
  const cardElement = card.generate();
  //-- Добавляем готовую карточку в разметку --//
  sectionCard.addItem(cardElement);
}

api.getInitialCards()
  //-- Получили массив карточек с сервера --//
  .then((cards) => {
    sectionCard.renderItems(cards);
  });

//-- Создаем объект попапа с формой для редактирования Аватара --//
const avatarPopup = new PopupWithForm({
  popupSelector: popupAvatar,
  //-- Колбэк функция для сабмита форрмы  --//
  handleFormSubmit: (getInputValues) => {
    api.renderLoading(true, createButtonAvatar);
    api.editAvatarProfile(getInputValues['avatar-link'])
      .then(response => {
        profileImage.src = response.avatar;
      })
      .catch(api._printError())
      .finally(() => api.renderLoading(false, createButtonAvatar));
  }
});
//-- Слушатели на закрытие по нажатию на оверлей и крестик --//
avatarPopup.setEventListeners();

//-- Валидация полей формы попапа с аватаром --//
const avatarValidator = new FormValidator(validationSettings, avatarPopup);
avatarValidator.enableValidation();

//-- Создаем объект попапа с формой для редактирования пользователя --//
const userPopup = new PopupWithForm({
  popupSelector: popupProfile,
  //-- Колбэк функция для сабмита форрмы  --//
  handleFormSubmit: (getInputValues) => {
    api.renderLoading(true, createProfileButton);
    api.editProfile(getInputValues['name'], getInputValues['description'])
      .then(response => {
        profileName.textContent = response.name;
        profileDescription.textContent = response.about;
      })
      .catch(api._printError())
      .finally(() => api.renderLoading(false, createProfileButton));
  }
});

//-- Слушатели на закрытие по нажатию на оверлей и крестик --//
userPopup.setEventListeners();

//-- Валидация полей формы попапа с пользователем --//
const profileValidator = new FormValidator(validationSettings, userPopup);
profileValidator.enableValidation();

//-- Создаем объект попапа с формой для добавления карточки --//
const cardPopup = new PopupWithForm({
  popupSelector: popupCard,
  handleFormSubmit: (getInputValues) => {
    api.renderLoading(true, createCardButton);
    api.postCard(getInputValues['name'], getInputValues['link'])
      .then((response) => {
        sectionCard.renderItems(response);
      })
      .catch(api._printError())
      .finally(() => api.renderLoading(false, createCardButton));
  }
});

//-- Слушатели на закрытие по нажатию на оверлей и крестик --//
cardPopup.setEventListeners();

//-- Валидация полей формы попапа с карточкой --//
const cardValidator = new FormValidator(validationSettings, cardPopup);
cardValidator.enableValidation();

//-- Слушаетль по клику на кнопку изменения профиля --//
profileEdit.addEventListener('click', () => {
  profileValidator.hideErorrs();
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  userPopup.open();
});

//-- Слушаетль по клику на кнопку обновления аватара --//
buttonAvatar.addEventListener('click', () => {
  avatarValidator.hideErorrs();
  avatarPopup.open();
});

//-- Слушаетль по клику на кнопку дабавления карточки --//
profileAddButton.addEventListener('click', () => {
  cardValidator.hideErorrs();
  cardPopup.open();
});
