class UserStorage {
  static #users = {
    id: ["jung", "moo", "cheon"],
    password: ["0", "2", "3"],
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
    // return this.#users;
  }
}

module.exports = UserStorage;
