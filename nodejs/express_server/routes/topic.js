const express = require("express");
const router = express.Router();
const fs = require("fs");
const sanitizeHtml = require("sanitize-html");
const path = require("path");
const template = require("../lib/template.js");
const auth = require("../lib/auth");
const db = require("../lib/db");
const shortid = require("shortid");

router.get("/create", (request, response) => {
  if (!auth.isOwner(request, response)) {
    response.redirect("/");
    return false;
  }
  title = "Web - create";
  let list = template.list(request.list);
  let html = template.html(
    title,
    list,
    `<form action="/topic/create_process" method="post">
            <p>
                <input name="title" type="text" placeholder="title"/>
            </p>
            <p>
                <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
                <input type="submit" />
            </p>
        </form>
        `,
    ``,
    auth.statusUI(request, response)
  );
  response.send(html);
});

router.post("/create_process", (request, response) => {
  if (!auth.isOwner(request, response)) {
    response.redirect("/");
    return false;
  }
  let post = request.body;
  let title = post.title;
  let description = post.description;
  //   const filteredId = path.parse(title).base;
  //   fs.writeFile(`data/${filteredId}`, description, "utf-8", (err) => {
  // response.redirect(`/topic/${title}`);
  //   });
  const id = shortid.generate();
  db.get("topics")
    .push({
      id: id,
      title: title,
      description: description,
      user_id: request.user.id,
    })
    .write();
  response.redirect(`/topic/${id}`);
});

router.get("/update/:pageId", (request, response) => {
  if (!auth.isOwner(request, response)) {
    response.redirect("/");
    return false;
  }
  let topic = db.get(`topics`).find({ id: request.params.pageId }).value();
  if (topic.user_id !== request.user.id) {
    request.flash("error", "not yours");
    return response.redirect("/");
  }
  let title = topic.title;
  let data = topic.description;
  let list = template.list(request.list);
  let html = template.html(
    title,
    list,
    `<form action="/topic/update_process" method="post">
                <input type="hidden" name="id" value="${topic.id}"/>
                <p>
                    <input name="title" type="text" placeholder="title" value="${title}"/>
                </p>
                <p>
                    <textarea name="description" placeholder="description">${data}</textarea>
                </p>
                <p>
                    <input type="submit" />
                </p>
            </form>
            `,
    `<a href="/topic/create">create</a> <a href="/topic/update/${topic.id}">update</a>`,
    auth.statusUI(request, response)
  );
  response.send(html);
});

router.post("/update_process", (request, response) => {
  if (!auth.isOwner(request, response)) {
    response.redirect("/");
    return false;
  }
  let post = request.body;
  let id = post.id;
  let title = post.title;
  let description = post.description;
  let topic = db.get("topics").find({ id: id }).value();
  if (topic.user_id !== request.user.id) {
    request.flash("error", "not yours");
    return response.redirect("/");
  }
  db.get("topics")
    .find({ id: id })
    .assign({
      title: title,
      description: description,
    })
    .write();
  response.redirect(`/topic/${topic.id}`);

  //   const filteredOldId = path.parse(id).base;
  //   const filteredNewId = path.parse(title).base;
  //   fs.rename(`data/${filteredOldId}`, `data/${filteredNewId}`, (err) => {
  //     fs.writeFile(`data/${title}`, description, "utf-8", (err) => {
  //       response.redirect(`/topic/${title}`);
  //     });
  //   });
});

router.post("/delete_process", (request, response) => {
  if (!auth.isOwner(request, response)) {
    response.redirect("/");
    return false;
  }
  let post = request.body;
  let id = post.id;
  let topic = db.get("topics").find({ id: id }).value();
  if (topic.user_id !== request.user.id) {
    request.flash("error", "not yours");
    return response.redirect("/");
  }
  db.get("topics").remove({ id: id }).write();
  return response.redirect("/");
  //   const filteredId = path.parse(id).base;
  //   fs.unlink(`data/${filteredId}`, (err) => {
  //     response.redirect("/");
  //   });
});

router.get("/:pageId", (request, response, next) => {
  let topic = db.get("topics").find({ id: request.params.pageId }).value();
  let user = db.get("users").find({ id: topic.user_id }).value();
  const sanitizedTitle = sanitizeHtml(topic.title);
  const sanitizedData = sanitizeHtml(topic.description);
  let list = template.list(request.list);
  let html = template.html(
    sanitizedTitle,
    list,
    `
                <h2>${sanitizedTitle}</h2>
                <p>${sanitizedData}</p>
                <p>by ${user.displayName}</p>
                `,
    `
                <a href="/topic/create">create</a> 
                <a href="/topic/update/${topic.id}">update</a> 
                <form action="/topic/delete_process" method="post">
                    <input type="hidden" name="id" value="${topic.id}"/>
                    <input type="submit" value="delete"/>
                </form>
                `,
    auth.statusUI(request, response)
  );
  response.send(html);
});

module.exports = router;
