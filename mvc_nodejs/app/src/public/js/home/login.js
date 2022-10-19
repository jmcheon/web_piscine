const id = document.querySelector("#id");
const password = document.querySelector("#password");
const button = document.querySelector("button");

button.addEventListener("click", () => {
  const request = {
    id: id.value,
    password: password.value,
  };
});

console.log(request);
