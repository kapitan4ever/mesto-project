import DefaultCard from './DefaultCard.js';
import HorizontalCard from './HorizontalCard.js';

export default class Section {
  constructor({ data }, containerSelector) {
    this._renderedItems = data;
    this._container = document.querySelector(containerSelector);
  }
//set - запись приватных свойств
  setItem(element) {
    this._container.append(element);
  }

  clear() {
    this._container.innerHTML = '';
  }

  _renderItems(isGrid) {
    this.clear();

    this._renderedItems.forEach(item => {
      const card = isGrid
        ? new DefaultCard(item, '.default-card')
        : new HorizontalCard(item, '.horizontal-card');

      const cardElement = card.generate();

      this.setItem(cardElement);
    });
  }
}

import Card from './card.js';

export class HorizontalCard extends Card {
  constructor(data, selector) {
    super(selector);
    this._title = data.title;
    this._description = data.description;
    this._price = data.price;
    this._image = data.image;
  }

  generate() {
    this._element = super._getElement();
    super._setEventListeners();

    this._element.querySelector('.card__image').style.backgroundImage = `url(${this._image})`;
    this._element.querySelector('.card__title').textContent = this._title;
    this._element.querySelector('.card__info').textContent = this._description;
    this._element.querySelector('.card__price-property').textContent = this._price;

    return this._element;
  }
}
