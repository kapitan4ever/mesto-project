//-- Импорты --//
import { api } from './Api.js';

//-- Экспорты --//
export let userIdent;

export class UserInfo {
  constructor(data) {
    this._name = data.querySelector('.profile__title');
    this._about = data.querySelector('.profile__description');
    this._avatar = data.querySelector('.profile__image');
  }

  //-- Получаем информацию о пользователе и отрисовываем информацию на страницу --//
  getUserInfo() {
    api.getUserInfo()
      .then(res => {
        this._name.textContent = res.name;
        this._about.textContent = res.about;
        this._avatar.src = res.avatar;
        userIdent = res._id;
      })
      .catch(api.printError());
  }

  //-- Обновляем информацию о пользователе и отрисовываем информацию на страницу --//
  setUserInfo() {
    api.editProfile()
      .then((res) => {
        this.doсument.querySelector(this._name).textContent = res.name;
        this.doсument.querySelector(this._about).textContent = res.about;
        this.doсument.querySelector(this._avatar).src = res.avatar;
      })
      .catch(api.printError());
  }
}

