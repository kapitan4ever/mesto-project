const page = document.querySelector('.page');
const popupProfile = page.querySelector('.popup__profile');
const profileEdit = document.querySelector('.profile__edit');
const popupCard = document.querySelector('.popup__card');
const profileAddButton = document.querySelector('.profile__add-button');
const popupClose = document.querySelector('.popup__close');
const popupCloseCard = document.querySelector('.popup__close_card');
const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content;
const addCardForm = popupCard.querySelector('.form');
const popupFullsize = page.querySelector('#fullsize');

//функции открытия и закрытия попапа профиля
function showPopupProfile(popup) {
  popupProfile.classList.add('popup_opened');
}
function hidePopupProfile(popup) {
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

  nameInput.value = '';
  jobInput.value = '';
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
  cardElement.querySelector('.card__photo').alt = element.name;
  cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  });
  //удаление карточки
  const cardRemove = cardElement.querySelector('.card__remove');
  cardRemove.addEventListener('click', () => {
    const cardItem = cardRemove.closest('.card');
    cardItem.remove();
  });
  // увеличение по клику
  cardElement.querySelector('.card__photo').addEventListener('click', () => {
    popupFullsize.classList.add('popup_opened');
    popupFullsize.querySelector('.popup__image').src = element.link;
    popupFullsize.querySelector('.popup__image').alt = element.name;
    popupFullsize.querySelector('.popup__place').textContent = element.name;
  });
  // закрытие картики fullsize
  const closeImg = document.querySelector('.popup__close_img');
  closeImg.addEventListener('click', () => {
    popupFullsize.classList.remove('popup_opened');
  });

  cards.append(cardElement);
});

//сохранение новой карточки места
const formPlace = document.querySelector('.form_type_place');

function formSubmitCard(evt) {
  evt.preventDefault();// Эта строчка отменяет стандартную отправку формы.

  const inputPlace = formPlace.querySelector('.form__input_type_place');
  const inputLink = formPlace.querySelector('.form__input_type_link');

  const createCard = document.querySelector('.card-template').content;
  const createElement = createCard.querySelector('.card').cloneNode(true);

  // наполняем содержимым
  createElement.querySelector('.card__photo').src = inputLink.value;
  createElement.querySelector('.card__title').textContent = inputPlace.value;
  createElement.querySelector('.card__photo').alt = inputPlace.value;
  // удаление карточки
  const cardRemove = createElement.querySelector('.card__remove');
  cardRemove.addEventListener('click', () => {
    const cardItem = cardRemove.closest('.card');
    cardItem.remove();
  });
  // лайк
  createElement.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  });
  // увеличение по клику
  createElement.querySelector('.card__photo').addEventListener('click', () => {
    popupFullsize.classList.add('popup_opened');
    popupFullsize.querySelector('.popup__image').src = inputLink.value;
    popupFullsize.querySelector('.popup__image').alt = inputPlace.value;
    popupFullsize.querySelector('.popup__place').textContent = inputPlace.value;
  });
  // закрытие картики fullsize
  const closeImg = document.querySelector('.popup__close_img');
  closeImg.addEventListener('click', () => {
    popupFullsize.classList.remove('popup_opened');
  });

  // отображаем на странице
  cards.prepend(createElement);
  // очистка полей
  inputLink.value = '';
  inputPlace.value = '';
}

formPlace.addEventListener('submit', formSubmitCard);
formPlace.addEventListener('submit', hidePopupCard);
formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', hidePopupProfile);

