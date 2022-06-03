import '../pages/index.css';
import {
  popupProfile, popupCard, popupAvatar, profileEdit,
  profileAddButton, createCardButton, validationSettings, buttonAvatar,
  nameInput, jobInput, profile,
  popupFullsize, createButtonAvatar, profileImage, createProfileButton, config
} from '../utils/constants.js';
import Api from '../components/Api.js';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';
import Card from '../components/Card';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import FormValidator from '../components/FormValidator';

const api = new Api(config);

export const userInfo = new UserInfo(profile);

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
    selector: '.card-template', userId: userId, apiObj: api, handleCardClick: (cardPhoto) => {
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

//-- Слушаетль по клику на кнопку изменения профиля --//
profileEdit.addEventListener('click', () => {
  formValidators['edit_profile'].hideErorrs();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().about;
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
