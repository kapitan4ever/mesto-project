import '../pages/index.css';
import { enableValidation, hideErorrs } from './validate.js';
import { openPopup, closePopup } from './modal.js';
import {
  popupProfile, popupCard, popupAvatar, profileEdit,
  profileAddButton, cardsContainer,
  formPlace, createCardButton, formProfile,
  validationSettings, editAvatar, buttonAvatar,
  profileName, profileDescription, nameInput, jobInput, config, profile, popupImage,
  popupPlace, popupFullsize, createButtonAvatar, profileAvatar, profileImage, createProfileButton
} from './utils';
import { createCard } from './card.js';
import { editProfileInfo, editAvatarImg } from './profile.js';
import { printError, postCard } from './api.js';
import { Api } from './ApiClass.js';
import Section from './SectionClass.js';
import { UserInfo } from './UserInfo.js';
import Popup from './Popup.js';
import Card from './CardClass';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';

const addPopupButton = popupCard.querySelector('.form__button');

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
              popupImage.setAttribute('src', cardPhoto.src);
              popupPlace.textContent = cardPhoto.alt;
              popupFull.open();
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
      .finally(() => renderLoading(false, createButtonAvatar));
  }
});

avatarPopup.setEventListeners();//слушатель аватара

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
      .finally(() => renderLoading(false, createProfileButton));
  }
});
userPopup.setEventListeners();

const cardPopup = new PopupWithForm({
  popupSelector: popupCard,
  handleFormSubmit: (res) => {
    api.renderLoading(true, createCardButton);
    api.postCard(res['name'], res['link'])
      .then(res => {
        console.log(res)
      })
      .catch(api._printError())
      .finally(() => renderLoading(false, createCardButton));
  }
});

cardPopup.setEventListeners();

profileEdit.addEventListener('click', () => {
  hideErorrs(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  userPopup.open();
});

buttonAvatar.addEventListener('click', () => {
  hideErorrs(popupAvatar);
  avatarPopup.open();
});

//cards
profileAddButton.addEventListener('click', () => {
  cardPopup.open();
});

/*
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
      this.close(popupCard);
    })
    .catch(printError)
    .finally(() => renderLoading(false, addPopupButton));
});*/

//validation
enableValidation(validationSettings);

export function renderLoading(isLoading, button) {
  if (button.name === 'create-card-button') {
    button.textContent = isLoading ? 'Сохранение...' : 'Создать'
  } else {
    button.textContent = isLoading ? 'Сохранение...' : 'Сохранить'
  }
}
