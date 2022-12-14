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
  login: async (request, response) => {
    const user = new User(request.body);
    const res = await user.login();
    return response.json(res);
  },
  register: async (request, response) => {
    const user = new User(request.body);
    const res = await user.register();
    return response.json(res);
  },
};

module.exports = {
  output,
  process,
};
