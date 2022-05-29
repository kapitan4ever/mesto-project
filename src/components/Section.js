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
    if (this._renderedItems.length > 1) {
      this._renderedItems.forEach(item => this._renderer(item));
    }
    else {
      this._renderer(this._renderedItems);
    }
  }
}
