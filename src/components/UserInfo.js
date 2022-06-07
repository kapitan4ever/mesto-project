export default class UserInfo {
  constructor({avatarSelector, usernameSelector, aboutUsernameSelector}) {
    this._name = document.querySelector(usernameSelector);
    this._about = document.querySelector(aboutUsernameSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  //-- Получаем информацию о пользователе и отрисовываем информацию на страницу --//
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatarLink: this._avatar.src,
    }
  }

  //-- Обновляем информацию о пользователе и отрисовываем информацию на страницу --//
  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._about.textContent = userData.about;
    this._avatar.src = userData.avatar;
    this._avatar.alt = `Фото профиля ${userData.name}`;
  }
}
