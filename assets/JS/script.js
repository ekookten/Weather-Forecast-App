const weatherApiRootUrl = "https://api.openweathermap.org/" 
const APIKey = "f1daff82b3d6abc58e61700172e86c7b"

// const weatherButton = document.getElementById('#weather')

const getFiveDayWeather = function () {
    const lat = "13.0"
    const lon = "24.0"
    const apiUrl = `${weatherApiRootUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;
  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
            displayRepos(data, user);
          });
        } else {
          alert(`Error:${response.statusText}`);
        }
      })

  };

  $('').addEventListener('submit', getFiveDayWeather);
