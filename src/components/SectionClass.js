import { Card } from './CardClass.js';
import { popupFullsize } from './utils.js';
export class Section {
    constructor(cards, selector) {
      this._renderedCards = cards;
      this._container = document.querySelector(selector);
    }

    renderCards() {
      this._renderedCards.forEach((cardItem) => {
        const card = new Card('.card-template', cardItem);

        const finishCard = card.generate();

        this.setCard(finishCard);
      });
    }

    setCard(cardNode) {
      this._container.append(cardNode);
    }
  }
