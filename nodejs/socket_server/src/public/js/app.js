const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
  console.log("connected to Server");
});

socket.addEventListener("message", (message) => {
  console.log("New message: ", message.data);
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.appendChild(li);
});

socket.addEventListener("close", () => {
  console.log("disconncected from the Server");
});

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("message", input.value.toString()));
  input.value = "";
});

nickForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value.toString()));
  //   input.value = "";
});
