import {
  nameInput,
  jobInput,
  profileName,
  profileDescription,
  popupProfile,
  popupAvatar,
  editAvatar,
  linkAvatar,
  profileAvatar,
  createButtonAvatar,
  validationSettings
} from './utils.js';
import { editProfile, printError, editAvatarProfile } from './api.js';
import { closePopup } from './modal.js';
import { renderLoading } from './index.js';

const editPopupButton = popupProfile.querySelector('.form__button');
const editPopupButtonAvatar = popupAvatar.querySelector('#save-avatar');

/*let user;

export function renderUserData(data) {
  user = data;
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
  profileAvatar.src = data.avatar;
  profileAvatar.alt = `Аватар ${data.name}`;
}
*/
export function editProfileInfo(evt) {
  evt.preventDefault();
  renderLoading(true, editPopupButton);
  editProfile(nameInput.value, jobInput.value)
    .then(res => {
      renderUserData(res);
      disabledEditPopupButton(editPopupButton);
      closePopup(popupProfile);
    })
    .catch(printError)
    .finally(() => renderLoading(false, editPopupButton))
}

export function editAvatarImg() {
  const avatarLink = linkAvatar.value;
  renderLoading(true, editPopupButtonAvatar);
  editAvatarProfile(avatarLink)
    .then(res => {
      profileAvatar.src = res.avatar;
      createButtonAvatar.classList.add('popup__button_disabled');
      createButtonAvatar.disabled = true;
      editAvatar.reset();
      closePopup(popupAvatar);
    })
    .catch(printError)
    .finally(() => renderLoading(false, editPopupButtonAvatar));
}

export function disabledEditPopupButton(disabledButton) {
  disabledButton.classList.add(validationSettings.inactiveButtonClass);
  disabledButton.disabled = true;
  };
