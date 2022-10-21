"use strict";
const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }
  async login() {
    const client = this.body;
    const { id, password } = await UserStorage.getUserInfo(client.id);
    console.log(id, password);
    if (id) {
      if (id === client.id && password === client.password) {
        return { success: true };
      }
      return { success: false, message: "invalid login info" };
    }
    return { success: false, message: "login not exist" };
  }
  async register() {
    try {
      const client = this.body;
      const response = await UserStorage.save(client);
      return response;
    } catch (error) {
      return { success: false, message: error };
    }
  }
}

module.exports = User;
