const db = require("../lib/db");
const bcrypt = require("bcrypt");

module.exports = function (app) {
  //   const authData = {
  //     email: "hello@gmail.com",
  //     password: "1234abcd",
  //     nickname: "hello",
  //   };
  const passport = require("passport");
  const LocalStrategy = require("passport-local").Strategy;

  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser(function (user, done) {
    // console.log("serial", user);
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    let user = db.get("users").find({ id: id }).value();
    // console.log("deserial", user, id);
    done(null, user);
  });
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      function (email, password, done) {
        let user = db.get("users").find({ email: email }).value();
        if (user) {
          //   console.log("user found", user);
          bcrypt.compare(password, user.password, function (error, result) {
            if (result) {
              return done(null, user, { message: "Welcome to express server" });
            } else {
              return done(null, false, { message: "Incorrect user password." });
            }
          });
        } else {
          return done(null, false, { message: "Incorrect user id." });
        }
      }
    )
  );
  return passport;
};
