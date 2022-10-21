"use strict";
const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }
  login() {
    const client = this.body;
    const { id, password } = UserStorage.getUserInfo(client.id);
    console.log(id, password);
    if (id) {
      if (id === client.id && password === client.password) {
        return { success: true };
      }
      return { success: false, message: "invalid login info" };
    }
    return { success: false, message: "login not exist" };
  }
  register() {
    const client = this.body;
    const response = UserStorage.save(client);
    return response;
  }
}

module.exports = User;
