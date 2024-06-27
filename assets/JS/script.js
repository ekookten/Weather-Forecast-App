document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "f1daff82b3d6abc58e61700172e86c7b";
  const mainUrl = "https://api.openweathermap.org";
  const cityInput = document.getElementById("city-input");
  const searchForm = document.getElementById("search-form");
  const searchHistory = document.getElementById("search-history");
  const currentWeatherSection = document.getElementById("current-weather");
  const forecastSection = document.getElementById("forecast");
  let savedSearch = JSON.parse(localStorage.getItem("savedSearch")) || [];

  savedSearch.forEach((city) => createHistoryButton(city));

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityName = cityInput.value.trim();
    if (cityName && !savedSearch.includes(cityName)) {
      savedSearch.push(cityName);
      localStorage.setItem("savedSearch", JSON.stringify(savedSearch));
      createHistoryButton(cityName);
    }
    getWeather(cityName);
    cityInput.value = "";
  });

  function createHistoryButton(cityName) {
    const button = document.createElement("button");
    button.textContent = cityName;
    button.className = "history-btn";
    button.addEventListener("click", () => getWeather(cityName));
    searchHistory.appendChild(button);
  }

  function getWeather(cityName) {
    const url = `${mainUrl}/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => displayCurrentWeather(data))
      .then(() => getForecast(cityName));
  }

  function displayCurrentWeather(data) {
    currentWeatherSection.innerHTML = `
          <h3>Current Weather in ${data.name}</h3>
          <p>Temperature: ${data.main.temp} °F</p>
          <p>Humidity: ${data.main.humidity} %</p>
          <p>Wind Speed: ${data.wind.speed} mph</p>
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
      `;
  }

  function getForecast(cityName) {
    const url = `${mainUrl}/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => displayForecast(data));
  }

  function displayForecast(data) {
    forecastSection.innerHTML = "<h3>5-Day Forecast</h3>";
    const forecastContainer = document.createElement("div");
    forecastContainer.className = "forecast-container";
    data.list.forEach((item, index) => {
      if (index % 8 === 0) {
        const card = document.createElement("div");
        card.className = "forecast-card";
        card.innerHTML = `
                  <p>${dayjs(item.dt_txt).format("MM/DD/YYYY")}</p>
                  <p>Temp: ${item.main.temp} °F</p>
                  <p>Humidity: ${item.main.humidity} %</p>
                  <img src="https://openweathermap.org/img/wn/${
                    item.weather[0].icon
                  }.png" alt="Weather Icon">
              `;
        forecastContainer.appendChild(card);
      }
    });
    forecastSection.appendChild(forecastContainer);
  }
});
