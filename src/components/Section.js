export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  //-- метод addItem принимает в себя данные одной карточки --//
  addItem(element) {
    this._container.prepend(element);
  }

  //-- Вызывает колбэк функцию в конструкторе и передает карточку --//
  renderItems(cards) {
    if (cards.length > 1) {
      cards.reverse().forEach(item => this._renderer(item));
    }
    else {
      this._renderer(cards);
    }
  }
}
