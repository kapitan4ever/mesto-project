export default class UserInfo {
  constructor(data) {
    this._name = data.querySelector('.profile__title');
    this._about = data.querySelector('.profile__description');
    this._avatar = data.querySelector('.profile__image');
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
    this._avatar.alt = userData.name;
  }
}
