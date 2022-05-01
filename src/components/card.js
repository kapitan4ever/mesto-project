import { cardTemplate, popupFullsize, popupImage, popupPlace} from './utils';
import { openPopup } from './modal';
import { deleteCard, printError } from './api';


//function add cards
export function createCard(name, link, id) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardPhoto = cardElement.querySelector('.card__photo');
  const cardRemove = cardElement.querySelector('.card__remove');

  cardTitle.textContent = name;
  cardPhoto.src = link;
  cardPhoto.alt = name;

  cardRemove.addEventListener('click', function () {
    deleteCard(id)
    .then(() => {
      const cardItem = cardRemove.closest('.card');
      cardItem.remove();
    })
    .catch(printError)
  });

  // увеличение по клику
  cardPhoto.addEventListener('click', () => {
    popupImage.src = link;
    popupImage.alt = name;
    popupPlace.textContent = name;
    openPopup(popupFullsize);
  });

  return cardElement;
};




