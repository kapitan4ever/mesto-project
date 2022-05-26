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

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector)//записывать вначале!
    this.callbackSubmit = callbackSubmit;
  }

  _getInputValues() {
    //const cardName = formPlace.name.value;
    //const cardLink = formPlace.link.value;
    //nameInput.value = profileName.textContent;
    //jobInput.value = profileDescription.textContent;
  }
  setEventListeners() {

  }
  close() {
    super.close();//вызываем родительский метод из Popup.js
    this._popup.reset();//добавляем сброс полей

  }
}
