const formItems = document.querySelectorAll(".form-item");
const form = document.querySelector("#login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
// const notifyText = document.querySelector(".user_logged");

// Animating the input and logic on submit data

const moveLabel = () => {
  formItems.forEach((formItem) => {
    const input = formItem.querySelector("input");

    input.value = "";
    input.addEventListener("input", () => {
      if (!input.value) {
        formItem.classList.remove("active");
      } else {
        formItem.classList.add("active");
      }
    });
  });
};

window.onload = moveLabel;

// form.addEventListener("submit", async (event) => {
//   event.preventDefault();

//   const username = usernameInput.value;
//   const password = passwordInput.value;
//   // console.log(username, password);

//   if (!username || !password) {
//     console.log("please provide username and password");
//   } else {
//     try {
//       fetch("/api/jwt/dashboard")
//         .then((response) => {
//           response.json();
//         })
//         .then((data) => {
//           console.log(data);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   }
// });
