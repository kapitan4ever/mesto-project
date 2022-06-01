import '../pages/index.css';
import {
  popupProfile, popupCard, popupAvatar, profileEdit,
  profileAddButton, createCardButton, validationSettings, buttonAvatar,
  profileName, profileDescription, nameInput, jobInput, profile,
  popupFullsize, createButtonAvatar, profileImage, createProfileButton
} from '../utils/constants.js';
import { api } from './Api';
import Section from './Section';
import { UserInfo } from './UserInfo';
import Card from './Card';
import PopupWithImage from './PopupWithImage';
import PopupWithForm from './PopupWithForm';
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
  })
  .catch(api.printError());

//-- Создаем объект попапа с формой для редактирования Аватара --//
const avatarPopup = new PopupWithForm({
  popup: popupAvatar,
  //-- Колбэк функция для сабмита форрмы  --//
  handleFormSubmit: (res) => {
    avatarPopup.renderLoading(true, createButtonAvatar);
    api.editAvatarProfile(res['avatar-link'])
      .then(res => {
        profileImage.src = res.avatar;
        avatarPopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => avatarPopup.renderLoading(false, createButtonAvatar));
  }
});
//-- Слушатели на закрытие по нажатию на оверлей и крестик --//
avatarPopup.setEventListeners();

//-- Валидация полей формы попапа с аватаром --//
const avatarValidator = new FormValidator(validationSettings, avatarPopup);
avatarValidator.enableValidation();

//-- Создаем объект попапа с формой для редактирования пользователя --//
const userPopup = new PopupWithForm({
  popup: popupProfile,
  //-- Колбэк функция для сабмита форрмы  --//
  handleFormSubmit: (res) => {
    userPopup.renderLoading(true, createProfileButton);
    api.editProfile(res['name'], res['description'])
      .then(res => {
        profileName.textContent = res.name;
        profileDescription.textContent = res.about;
        userPopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => userPopup.renderLoading(false, createProfileButton));
  }
});

//-- Слушатели на закрытие по нажатию на оверлей и крестик --//
userPopup.setEventListeners();

//-- Валидация полей формы попапа с пользователем --//
const profileValidator = new FormValidator(validationSettings, userPopup);
profileValidator.enableValidation();

//-- Создаем объект попапа с формой для добавления карточки --//
const cardPopup = new PopupWithForm({
  popup: popupCard,
  handleFormSubmit: (res) => {
    cardPopup.renderLoading(true, createCardButton);
    api.postCard(res['name'], res['link'])
      .then((response) => {
        sectionCard.renderItems(response);
        cardPopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => cardPopup.renderLoading(false, createCardButton));
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
