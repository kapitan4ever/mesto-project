import { cardTemplate, popupFullsize, popupImage, popupPlace } from './utils';
import { openPopup } from './modal';
import { deleteCard, printError, addLike, deleteLike } from './api';

//function add cards
export function createCard(card, userId) {
  const { likes, name, link, isLiked, cardId, owner } = card;

  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardPhoto = cardElement.querySelector('.card__photo');
  const cardRemove = cardElement.querySelector('#card__remove');
  const cardLikeButton = cardElement.querySelector('#card__like-id');
  const cardLikeCount = cardElement.querySelector('.card__like-counter');

  cardTitle.textContent = card.name;
  cardPhoto.src = card.link;
  cardPhoto.alt = card.name;
  cardLikeCount.textContent = card.likes.length;

  cardLikeButton.addEventListener('click', (evt) => {
    clickLikeButton(cardLikeButton, cardLikeCount, card._id);
  });

  cardRemove.addEventListener('click', function () {
    deleteCard(card._id)
      .then(() => {
        const cardItem = cardRemove.closest('.card');
        cardItem.remove();
      })
      .catch(printError)
  });

  if (card.likes.some(item => item._id === userId)) {

    cardLikeButton.classList.add('card__like_active');
  }

  if (card.owner._id !== userId) {
    cardRemove.remove();
  }

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

