let low = require("lowdb");
let FileSync = require("lowdb/adapters/FileSync");
let adapter = new FileSync("db.json");
let db = low(adapter);
db.defaults({ users: [], topics: [] }).write(); //lowdb를 통해서 데이터를 저장할 때 users라는 곳에 저장하겠다. 없으면 생성해라

module.exports = db;
