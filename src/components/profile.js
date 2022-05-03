import {
  nameInput,
  jobInput,
  profileName,
  profileDescription,
  popupProfile,
  validationSettings,
  popupAvatar,
  editAvatar,
  linkAvatar,
  profileAvatar,
  createButtonAvatar
} from './utils.js';
import { hideInputError } from './validate.js';
import { editProfile, responseCheck, renderLoading, printError, editAvatarProfile } from './api.js';
import { closePopup } from './modal.js';

const editPopupButton = popupProfile.querySelector('.form__button');

let user;

export function renderUserData(data) {
  user = data;
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
  profileAvatar.src = data.avatar;
  profileAvatar.alt = `Аватар ${data.name}`;
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

export function editAvatarImg() {
  const avatarLink = linkAvatar.value;
  renderLoading(true, editAvatar);
  editAvatarProfile(avatarLink)
  .then(responseCheck)
  .then(res => {
    profileAvatar.src = res.avatar;
    createButtonAvatar.classList.add('popup__button_disabled');
    createButtonAvatar.disabled = true;
    editAvatar.reset();
    closePopup(popupAvatar);
    })
    .catch(printError)
    .finally(() => renderLoading(false, editAvatar));
}

export function hideErorrs(popup) {
  const formElement = popup.querySelector(validationSettings.formSelector);
  const inputList = formElement.querySelectorAll(validationSettings.inputSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationSettings);
  });
};
