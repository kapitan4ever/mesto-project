const page = document.querySelector('.page');
const popups = page.querySelectorAll('.popup');
const popupProfile = page.querySelector('.popup__profile');
const profileEdit = page.querySelector('.profile__edit');
const popupCard = page.querySelector('.popup__card');
const profileAddButton = page.querySelector('.profile__add-button');
const popupClose = page.querySelector('.popup__close');
const popupCloseCard = popupCard.querySelector('.popup__close_card');
const cards = page.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content;
const popupFullsize = page.querySelector('#fullsize');
const formElement = page.querySelector('.form');
const formInput = formElement.querySelector('.form__input');
const nameInput = formElement.querySelector('.form__input_type_name');
const jobInput = formElement.querySelector('.form__input_type_about');
const profileName = page.querySelector('.profile__title');
const profileDescription = page.querySelector('.profile__description');
const formPlace = document.querySelector('.form_type_place');
const popupImage = popupFullsize.querySelector('.popup__image');
const popupPlace = popupFullsize.querySelector('.popup__place');
const closeImg = document.querySelector('.popup__close_img');

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
  document.addEventListener('keydown', escapeClosePopup);
};
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeClosePopup);
};
function escapeClosePopup(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

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
  //profileEdit.reset();//сброс всех полей формы
  openPopup(popupProfile);
});

//отслеживание заполнения формы Редактировать профиль
const formProfile = document.forms.edit_profile;

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
    popupImage.src = link;
    popupImage.alt = name;
    popupPlace.textContent = name;
    openPopup(popupFullsize);
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

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__button_disabled');
  } else {
        // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__button_disabled');
  }
};

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, formInput, errorMessage) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');// Показываем сообщение об ошибке
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, formInput) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');// Скрываем сообщение об ошибке
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, formInput) => {
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, formInput);
  }
};

formElement.addEventListener('submit', function (evt) {
  // Отменим стандартное поведение по сабмиту
  evt.preventDefault();
});

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__submit');

  toggleButtonState(inputList, buttonElement);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((formInput) => {
    // каждому полю добавим обработчик события input
    formInput.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, formInput);
      toggleButtonState(inputList, buttonElement);// Вызовем toggleButtonState и передадим ей массив полей и кнопку
    });
  });
};

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.form'));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation();


