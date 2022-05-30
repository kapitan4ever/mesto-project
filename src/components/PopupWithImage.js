//Создайте класс PopupWithImage, который наследует от Popup.
//Этот класс должен перезаписывать родительский метод open.
//В методе open класса PopupWithImage нужно вставлять в попап
//картинку с src изображения и подписью к картинке.
import Popup from './Popup.js';
import { popupImage, popupPlace } from './utils'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  //--Открытие попапа с картинкой --//
  open(image) {
    super.open();
    popupImage.src = image.src;
    popupPlace.textContent = image.alt;
  }

  //--Закрытие попапа --//
  close() {
    super.close();
    //-- Для медленного интернета очистим поля при закрытии попапа с картинкой --//
    popupImage.src = '';
    popupPlace.textContent = '';
  }

  //-- Слушатели на закрытие по нажатию на оверлей и крестик --//
  setEventListeners() {
    super.setEventListeners();
  }
}
