const express = require("express");
const app = express();
const fs = require("fs");
const helmet = require("helmet");
const bodyPaser = require("body-parser");
const compression = require("compression");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("connect-flash");
const db = require("./lib/db");

app.use(helmet());
app.use(express.static("public"));
app.use(bodyPaser.urlencoded({ extended: false }));
app.use(compression());
app.use(
  session({
    httponly: true,
    secret: "ajskdlfjsldf",
    resave: false,
    saveUninitialized: false,
    store: new FileStore(),
  })
);
app.use(flash());

let passport = require("./lib/passport")(app);

app.get("*", (request, response, next) => {
  //   fs.readdir("./data", (error, fileLIst) => {
  // request.list = fileLIst;
  request.list = db.get("topics").value();
  next();
  //   });
});

const topicRouter = require("./routes/topic");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth")(passport);
// const auth = require("./lib/auth");

app.use("/", indexRouter);
app.use("/topic", topicRouter);
app.use("/auth", authRouter);

app.use((error, request, response, next) => {
  console.error(error.stack);
  response.status(500).send("An error has occured");
});

app.use((request, response, next) => {
  response.status(404).send("page not found");
});

app.listen(3000);
