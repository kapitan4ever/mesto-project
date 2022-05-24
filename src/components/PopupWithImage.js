//Создайте класс PopupWithImage, который наследует от Popup.
//Этот класс должен перезаписывать родительский метод open.
//В методе open класса PopupWithImage нужно вставлять в попап
//картинку с src изображения и подписью к картинке.
import { popupImage, popupFullsize, popupPlace } from './utils.js';
export class PopupWithImage {
	constructor({link, name}) {
		this._image = card.link;
    this._name = card.name;
	}
	_handleOpenPopup() {
		popupImage.src = this._image;
		popupPlace.textContent = this._name;
		openPopup(popupFullsize);
	}

  _
}



