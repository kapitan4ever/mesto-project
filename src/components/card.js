import { cardTemplate, popupFullsize, popupImage, popupPlace, popupCard, formPlace} from './utils';
import { openPopup } from './modal';

//функция добавления карточек
export function createCard(name, link) {
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

export function addCard(cards, cardElement) {
  cards.prepend(cardElement);
}


