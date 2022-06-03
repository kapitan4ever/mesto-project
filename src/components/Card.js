export default class Card {
  //свойства
  constructor({ link, name, likes, owner, _id }, { selectorTemplate, userId, apiObj, handleCardClick }) {
    this._selector = selectorTemplate;
    this._image = link;
    this._name = name;
    this._likes = likes;
    this._owner = owner._id;
    this._cardId = _id;
    this._userId = userId;
    this._api = apiObj;
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

    if (this._likes.some(like => like._id === this._userId)) {
      this.cardLike.classList.add('card__like_active');
    }
    if (this._owner !== this._userId) {
      this.deleteButton.remove();
    }
    this.cardLikeCount.textContent = this._likes.length;
    this._setEventListeners();
    return this._elementCard;
  }

  //-- Установка сллушаетелей для ллайков, удаления карточки --//
  _setEventListeners() {
    this._setLikeHandler();
    this._setDeleteHandler();
    this._handleCardClick(this.cardPhoto);
  }

  //-- Удаление карточки //
  _setDeleteHandler() {
    this.deleteButton.addEventListener('click', (evt) => {
      this._api.deleteCard(this._cardId)
        .then(() => evt.target.closest('.card').remove())
        .catch(this._api.printError);
    });
  }

  //-- Слушат-ль клика по лайку -//
  _setLikeHandler() {
    this.cardLike.addEventListener('click', () => {
      if (this.cardLike.classList.contains('card__like_active')) {
        this._api.deleteLike(this._cardId)
          .then(response => {
            this.cardLikeCount.textContent = response.likes.length;
            this.cardLike.classList.remove('card__like_active');
          })
          .catch(this._api.printError)
      } else {
        this._api.addLike(this._cardId)
          .then(response => {
            this.cardLikeCount.textContent = response.likes.length;
            this.cardLike.classList.add('card__like_active');
          })
          .catch(this._api.printError)
      }
    });
  }
}
