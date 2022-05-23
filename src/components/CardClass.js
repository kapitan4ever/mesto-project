import { popupImage, popupFullsize, popupPlace, popups } from "./utils";
import { openPopup } from "./modal";
import { userIdent } from './UserInfo.js';

const popupElement = document.querySelector('.popup');
export class Card {
  //свойства
  constructor(selector, card) {
    this._selector = selector;
    this._image = card.link;
    this._name = card.name;
    this._likes = card.likes;
    this.owner = card.owner._id;
  }

  _getCard() {
    return document.querySelector(this._selector).content.querySelector('.card').cloneNode(true);
  }

  generate() {
    this._elementCard = this._getCard();
    this._elementCard.querySelector('.card__title').textContent = this._name;
    this._elementCard.querySelector('.card__photo').setAttribute('src', this._image);
    this._elementCard.querySelector('.card__photo').setAttribute('alt', this._name);
    if (this._likes.some(like => like._id === userIdent)) {
      this._elementCard.querySelector('.card__like').classList.add('card__like_active');
    }
    if (this.owner !== userIdent) {
      this._elementCard.querySelector('.card__remove').remove();
    }
    this._elementCard.querySelector('.card__like-counter').textContent = this._likes.length;
    this._setEventListeners();
    return this._elementCard;
  }

  _setEventListeners() {
    this._elementCard.querySelector('.card__photo').addEventListener('click', () => {
      this._handleOpenPopup();
    });
  }
  _handleOpenPopup() {
    popupImage.src = this._image;
    popupPlace.textContent = this._name;
    openPopup(popupFullsize);
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
