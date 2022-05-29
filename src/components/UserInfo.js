import { api } from './index.js';

export let userIdent;
export class UserInfo {
  constructor(data) {
    this._name = data.querySelector('.profile__title');
    this._about = data.querySelector('.profile__description');
    this._avatar = data.querySelector('.profile__image');
  }

  getUserInfo() {
    api.getUserInfo()
      .then(res => {
        this._name.textContent = res.name;
        this._about.textContent = res.about;
        this._avatar.src = res.avatar;
        userIdent = res._id;
      });
  }

  setUserInfo() {
    api.editProfile()
      .then((res) => {
        this.doсument.querySelector(this._name).textContent = res.name;
        this.doсument.querySelector(this._about).textContent = res.about;
        this.doсument.querySelector(this._avatar).src = res.avatar;
      });
  }
}
