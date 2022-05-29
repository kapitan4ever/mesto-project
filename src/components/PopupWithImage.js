//Создайте класс PopupWithImage, который наследует от Popup.
//Этот класс должен перезаписывать родительский метод open.
//В методе open класса PopupWithImage нужно вставлять в попап
//картинку с src изображения и подписью к картинке.
import Popup from './Popup.js';
import { popupImage, popupPlace } from './utils'
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);//записывать вначале!
  }
  open(image) {
    super.open();
    popupImage.src = image.src;
    popupPlace.textContent = image.alt;

  }
  close() {
    super.close();
    popupImage.src = '';
    popupPlace.textContent = '';
  }
  setEventListeners() {
    super.setEventListeners();
  }
}
