"use strict";
const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }
  login() {
    const body = this.body;
    const { id, password } = UserStorage.getUserInfo(body.id);
    console.log(id, password);
    if (id) {
      if (id === body.id && password === body.password) {
        return { success: true };
      }
      return { success: false, message: "invalid login info" };
    }
    return { success: false, message: "login not exist" };
  }
}

module.exports = User;
