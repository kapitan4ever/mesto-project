export default class FormValidator {
  constructor({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }, { _popup }) {
    this.elemForm = _popup;
    this.formSelector = formSelector;
    this.inputSelector = inputSelector;
    this.submitButton = _popup.querySelector(submitButtonSelector);
    this.inactiveButtonClass = inactiveButtonClass;
    this.inputErrorClass = inputErrorClass;
    this.errorClass = errorClass;
  }

  // Функция, которая добавляет класс с ошибкой
  _showInputError = (formElement, formInput, errorMessage) => {
    const errorElement = formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.add(this.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.errorClass);// Показываем сообщение об ошибке
  };

  // Функция, которая удаляет класс с ошибкой
  _hideInputError = (formElement, formInput) => {
    const errorElement = formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.errorClass);// Скрываем сообщение об ошибке
    errorElement.textContent = '';
  };

  // Функция, которая проверяет валидность поля
  _isValid = (formElement, formInput) => {
    if (!formInput.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(formElement, formInput, formInput.validationMessage);
    } else {
      // Если проходит, скроем
      this._hideInputError(formElement, formInput);
    }
  };

  // Функция принимает массив полей
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  // Функция принимает массив полей ввода
  // и элемент кнопки, состояние которой нужно менять
  _toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(this.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this.inactiveButtonClass);
    }
  };

  _setEventListeners = (formElement) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll(this.inputSelector));

    this._toggleButtonState(inputList, this.submitButton);

    // Обойдём все элементы полученной коллекции
    inputList.forEach((formInput) => {
      // каждому полю добавим обработчик события input
      formInput.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        this._isValid(formElement, formInput);
        this._toggleButtonState(inputList, this.submitButton); // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      });
    });
  };

  enableValidation = () => {
    this._setEventListeners(this.elemForm);
  };

  hideErorrs = () => {
    this.submitButton.classList.add(this.inactiveButtonClass);
    this.submitButton.disabled = true;
    const formElement = this.elemForm.querySelector(this.formSelector);
    const inputList = formElement.querySelectorAll(this.inputSelector);
    inputList.forEach((inputElement) => {
      this._hideInputError(formElement, inputElement);
    });
  };
}
