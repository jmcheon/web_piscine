const { json } = require("body-parser");
const fs = require("fs").promises;
class UserStorage {
  static #getUserInfo(id, data) {
    const users = JSON.parse(data);
    const index = users.id.indexOf(id);
    const usersKeys = Object.keys(users);
    const userInfo = usersKeys.reduce((newUser, key) => {
      newUser[key] = users[key][index];
      return newUser;
    }, {});
    return userInfo;
  }

  static getUsers(...fields) {
    // const users = this.#users;
    const newUsers = fields.reduce((newUsers, field) => {
      //   console.log("newUsers:" + newUsers);
      //   console.log("field: " + field);
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }

  static getUserInfo(id) {
    // const users = this.#users;
    return fs
      .readFile("./src/databases/users.json")
      .then((data) => {
        return this.#getUserInfo(id, data);
      })
      .catch(console.error);
  }

  static save(userInfo) {
    // const users = this.#users;
    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.password.push(userInfo.password);
    // console.log(users);
    return { success: true };
  }
}

module.exports = UserStorage;
