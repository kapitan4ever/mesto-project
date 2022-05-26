//Создайте класс PopupWithImage, который наследует от Popup.
//Этот класс должен перезаписывать родительский метод open.
//В методе open класса PopupWithImage нужно вставлять в попап
//картинку с src изображения и подписью к картинке.
import { Popup } from './Popup.js';
import { popupImage, popupFullsize, popupPlace } from './utils.js';
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);//записывать вначале!
  }
  open() {
    super.open();
  }
  setEventListeners() {
    super.setEventListeners();
  }
}
