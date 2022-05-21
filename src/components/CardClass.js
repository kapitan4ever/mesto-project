import { popupImage, popupFullsize, popupPlace, popups } from "./utils";
import { openPopup } from "./modal";

const popupElement = document.querySelector('.popup');
//const popupImage = document.querySelector('.popup__image');
export class Card {
  //свойства
  constructor(selector, card) {
    this._selector = selector;
    this._image = card.link;
    this._name = card.name;
  }

  //запись свойств (С помощью сеттеров установим значения свойств:)
  /*_setEventListeners() {
      this.elementCard.querySelector('.card__photo').addEventListener('click', () => {
      this.elementCard.querySelector('.card__photo').src = this._image;
      this.elementCard.querySelector('.card__title').textContent = this._name;
      openPopup(popupFullsize);
    });
  }*/

  _getCard() {
    const elementCard = document.querySelector(this._selector).content.querySelector('.card').cloneNode(true);
    return elementCard;
  }

  generate() {
    this._elementCard = this._getCard();
    this._elementCard.querySelector('.card__title').textContent = this._name;
    this._elementCard.querySelector('.card__photo').setAttribute('src', this._image);
    this._elementCard.querySelector('.card__photo').setAttribute('alt', this._name);
    this._setEventListeners();
    return this._elementCard;
  }

  _setEventListeners() {
    this._elementCard.querySelector('.card__photo').addEventListener('click', () => {
      this._handleOpenPopup();
    });
    /*popupCloseButton.addEventListener('click', () => {
      this._handleClosePopup();
    });*/
  }
  _handleOpenPopup() {
    this._elementCard.querySelector('.card__photo').src = this._image;
    this._elementCard.querySelector('.card__title').textContent = this._name;
    openPopup(popupFullsize);
  }
  /*_handleClosePopup() {
    popupImage.src = '';
    popupCloseButton.classList.remove('popup_is-opened');
  }*/
}
