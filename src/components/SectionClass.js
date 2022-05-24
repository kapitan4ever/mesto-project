import { Card } from './CardClass.js';

export class Section {
    constructor(cards, selector) {
      this._renderedCards = cards;
      this._container = document.querySelector(selector);
    }

    renderCards() {
      this._renderedCards.forEach((item) => {
        const card = new Card('.card-template', item);
        const finishCard = card.generate();
        this.setCard(finishCard);
      });
    }

    setCard(cardNode) {
      this._container.append(cardNode);
    }
  }
