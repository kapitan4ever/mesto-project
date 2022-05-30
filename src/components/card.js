import { userIdent } from './UserInfo.js';
import { api } from './Api.js';

export default class Card {
  //свойства
  constructor({ link, name, likes, owner, _id }, { selector, handleCardClick }) {
    this._selector = selector;
    this._image = link;
    this._name = name;
    this._likes = likes;
    this._owner = owner._id;
    this._cardId = _id;
    this._handleCardClick = handleCardClick;
  }

  //-- Возвращает разметку черновика карточки --//
  _getCard() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  //-- Возвращает готовую карточку --//
  generate() {
    this._elementCard = this._getCard();
    this.cardPhoto = this._elementCard.querySelector('.card__photo');
    this.cardTitle = this._elementCard.querySelector('.card__title');
    this.cardLike = this._elementCard.querySelector('.card__like');
    this.cardLikeCount = this._elementCard.querySelector('.card__like-counter');
    this.deleteButton = this._elementCard.querySelector('.card__remove');
    this.cardTitle.textContent = this._name;
    this.cardPhoto.setAttribute('src', this._image);
    this.cardPhoto.setAttribute('alt', this._name);

    if (this._likes.some(like => like._id === userIdent)) {
      this.cardLike.classList.add('card__like_active');
    }
    if (this._owner !== userIdent) {
      this.deleteButton.remove();
    }
    this.cardLikeCount.textContent = this._likes.length;
    this._setEventListeners();
    this._handleCardClick(this.cardPhoto);
    return this._elementCard;
  }

  //-- Установка сллушаетелей для ллайков, удаления карточки --//
  _setEventListeners() {
    this._isLiked();
    this._removedCard();
  }

  //-- Уд-лени- карточки //
  _removedCard() {
    this.deleteButton.addEventListener('click', (evt) => {
      api.deleteCard(this._cardId)
        .then((res) => {
          evt.target.closest('.card').remove();
        })
        .catch(api._printError());
    });
  }

  //-- Слушат-ль клика по лайку -//
  _isLiked() {
    this.cardLike.addEventListener('click', () => {
      if (this.cardLike.classList.contains('card__like_active')) {
        api.deleteLike(this._cardId)
          .then(res => {
            this.cardLikeCount.textContent = res.likes.length;
            this.cardLike.classList.remove('card__like_active');
          })
          .catch(err => console.error(err))
      } else {
        api.addLike(this._cardId)
          .then(res => {
            this.cardLikeCount.textContent = res.likes.length;
            this.cardLike.classList.add('card__like_active');
          })
          .catch(err => console.error(err))
      }
    });
  }
}
