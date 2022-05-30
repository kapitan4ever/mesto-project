//Создайте класс PopupWithForm, который наследуется от Popup.
//Этот класс:
//- Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
//В этом колбэке содержится метод класса Api.
//- Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
//- Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса
//PopupWithForm должен не только добавлять обработчик клика иконке закрытия,
//но и добавлять обработчик сабмита формы.
//- Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
//Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);//записывать вначале!
    this._handleFormSubmit = handleFormSubmit; //колбэк сабмита формы
    this._form = popupSelector.querySelector('form');
  }

  //--Открытие попапа с формой --//
  open() {
    super.open();
  }

  //--Закрытие попапа с формой --//
  close() {
    super.close();//вызываем родительский метод из Popup.js
    this._form.reset();//добавляем сброс полей
  }

  //--Получение значений всех полей формы. Возвращает объект со значениями--//
  _getInputValues() {
    // достаём все элементы полей
    this._inputList = this._form.querySelectorAll('.form__input');
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value; //поле name в инпуте
    });
    // возвращаем объект значений
    return this._formValues;
  }

  //-- Слушатели на закрытие по нажатию на оверлей и крестик --//
  setEventListeners() {
    super.setEventListeners();//добавляет обработчик клика иконке закрытия
    //добавляет обработчик сабмита формы.
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  };
}

