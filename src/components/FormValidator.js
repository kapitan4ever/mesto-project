export default class FormValidator {
  constructor({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }, formEl) {
    this._form = formEl;
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(submitButtonSelector);
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
  }

  // Функция, которая добавляет класс с ошибкой
  _showInputError = (formInput, errorMessage) => {
    const errorElement = this._form.querySelector(`.${formInput.id}-error`);
    formInput.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);// Показываем сообщение об ошибке
  };

  // Функция, которая удаляет класс с ошибкой
  _hideInputError = (formInput) => {
    const errorElement = this._form.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);// Скрываем сообщение об ошибке
    errorElement.textContent = '';
  };

  // Функция, которая проверяет валидность поля
  _isValid = (formInput) => {
    if (!formInput.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(formInput, formInput.validationMessage);
    } else {
      // Если проходит, скроем
      this._hideInputError(formInput);
    }
  };

  // Функция принимает массив полей
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  // Функция принимает массив полей ввода
  // и элемент кнопки, состояние которой нужно менять
  _toggleButtonState = () => {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(this._inputList)) {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._inactiveButtonClass);
    } else {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._inactiveButtonClass);
    }
  };

  _setEventListeners = () => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    this._toggleButtonState();

    // Обойдём все элементы полученной коллекции
    this._inputList.forEach((formInput) => {
      // каждому полю добавим обработчик события input
      formInput.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        this._isValid(formInput);
        this._toggleButtonState(); // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      });
    });
  };

  enableValidation = () => {
    this._setEventListeners();
  };

  hideErorrs = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  };
}
