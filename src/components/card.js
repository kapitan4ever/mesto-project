import { cardTemplate, popupFullsize, popupImage, popupPlace } from './utils';
import { openPopup } from './modal';
import { deleteCard, printError, addLike, deleteLike } from './api';


//function add cards
export function createCard(name, link, cardId, likesCount, isLiked, userId) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardPhoto = cardElement.querySelector('.card__photo');
  const cardRemove = cardElement.querySelector('.card__remove');
  const cardLikeButton = cardElement.querySelector('.card__like');
  const cardLikeCount = cardElement.querySelector('.card__like-counter');

  cardTitle.textContent = name;
  cardPhoto.src = link;
  cardPhoto.alt = name;
  cardLikeCount.textContent = likesCount;

  if (isLiked) cardLikeButton.classList.add('card__like_active');

  cardLikeButton.addEventListener('click', (evt) => {
    clickLikeButton(cardLikeButton, cardLikeCount, cardId);
  });

  cardRemove.addEventListener('click', function () {
    deleteCard(cardId)
      .then(() => {
        const cardItem = cardRemove.closest('.card');
        cardItem.remove();
      })
      .catch(printError)
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

export function clickLikeButton(cardLikeButton, cardLikeCount, cardId) {
  if (cardLikeButton.classList.contains('card__like_active')) {
    deleteLike(cardId)
      .then(res => {
        cardLikeCount.textContent = res.likes.length;
        cardLikeButton.classList.remove('card__like_active');
      })
      .catch(err => console.error(err))
  } else {
    addLike(cardId)
      .then(res => {
        cardLikeCount.textContent = res.likes.length;
        cardLikeButton.classList.add('card__like_active');
      })
      .catch(err => console.error(err))
  }
};

