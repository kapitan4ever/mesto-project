//Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
//Принимает в конструктор единственный параметр — селектор попапа.
//Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
//Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
//Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
//Модальное окно также закрывается при клике на затемнённую область вокруг формы.

export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //-- Открытие попапа --//
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  //-- Закрытие попапа --//
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //-- Установка слушателя на закрытие попапа по нажатию на ESC--//
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  //-- Слушатели на закрытие по нажатию на оверлей и крестик --//
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close(this._popup);
      }
      if (evt.target.classList.contains('popup__close')) {
        this.close(this._popup);
      }
    });
  }
}
