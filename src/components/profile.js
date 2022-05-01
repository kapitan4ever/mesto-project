import {
  nameInput,
  jobInput,
  profileEdit,
  profileAddButton,
  profileName,
  profileDescription,
  formProfile,
  popupProfile,
  popupClose,
  validationSettings
} from './utils.js';
import { toggleButtonState, setEventListeners } from './validate';
import {editProfile, responseCheck, renderLoading, printError} from './api.js';
import { closePopup } from './modal.js';

const editPopupButton = popupProfile.querySelector('.form__button');

let user;
//const nameInput = document.querySelector('#name');
//const descInput = document.querySelector('#description');


export function renderUserData(data) {
  user = data;
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
}

export function editProfileInfo(evt) {
  evt.preventDefault();
  renderLoading(true, editPopupButton);
  editProfile(nameInput.value, jobInput.value)
    .then(responseCheck)
    .then(res => {
      renderUserData(res);
      closePopup(popupProfile);
    })
    .catch(printError)
    .finally(() => renderLoading(false, editPopupButton))
}

function setButtonState(form) {
  const buttonElement = form.querySelector(validationSettings.submitButtonSelector);
  const inputList = Array.from(form.querySelectorAll(validationSettings.inputSelector));
  toggleButtonState(buttonElement, inputList, settings);//inputList, buttonElement, settings
}

export function fillCurrentInputs(form) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  setButtonState(form);
};

