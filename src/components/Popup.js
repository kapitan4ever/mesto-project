//Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
//Принимает в конструктор единственный параметр — селектор попапа.
//Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
//Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
//Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
//Модальное окно также закрывается при клике на затемнённую область вокруг формы.

export class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector('.popup_opened');
      this.close(openedPopup);
    }
    this._handleEscClose();
  }

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
