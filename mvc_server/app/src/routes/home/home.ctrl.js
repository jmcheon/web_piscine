"use strict";

const User = require("../../models/User");

const output = {
  home: (request, response) => {
    response.render("home/index.ejs");
  },

  login: (request, response) => {
    response.render("home/login.ejs");
  },
  register: (request, response) => {
    response.render("home/register.ejs");
  },
};

const process = {
  login: (request, response) => {
    const user = new User(request.body);
    const res = user.login();
    return response.json(res);
  },
};

module.exports = {
  output,
  process,
};
