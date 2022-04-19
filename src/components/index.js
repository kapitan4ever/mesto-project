import '../pages/index.css';
import { enableValidation } from './validate';
import { openPopup, closePopup } from './modal';
import {
  popupProfile, popupCard, profileEdit,
  profileAddButton, profileName, profileDescription, cards,
  formPlace, initialCards, popups, formProfile, nameInput, jobInput, validationSettings
} from './utils';
import { createCard, addCard } from './card.js';
import { fillProfileInputs, handleProfileFormSubmit, hideErorrs } from './profile.js';

//закрытие модального окна по клику
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
});
//профиль
profileEdit.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupProfile);
});

formProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;// Вставьте новые значения с помощью textContent
  profileDescription.textContent = jobInput.value;// Вставьте новые значения с помощью textContent
  formProfile.reset();//сброс всех полей формы
  closePopup(popupProfile);
});
//карточки
profileAddButton.addEventListener('click', () => {
  openPopup(popupCard);
});
//card
formPlace.addEventListener('submit', function (evt) {
  evt.preventDefault();
  addCard(cards, createCard(formPlace.name.value, formPlace.link.value));
  formPlace.reset();
  closePopup(popupCard);
});

initialCards.forEach(card => {
  addCard(cards, createCard(card.name, card.link));
});


//валидация
enableValidation(validationSettings);
