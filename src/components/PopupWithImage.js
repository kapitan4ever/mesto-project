//Создайте класс PopupWithImage, который наследует от Popup.
//Этот класс должен перезаписывать родительский метод open.
//В методе open класса PopupWithImage нужно вставлять в попап
//картинку с src изображения и подписью к картинке.
import {Popup} from './Popup.js';
import { popupImage, popupFullsize, popupPlace } from './utils.js';
export class PopupWithImage extends Popup {
  constructor(popupSelector, card) {
    this._popup = popupSelector;
		this._image = card.link;
    this._name = card.name;
	}
	open() {
    //this._popup.classList.add('popup_opened');
    //document.addEventListener('keydown', this._handleEscClose);
		//popupImage.src = this._image;
		//popupPlace.textContent = this._name;
		//open(popupFullsize);
	}
}
