const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  const url = "http://localhost:3000/weather?address=" + location;

  messageOne.innerHTML = "Loading...";
  messageTwo.innerHTML = "";

  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageTwo.innerHTML = data.error;
      } else {
        messageOne.innerHTML = data.location;
        messageTwo.innerHTML = data.weather;
      }
    });
  });
});
