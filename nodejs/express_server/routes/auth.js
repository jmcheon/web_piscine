const express = require("express");
const router = express.Router();
// const fs = require("fs");
// const sanitizeHtml = require("sanitize-html");
// const path = require("path");
const template = require("../lib/template.js");
// const session = require("express-session");

module.exports = function (passport) {
  router.get("/login", (request, response) => {
    let fmsg = request.flash();
    console.log(fmsg);
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
