// Функция, которая добавляет класс с ошибкой
export const showInputError = (formElement, formInput, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);// Показываем сообщение об ошибке
};

// Функция, которая удаляет класс с ошибкой
export const hideInputError = (formElement, formInput, settings) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);// Скрываем сообщение об ошибке
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
export const isValid = (formElement, formInput, settings) => {
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, formInput, formInput.validationMessage, settings);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, formInput, settings);
  }
};

// Функция принимает массив полей
export const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
export function toggleButtonState(inputList, buttonElement, settings) {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

export const setEventListeners = (formElement, settings) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, settings);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((formInput) => {
    // каждому полю добавим обработчик события input
    formInput.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, formInput, settings);
      toggleButtonState(inputList, buttonElement, settings);// Вызовем toggleButtonState и передадим ей массив полей и кнопку
    });
  });
};

export const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
};
