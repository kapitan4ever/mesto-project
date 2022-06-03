import '../pages/index.css';
import {
  popupProfile, popupCard, popupAvatar, profileEdit,
  profileAddButton, validationSettings, buttonAvatar,
  nameInput, jobInput,
  popupFullsize, profileImage, config
} from '../utils/constants.js';
import Api from '../components/Api.js';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';
import Card from '../components/Card';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import FormValidator from '../components/FormValidator';

const api = new Api(config);

const userInfoSelectors = {
  avatarSelector: '.profile__image',
  usernameSelector: '.profile__title',
  aboutUsernameSelector: '.profile__description'
};

const userInfo = new UserInfo(userInfoSelectors);

const popupFull = new PopupWithImage(popupFullsize);
popupFull.setEventListeners();

//=====
const sectionCard = new Section({ renderer: (cardItem) => createCard(cardItem) }, '.cards');
//=====
let userId;
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    sectionCard.renderItems(cards);
  })
  .catch(api.printError);

const createCard = (cardItem) => {
  const card = new Card(cardItem, {
    selectorTemplate: '.card-template', userId: userId, apiObj: api, popupFullSize: popupFull
  })
  //-- Наполняем созданный объект данными --//
  const cardElement = card.generate();
  //-- Добавляем готовую карточку в разметку --//
  sectionCard.addItem(cardElement);
};

//-- Создаем объект попапа с формой для редактирования Аватара --//
const avatarPopup = new PopupWithForm({
  popup: popupAvatar,
  //-- Колбэк функция для сабмита форрмы  --//
  handleFormSubmit: (resultInputsForm) => {
    avatarPopup.renderLoading(true);
    api.editAvatarProfile(resultInputsForm['avatar-link'])
      .then((response) => {
        userInfo.setUserInfo(response);
        avatarPopup.close();
      })
      .catch(api.printError)
      .finally(() => avatarPopup.renderLoading(false, 'Обновить'));
  }
});

//-- Слушатели на закрытие по нажатию на оверлей и крестик --//
avatarPopup.setEventListeners();

// Включение валидации
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')
    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSettings);

//-- Создаем объект попапа с формой для редактирования пользователя --//
const userPopup = new PopupWithForm({
  popup: popupProfile,
  //-- Колбэк функция для сабмита форрмы  --//
  handleFormSubmit: (resultInputsForm) => {
    userPopup.renderLoading(true);
    api.editProfile(resultInputsForm['name'], resultInputsForm['description'])
      .then(res => {
        userInfo.setUserInfo(res);
        userPopup.close();
      })
      .catch(api.printError)
      .finally(() => userPopup.renderLoading(false, 'Сохранить'));
  }
});

//-- Слушатели на закрытие по нажатию на оверлей и крестик --//
userPopup.setEventListeners();

//-- Создаем объект попапа с формой для добавления карточки --//
const cardPopup = new PopupWithForm({
  popup: popupCard,
  handleFormSubmit: (resultInputsForm) => {
    cardPopup.renderLoading(true);
    api.postCard(resultInputsForm['name'], resultInputsForm['link'])
      .then((response) => {
        sectionCard.renderItems(response);
        cardPopup.close();
      })
      .catch(api.printError)
      .finally(() => cardPopup.renderLoading(false, 'Создать'));
  }
});

//-- Слушатели на закрытие по нажатию на оверлей и крестик --//
cardPopup.setEventListeners();

//-- Слушаетль по клику на кнопку изменения профиля --//
profileEdit.addEventListener('click', () => {
  formValidators['edit_profile'].hideErorrs();
  const { name, about } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  userPopup.open();
});

//-- Слушаетль по клику на кнопку обновления аватара --//
buttonAvatar.addEventListener('click', () => {
  formValidators['edit_avatar'].hideErorrs();
  avatarPopup.open();
});

//-- Слушаетль по клику на кнопку дабавления карточки --//
profileAddButton.addEventListener('click', () => {
  formValidators['card'].hideErorrs();
  cardPopup.open();
});
