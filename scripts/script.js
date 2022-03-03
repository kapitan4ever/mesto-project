const page = document.querySelector('.page');
const popupProfile = page.querySelector('.popup__profile');
const profileEdit = page.querySelector('.profile__edit');
const popupCard = page.querySelector('.popup__card');
const profileAddButton = page.querySelector('.profile__add-button');
const popupClose = page.querySelector('.popup__close');
const popupCloseCard = popupCard.querySelector('.popup__close_card');
const cards = page.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content;
const addCardForm = popupCard.querySelector('.form');
const popupFullsize = page.querySelector('#fullsize');
const formElement = page.querySelector('.form');
const nameInput = formElement.querySelector('.form__input_type_name');
const jobInput = formElement.querySelector('.form__input_type_about');
const profileName = page.querySelector('.profile__title');
const profileDescription = page.querySelector('.profile__description');
const formPlace = document.querySelector('.form_type_place');

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

//функции открытия и закрытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
};
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

//профиль
profileEdit.addEventListener('click', () => {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
});

popupClose.addEventListener('click', () => {
  closePopup(popupProfile);
});

//карточки
profileAddButton.addEventListener('click', () => {
  openPopup(popupCard);
});

popupCloseCard.addEventListener('click', () => {
  closePopup(popupCard);
});

//функция редактирования профиля
function submitFormHandler(evt) {
  evt.preventDefault();// Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;// Вставьте новые значения с помощью textContent
  profileDescription.textContent = jobInput.value;// Вставьте новые значения с помощью textContent
  closePopup(popupProfile);
}

//функция добавления карточек
function createCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardPhoto = cardElement.querySelector('.card__photo');
  const likeHeart = cardElement.querySelector('.card__like');
  const cardRemove = cardElement.querySelector('.card__remove');

  cardTitle.textContent = name;
  cardPhoto.src = link;
  cardPhoto.alt = name;
  likeHeart.addEventListener('click', function () {
    likeHeart.classList.toggle('card__like_active');
  });
  cardRemove.addEventListener('click', function () {
    const cardItem = cardRemove.closest('.card');
    cardItem.remove();
  });

  // увеличение по клику
  cardPhoto.addEventListener('click', () => {
    const popupImage = popupFullsize.querySelector('.popup__image');
    const popupPlace = popupFullsize.querySelector('.popup__place');
    popupImage.src = link;
    popupImage.alt = name;
    popupPlace.textContent = name;
    openPopup(popupFullsize);
  });
  // закрытие картики fullsize
  const closeImg = document.querySelector('.popup__close_img');
  closeImg.addEventListener('click', () => {
    closePopup(popupFullsize);
  });

  return cardElement;
};

function addCard(cards, cardElement) {
  cards.prepend(cardElement);
}

formPlace.addEventListener('submit', function (evt) {
  evt.preventDefault();
  addCard(cards, createCard(formPlace.name.value, formPlace.link.value));
  formPlace.reset();
  closePopup(popupCard);
});

initialCards.forEach(card => {
  addCard(cards, createCard(card.name, card.link));
});

formElement.addEventListener('submit', submitFormHandler);
