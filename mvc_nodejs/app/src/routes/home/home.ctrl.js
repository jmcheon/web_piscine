"use strict";

const output = {
  home: (request, response) => {
    response.render("home/index.ejs");
  },

  login: (request, response) => {
    response.render("home/login.ejs");
  },
};

const users = {
  id: ["jung", "moo", "cheon"],
  password: ["1", "2", "3"],
};

const process = {
  login: (request, response) => {
    // console.log(request.body);
    const id = request.body.id;
    const password = request.body.password;

    if (users.id.includes(id)) {
      const index = users.id.indexOf(id);
      if (users.password[index] === password) {
        return response.json({
          success: true,
        });
      }
    }
    return response.json({
      success: false,
      message: "login fail",
    });
  },
};

module.exports = {
  output,
  process,
};
