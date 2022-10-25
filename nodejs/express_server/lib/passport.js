module.exports = function (app) {
  const authData = {
    email: "hello@gmail.com",
    password: "1234abcd",
    nickname: "hello",
  };
  const passport = require("passport");
  const LocalStrategy = require("passport-local").Strategy;

  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser(function (user, done) {
    done(null, user.email);
  });
  passport.deserializeUser(function (id, done) {
    done(null, authData);
  });
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      function (username, password, done) {
        if (username === authData.email) {
          if (password === authData.password) {
            return done(null, authData);
          } else {
            return done(null, false, { message: "Incorrect password." });
          }
        } else {
          return done(null, false, { message: "Incorrect username." });
        }
      }
    )
  );
  return passport;
};
