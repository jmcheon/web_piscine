const fs = require("fs");
const appRoot = require("app-root-path");
const accessLogStream = fs.createWriteStream(`${appRoot}/log/access.log`, {
  flag: "a",
});

module.exports = accessLogStream;
