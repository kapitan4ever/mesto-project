export const page = document.querySelector('.page');
export const popups = page.querySelectorAll('.popup');
export const validationSettings = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};
//profile
export const profileEdit = page.querySelector('.profile__edit');
export const profileAddButton = page.querySelector('.profile__add-button');
export const profileName = page.querySelector('.profile__title');
export const profileDescription = page.querySelector('.profile__description');
//popup profile
export const formProfile = document.forms.edit_profile;
export const popupProfile = page.querySelector('.popup__profile');
export const popupClose = page.querySelector('.popup__close');

//popup card
export const popupCard = page.querySelector('.popup__card');
export const popupCloseCard = popupCard.querySelector('.popup__close_card');
export const formPlace = document.querySelector('.form_type_place');
export const createCardButton = popupCard.querySelector('.form__submit[name=create-card-button]');
//form
export const formElement = page.querySelector('.form');
export const formInput = formElement.querySelector('.form__input');
export const nameInput = formElement.querySelector('.form__input_type_name');
export const jobInput = formElement.querySelector('.form__input_type_about');
//popup image
export const popupFullsize = page.querySelector('#fullsize');
export const popupImage = popupFullsize.querySelector('.popup__image');
export const popupPlace = popupFullsize.querySelector('.popup__place');
export const closeImg = document.querySelector('.popup__close_img');
//default card
export const cards = page.querySelector('.cards');
export const cardTemplate = document.querySelector('.card-template').content;
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
