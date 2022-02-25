const page = document.querySelector('.page');
const popupProfile = document.querySelector('.popup__profile');
const profileEdit = document.querySelector('.profile__edit');
const popupCard = document.querySelector('.popup__card');
const profileAddButton = document.querySelector('.profile__add-button');
const popupClose = document.querySelector('.popup__close');
const popupCloseCard = document.querySelector('.popup__close_card');
const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content;
const addCardForm = popupCard.querySelector('.form');

//функции открытия и закрытия попапа профиля
function showPopupProfile() {
  popupProfile.classList.add('popup_opened');
}
function hidePopupProfile() {
  popupProfile.classList.remove('popup_opened');
}
profileEdit.addEventListener('click', showPopupProfile);
popupClose.addEventListener('click', hidePopupProfile);
//функции открытия и закрытия попапа карточки
function showPopupCard() {
  popupCard.classList.add('popup_opened');
}
function hidePopupCard() {
  popupCard.classList.remove('popup_opened');
}
profileAddButton.addEventListener('click', showPopupCard);
popupCloseCard.addEventListener('click', hidePopupCard);
//функция редактирования профиля
const formElement = document.querySelector('.form');// Находим форму в DOM

function formSubmitHandler(evt) {
  evt.preventDefault();// Эта строчка отменяет стандартную отправку формы.

  let nameInput = formElement.querySelector('.form__input_type_name');
  let jobInput = formElement.querySelector('.form__input_type_about');

  let profileName = document.querySelector('.profile__title');
  let profileDescription = document.querySelector('.profile__description');

  profileName.textContent = nameInput.value;// Вставьте новые значения с помощью textContent
  profileDescription.textContent = jobInput.value;// Вставьте новые значения с помощью textContent
}

formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', hidePopupProfile);
//функция добавления карточек из массива
const initialCards = [
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

initialCards.forEach(function (element) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__title').textContent = element.name;
  cardElement.querySelector('.card__photo').src = element.link;
  cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  });
//удаление карточки
  const cardRemove = cardElement.querySelector('.card__remove');
  cardRemove.addEventListener('click', () => {
    const cardItem = cardRemove.closest('.card');
    cardItem.remove();
  });

  cards.append(cardElement);
});

//сохранение новой карточки места

//функция редактирования профиля
//const formElement = document.querySelector('.form');// Находим форму в DOM
const formPlace = page.querySelector('.form_type_place');

function formSubmitCard(evt) {
  evt.preventDefault();// Эта строчка отменяет стандартную отправку формы.

  //let nameInput = formPlace.querySelector('.form__input_type_name');
  //let jobInput = formPlace.querySelector('.form__input_type_about');
  const inputPlace = formPlace.querySelector('.form__input_type_place');
  const inputLink = formPlace.querySelector('.form__input_type_link');

  //let profileName = document.querySelector('.profile__title');
  //let profileDescription = document.querySelector('.profile__description');
  const cardTitle = document.querySelector('.card__title');
  const cardLink = document.querySelector('.card__photo');

  cardTitle.textContent = inputPlace.value;// Вставьте новые значения с помощью textContent
  cardLink.textContent = inputLink.value;// Вставьте новые значения с помощью textContent

}

formPlace.addEventListener('submit', formSubmitCard);
formPlace.addEventListener('submit', hidePopupProfile);
