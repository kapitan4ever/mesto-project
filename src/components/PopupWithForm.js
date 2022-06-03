import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popup, handleFormSubmit }) {
    super(popup); //записывать вначале!
    this._handleFormSubmit = handleFormSubmit; //колбэк сабмита формы
    this._form = popup.querySelector('form');
    this._inputList = this._form.querySelectorAll('.form__input');
  }

  //--Закрытие попапа с формой --//
  close() {
    super.close();//вызываем родительский метод из Popup.js
    this._form.reset();//добавляем сброс полей
  }

  //--Получение значений всех полей формы. Возвращает объект со значениями--//
  _getInputValues() {
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
    });
  };

  renderLoading(isLoading, button) {
    if (button.name === 'create-card-button') {
      button.textContent = isLoading ? 'Сохранение...' : 'Создать'
    } else {
      button.textContent = isLoading ? 'Сохранение...' : 'Сохранить'
    }
  }
}

