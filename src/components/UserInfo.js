import { api } from './ApiClass.js';

export class UserInfo {
  constructor({ name, about, _id}) {
    this._name = name;
    this._about = about;
    this._id = _id;
  }

  getUserInfo() {
    /*this._id = api.getUserInfo()
      .then((res) => {
        return res._id;
      });
      return this._id;*/
  }

  setUserInfo() {
    api.editProfile()
      .then((res) => {
        this.doсument.querySelector(this._name).textContent = res.name;
        this.doсument.querySelector(this._about).textContent = res.about;
      });
  }
}

/* Ответ с сервера по инфо юзера
about: "дарю радость"
avatar: "https://avatars.mds.yandex.net/get-zen_doc/1347728/pub_61054305f732f72ee1131fd5_610543359bd3fc59f0d94dee/scale_1200"
cohort: "plus-cohort-9"
name: "Бел"
_id: "4638d5a7cee257ce437a178b"
*/
