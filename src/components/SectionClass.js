export default class Section {
  constructor({ arrayItems, renderer }, selector) {
    this._renderedItems = arrayItems;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItem(element) {
    this._container.append(element);
  }

  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item));
  }
}
