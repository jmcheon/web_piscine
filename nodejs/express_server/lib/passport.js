const db = require("../lib/db");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

module.exports = function (app) {
  const passport = require("passport");
  const LocalStrategy = require("passport-local").Strategy;
  const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

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
  let googleCredentials = require("../config/google.json");
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleCredentials.web.client_id,
        clientSecret: googleCredentials.web.client_secret,
        callbackURL: googleCredentials.web.redirect_uris[0],
      },
      function (accessToken, refreshToken, profile, done) {
        // console.log(accessToken, refreshToken, profile);
        const email = profile.emails[0].value;
        let user = db.get("users").find({ email: email }).value();
        if (user) {
          user.googleId = profile.id;
          db.get("users").find({ id: user.id }).assign(user).write();
        } else {
          user = {
            id: shortid.generate(),
            email: email,
            displayName: profile.displayName,
            googleId: profile.id,
          };
          db.get("users").push(user).write();
        }
        done(null, user);
        // User.findOrCreate(
        //   {
        //     googleId: profile.id,
        //   },
        // function (error, user) {
        //   return done(error, user);
        // }
        // );
      }
    )
  );

  app.use(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["https://www.googleapis.com/auth/plus.login", "email"],
    })
  );

  app.use(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/auth/login",
    }),
    function (request, response) {
      console.log("logined with google");
      response.redirect("/");
    }
  );
  return passport;
};
