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

  static #getUsers(data, isAll, fields) {
    const users = JSON.parse(data);
    if (isAll) return users;
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }

  static getUsers(isAll, ...fields) {
    return fs
      .readFile("./src/databases/users.json")
      .then((data) => {
        return this.#getUsers(data, isAll, fields);
      })
      .catch(console.error);
  }

  static getUserInfo(id) {
    return fs
      .readFile("./src/databases/users.json")
      .then((data) => {
        return this.#getUserInfo(id, data);
      })
      .catch(console.error);
  }

  static async save(userInfo) {
    const users = await this.getUsers(true);
    // console.log(users);
    if (users.id.includes(userInfo.id)) {
      throw "already existing id";
    }
    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.password.push(userInfo.password);
    fs.writeFile("./src/databases/users.json", JSON.stringify(users));
    return { success: true };
  }
}

module.exports = UserStorage;
