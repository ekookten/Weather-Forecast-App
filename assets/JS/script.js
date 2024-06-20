const weatherApiRootUrl = "https://api.openweathermap.org/";
const APIKey = "f1daff82b3d6abc58e61700172e86c7b";

// const weatherButton = document.getElementById('#weather')

const getWeather = function (event) {
  event.preventDefault();
  const lat = "13.0";
  const lon = "24.0";
  const apiUrl = `${weatherApiRootUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;

  fetch(apiUrl)
    .then(function (response) {
      return response.json;
    })
    .then(function (data) {
      renderWeather(data);
    })
    .catch(function (err) {
      console.error(err);
    });
};

$(document).ready(function () {
  $("#weather").on("click", getWeather);
});
