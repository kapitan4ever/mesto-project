export const page = document.querySelector('.page');
export const content = page.querySelector('.content');
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
export const profileImage = content.querySelector('.profile__image');
//popup profile
export const formProfile = document.forms.edit_profile;
export const popupProfile = page.querySelector('.popup__profile');
export const popupClose = page.querySelector('.popup__close');
//avatar
export const popupAvatar = page.querySelector('.popup__avatar');
export const editAvatar = document.querySelector('#edit_avatar');
export const linkAvatar = document.querySelector('#avatar-link');
export const saveAvatar = popupAvatar.querySelector('#save-avatar');
export const profileAvatar = document.querySelector('.profile__image');
export const buttonAvatar = content.querySelector('.profile__avatar-edit');
export const createButtonAvatar = popupAvatar.querySelector('.form__submit[name=create-avatar-button]');
//popup card
export const popupCard = page.querySelector('.popup__card');
export const popupCloseCard = popupCard.querySelector('.popup__close_card');
export const formPlace = document.querySelector('.form_type_place');
export const createCardButton = popupCard.querySelector('.form__submit[name=create-card-button]');
//form
export const formElement = page.querySelector('.form');
export const formInput = formElement.querySelector('.form__input');
export const nameInput = formElement.querySelector('.form__input[name=name]');
export const jobInput = formElement.querySelector('.form__input[name=description]');
//popup image
export const popupFullsize = page.querySelector('#fullsize');
export const popupImage = popupFullsize.querySelector('.popup__image');
export const popupPlace = popupFullsize.querySelector('.popup__place');
export const closeImg = document.querySelector('.popup__close_img');
//default card
export const cardsContainer = page.querySelector('.cards');
export const cardTemplate = document.querySelector('.card-template').content;
//api
export const API_URL = 'https://nomoreparties.co/v1/plus-cohort-9'
export const token = 'a4afe3fb-fc08-4be7-8f57-5e8ad24d8399'
