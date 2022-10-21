const id = document.querySelector("#id");
const name = document.querySelector("#name");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const button = document.querySelector("#button");

button.addEventListener("click", register);

function register() {
  const request = {
    id: id.value,
    name: name.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  };
  // console.log(request);
  // console.log(JSON.stringify(request));
  fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        location.href = "/login";
      } else {
        alert(response.message);
      }
    })
    .catch((error) => {
      console.error("register error");
    });
}
