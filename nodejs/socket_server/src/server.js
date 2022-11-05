import http from "http";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import WebSocket from "ws";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (request, response) => response.render("io"));
// app.get("/ws", (request, response) => response.render("home"));
app.get("/*", (request, response) => response.redirect("/"));

const handleListen = () => {
  console.log(`listening on http:localhost:${PORT}`);
};
const server = http.createServer(app);

// websocket
// const wss = new WebSocket.Server({ server }); // to start http, websocker server at the same time
// const sockets = [];

// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   socket["nickname"] = "Anonyous";
//   console.log("connected to Browser");
//   socket.on("close", () => {
//     console.log("disconnected from the Browser");
//   });
//   socket.on("message", (message) => {
//     const parsed = JSON.parse(message.toString());
//     switch (parsed.type) {
//       case "message":
//         // console.log(parsed.type, socket.nickname, parsed.payload);
//         sockets.forEach((eachSocket) =>
//           eachSocket.send(`${socket.nickname}: ${parsed.payload}`)
//         );
//         break;
//       case "nickname":
//         // console.log(parsed.type, socket.nickname);
//         socket["nickname"] = parsed.payload;
//         break;
//     }
//   });
//   //   socket.send("hello browser");
// });

// socket.io
const io = new Server(server, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true,
  },
});

instrument(io, {
  auth: false,
});

function publicRooms() {
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = io;
  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms;
}

function countRoom(roomName) {
  return io.sockets.adapter.rooms.get(roomName)?.size;
}

io.on("connection", (socket) => {
  socket["nickname"] = "Anonymous";
  socket.onAny((event) => {
    console.log(`socket event: ${event}`);
  });

  socket.on("enter_room", (roomName, done) => {
    // console.log(socket.rooms);
    socket.join(roomName);
    done();
    socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));
    // console.log(socket.rooms);
    io.sockets.emit("room_change", publicRooms());
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => {
      socket.to(room).emit("bye", socket.nickname, countRoom(room) - 1);
    });
  });

  socket.on("disconnect", () => {
    io.sockets.emit("room_change", publicRooms());
  });

  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
    done();
  });

  socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
});

server.listen(PORT, handleListen);
