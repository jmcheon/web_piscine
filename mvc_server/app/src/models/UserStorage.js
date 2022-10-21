class UserStorage {
  static #users = {
    id: ["jung", "moo", "cheon"],
    password: ["1", "2", "3"],
    name: ["jung", "moo", "cheon"],
  };

  static getUsers(...fields) {
    const users = this.#users;
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
    const users = this.#users;
    const index = users.id.indexOf(id);
    const usersKeys = Object.keys(users);
    const userInfo = usersKeys.reduce((newUser, key) => {
      newUser[key] = users[key][index];
      return newUser;
    }, {});
    return userInfo;
  }
  static save(userInfo) {
    const users = this.#users;
    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.password.push(userInfo.password);
    // console.log(users);
    return { success: true };
  }
}

module.exports = UserStorage;
