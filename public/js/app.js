console.log("client side jacascript write here!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
    messageOne.textContent = "Loding...";
    messageTwo.textContent = '';
  console.log(location);
  fetch(
    "/weather?address=" + encodeURIComponent(location)
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = "Location : " + data.cityName;
        messageTwo.textContent = "temperature : " + data.temperature;
      }
    });
  });
});
