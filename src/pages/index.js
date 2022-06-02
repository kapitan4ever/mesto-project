import '../pages/index.css';
import {
  popupProfile, popupCard, popupAvatar, profileEdit,
  profileAddButton, createCardButton, validationSettings, buttonAvatar,
  nameInput, jobInput, profile,
  popupFullsize, createButtonAvatar, profileImage, createProfileButton
} from '../utils/constants.js';
import { api } from '../components/Api';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';
import Card from '../components/Card';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import FormValidator from '../components/FormValidator';

export const userInfo = new UserInfo(profile);

const popupFull = new PopupWithImage(popupFullsize);
popupFull.setEventListeners();

//=====
const sectionCard = new Section({ renderer: (cardItem) => createCard(cardItem) }, '.cards');
//=====
export let userId;
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    sectionCard.renderItems(cards);
  })
  .catch(api.printError);

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

//-- Создаем объект попапа с формой для редактирования Аватара --//
const avatarPopup = new PopupWithForm({
  popup: popupAvatar,
  //-- Колбэк функция для сабмита форрмы  --//
  handleFormSubmit: (resultInputsForm) => {
    avatarPopup.renderLoading(true, createButtonAvatar);
    api.editAvatarProfile(resultInputsForm['avatar-link'])
      .then((response) => {
        profileImage.src = response.avatar;
        avatarPopup.close();
      })
      .catch(api.printError)
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
  handleFormSubmit: (resultInputsForm) => {
    userPopup.renderLoading(true, createProfileButton);
    api.editProfile(resultInputsForm['name'], resultInputsForm['description'])
      .then(res => {
        userInfo.setUserInfo(res);
        userPopup.close();
      })
      .catch(api.printError)
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
  handleFormSubmit: (resultInputsForm) => {
    cardPopup.renderLoading(true, createCardButton);
    api.postCard(resultInputsForm['name'], resultInputsForm['link'])
      .then((response) => {
        sectionCard.renderItems(response);
        cardPopup.close();
      })
      .catch(api.printError)
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
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().about;
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
