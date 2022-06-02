import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup); //записывать вначале!
    this._image = this._popup.querySelector('.popup__image');
    this._placeTitle = this._popup.querySelector('.popup__place');
  }
  //--Открытие попапа с картинкой --//
  open(image) {
    super.open();
    this._image.src = image.src;
    this._placeTitle.textContent = image.alt;
  }

  //--Закрытие попапа --//
  close() {
    super.close();
    //-- Для медленного интернета очистим поля при закрытии попапа с картинкой --//
    this._image.src = '';
    this._placeTitle.textContent = '';
  }
}
