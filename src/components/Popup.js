//Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
//Принимает в конструктор единственный параметр — селектор попапа.
//Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
//Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
//Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.
//Модальное окно также закрывается при клике на затемнённую область вокруг формы.
import { openPopup } from './modal.js';
import { popups } from './utils';
export class Popup {
  constructor(popup) {
    this._popup = popup;
  }
  open() {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', _handleEscClose);
  }
  close() {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', _handleEscClose);
    super.close();
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector('.popup_opened');
      close(openedPopup);
    }
    super._handleEscClose();
  }
  setEventListeners() {
    this._elementCard.querySelector('.card__photo').addEventListener('click', () => {
      this.open();
    });
    super.setEventListeners();
  }
}
/*popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})*/
