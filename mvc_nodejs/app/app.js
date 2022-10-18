// const http = require("http");
// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
//   if (request.url === "/") {
//     response.end("root page 몰라");
//   } else if (request.url === "/login") {
//     response.end("login page");
//   }
// });

"use strcit";
// modules
const express = require("express");
const app = express();
const home = require("./src/routes/home");

// routes
app.use("/", home);

// app setting
app.set("views", "./src/views");
app.set("view engine", "ejs");

module.exports = app;
