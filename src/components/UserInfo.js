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

// Ответ с сервера по инфо юзера
//about: "дарю радость"
//avatar: "https://avatars.mds.yandex.net/get-zen_doc/1347728/pub_61054305f732f72ee1131fd5_610543359bd3fc59f0d94dee/scale_1200"
//cohort: "plus-cohort-9"
//name: "Бел"
//_id: "4638d5a7cee257ce437a178b"
