'use strict';
import { userIdent } from './UserInfo.js';
import { api } from './index.js';
import { PopupWithImage } from './PopupWithImage.js';
import { popupFullsize } from './utils.js';

export class Card {
  //свойства
  constructor(selector, { link, name, likes, owner, _id }) {
    this._selector = selector;
    this._image = link;
    this._name = name;
    this._likes = likes;
    this.owner = owner._id;
    this.cardId = _id;
  }

  _getCard() {
    return document.querySelector(this._selector).content.querySelector('.card').cloneNode(true);
  }

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
    if (this.owner !== userIdent) {
      this.deleteButton.remove();
    }
    this.cardLikeCount.textContent = this._likes.length;
    this._setEventListeners();
    this._handleCardClick();
    return this._elementCard;
  }

  _setEventListeners() {
    this._isLiked();
    this._removedCard();
  }

  _removedCard() {
    this.deleteButton.addEventListener('click', (evt) => {
      api.deleteCard(this.cardId)
        .then((res) => {
          evt.target.closest('.card').remove();
        })
        .catch(api._printError());
    });
  }

  _handleCardClick() {
    this.cardPhoto.addEventListener('click', () => {
      popupFullsize.querySelector('.popup__image').setAttribute('src', this._image);
      popupFullsize.querySelector('.popup__place').textContent = this._name;
      const popupImageObj = new PopupWithImage(popupFullsize);
      popupImageObj.setEventListeners();
      popupImageObj.open();
    })
  }

  _isLiked() {
    this.cardLike.addEventListener('click', () => {
      if (this.cardLike.classList.contains('card__like_active')) {
        api.deleteLike(this.cardId)
          .then(res => {
            this.cardLikeCount.textContent = res.likes.length;
            this.cardLike.classList.remove('card__like_active');
          })
          .catch(err => console.error(err))
      } else {
        api.addLike(this.cardId)
          .then(res => {
            this.cardLikeCount.textContent = res.likes.length;
            this.cardLike.classList.add('card__like_active');
          })
          .catch(err => console.error(err))
      }
    });
  }
}

/*
createdAt: "2022-05-22T14:19:39.601Z"
likes: Array(1)
0:
  about: "Good luck"
  avatar: "https://images.unsplash.com/photo-1652734962016-e1b373cfb95c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671"
  cohort: "plus-cohort-9"
  name: "Well done"
  _id: "2db01ba02817beb6216f1735"
[[Prototype]]: Object
length: 1
[[Prototype]]: Array(0)
link: "https://images.unsplash.com/photo-1652734962016-e1b373cfb95c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671"
name: "44"
owner: {name: 'Well done', about: 'Good luck', avatar: 'https://images.unsplash.com/photo-1652734962016-e1…wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671', _id: '2db01ba02817beb6216f1735', cohort: 'plus-cohort-9'}
_id: "628a467b224b4c0027276c51"
*/
