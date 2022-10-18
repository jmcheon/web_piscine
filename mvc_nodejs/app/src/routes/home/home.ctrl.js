"use strict";

const home = (request, response) => {
  response.render("home/index.ejs");
};

const login = (request, response) => {
  response.render("home/login.ejs");
};

module.exports = {
  home,
  login,
};
