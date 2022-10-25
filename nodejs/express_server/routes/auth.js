const express = require("express");
const router = express.Router();
const template = require("../lib/template.js");
const shortid = require("shortid");
const db = require("../lib/db");
const bcrypt = require("bcrypt");

module.exports = function (passport) {
  router.get("/login", (request, response) => {
    let fmsg = request.flash();
    let feedback = "";
    if (fmsg.error) feedback = fmsg.error[0];
    title = "Web - login";
    let list = template.list(request.list);
    let html = template.html(
      title,
      list,
      `
    <div style="color:red;">${feedback}</div>
    <form action="/auth/login_process" method="post">
            <p>
                <input name="email" type="text" placeholder="email"/>
            </p>
            <p>
                <input name="password" type="password" placeholder="password"/>
            </p>
            <p>
                <input type="submit" value="login"/>
            </p>
        </form>
        `,
      ``
    );
    response.send(html);
  });

  router.post(
    "/login_process",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/auth/login",
      failureFlash: true,
      successFlash: true,
    })
  );

  router.get("/register", (request, response) => {
    let fmsg = request.flash();
    let feedback = "";
    if (fmsg.error) feedback = fmsg.error[0];
    console.log(feedback);
    title = "Web - register";
    let list = template.list(request.list);
    let html = template.html(
      title,
      list,
      `
    <div style="color:red;">${feedback}</div>
    <form action="/auth/register_process" method="post">
            <p>
                <input name="email" type="text" placeholder="email"/>
            </p>
            <p>
                <input name="password" type="password" placeholder="password"/>
            </p>
            <p>
                <input name="confirmPassword" type="password" placeholder="confirm password"/>
            </p>
            <p>
                <input name="displayName" type="text" placeholder="display name"/>
            </p>
            <p>
                <input type="submit" value="register"/>
            </p>
        </form>
        `,
      ``
    );
    response.send(html);
  });

  router.post("/register_process", (request, response) => {
    let post = request.body;
    let email = post.email;
    let password = post.password;
    let confirmPassword = post.confirmPassword;
    let displayName = post.displayName;
    if (password !== confirmPassword) {
      request.flash("error", "passwrod not same");
      response.redirect("/auth/register");
    } else {
      bcrypt.hash(password, 10, function (error, hash) {
        const user = {
          id: shortid.generate(),
          email: email,
          password: hash,
          displayName: displayName,
        };
        db.get("users").push(user).write();
        request.login(user, function (err) {
          return response.redirect("/");
        });
      });
    }
  });

  router.get("/logout", function (request, response) {
    request.logout(() => {});
    //request.session.destroy((error) => {
    request.session.save(function () {
      response.redirect("/");
    });
  });
  return router;
};

// module.exports = router;
