import '../pages/index.css';
import {
  popupProfile, popupCard, popupAvatar, profileEdit,
  profileAddButton,
  createCardButton,
  validationSettings, buttonAvatar,
  profileName, profileDescription, nameInput, jobInput, config, profile,
  popupFullsize, createButtonAvatar, profileImage, createProfileButton
} from './utils';
import { Api } from './Api.js';
import Section from './Section.js';
import { UserInfo } from './UserInfo.js';
import Card from './Card';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import { FormValidator } from './FormValidator';

export const api = new Api(config.baseUrl, config.headers);

export const userInfo = new UserInfo(profile);
userInfo.getUserInfo();

const popupFull = new PopupWithImage(popupFullsize);
popupFull.setEventListeners();

api.getInitialCards()
  //-- Получили массив карточек с сервера --//
  .then((cards) => {
    //-- Создаем объект секции куда загружать карточки --//
    //-- Передаем в контсруктор полученный массив карточек, функцию которая создает объект карточки для вставки--//
    const cardSection = new Section({
      arrayItems: cards,
      renderer: (cardItem) => {
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
        cardSection.addItem(cardElement);
      }
    }, '.cards');
    //-- Отрисовываем карточки с местами --//
    cardSection.renderItems();
  });

const avatarPopup = new PopupWithForm({
  popupSelector: popupAvatar,
  handleFormSubmit: (res) => {
    api.renderLoading(true, createButtonAvatar);
    api.editAvatarProfile(res['avatar-link'])
      .then(res => {
        profileImage.src = res.avatar;
      })
      .catch(api._printError())
      .finally(() => api.renderLoading(false, createButtonAvatar));
  }
});

avatarPopup.setEventListeners();//слушатель аватара

const avatarValidator = new FormValidator(validationSettings, avatarPopup);
avatarValidator.enableValidation();

const userPopup = new PopupWithForm({
  popupSelector: popupProfile,
  handleFormSubmit: (res) => {
    api.renderLoading(true, createProfileButton);
    api.editProfile(res['name'], res['description'])
      .then(res => {
        profileName.textContent = res.name;
        profileDescription.textContent = res.about;
      })
      .catch(api._printError())
      .finally(() => api.renderLoading(false, createProfileButton));
  }
});

userPopup.setEventListeners();

const profileValidator = new FormValidator(validationSettings, userPopup);
profileValidator.enableValidation();

const cardPopup = new PopupWithForm({
  popupSelector: popupCard,
  handleFormSubmit: (res) => {
    api.renderLoading(true, createCardButton);
    api.postCard(res['name'], res['link'])
      .then((response) => {
        const cardSectionTwo = new Section({
          arrayItems: response,
          renderer: (cardItem) => {
            console.log(cardItem);
            const cardOnly = new Card(cardItem, {
              selector: '.card-template', handleCardClick: (cardPhoto) => {
                cardPhoto.addEventListener('click', () => {
                  popupFull.open(cardPhoto);
                })
              }
            });
            //-- Наполняем созданный объект данными --//
            const cardElement = cardOnly.generate();
            console.log(cardElement);
            //-- Добавляем готовую карточку в разметку --//
            cardSectionTwo.addItem(cardElement);
            console.log(cardSectionTwo);
          }
        }, '.cards');
        //-- Отрисовываем карточки с местами --//
        cardSectionTwo.renderItems();
      })
      .catch(api._printError())
      .finally(() => api.renderLoading(false, createCardButton));
  }
});

cardPopup.setEventListeners();

const cardValidator = new FormValidator(validationSettings, cardPopup);
cardValidator.enableValidation();

profileEdit.addEventListener('click', () => {
  profileValidator.hideErorrs();
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  userPopup.open();
});

buttonAvatar.addEventListener('click', () => {
  avatarValidator.hideErorrs();
  avatarPopup.open();
});

//cards
profileAddButton.addEventListener('click', () => {
  cardValidator.hideErorrs();
  cardPopup.open();
});
