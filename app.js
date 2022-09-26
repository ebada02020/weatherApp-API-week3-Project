"use strict";
async function fetchWeatherUrl(cityName = "Utrecht") {
  const respond = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=10cc3655131b92440d15a55cb9b93e8d`
  );

  if (respond.ok) {
    const respondJson = respond.json();
    return respondJson;
  }
  throw new Error(
    `Can not display the weather.
    May be you enter wrong city name or the server is down please try again`
  );
}

function renderErrorElement(error) {
  const errorElement = document.getElementById("errorMessage");
  errorElement.innerHTML = "";
  errorElement.innerText = error;
  errorElement.style.background = "red";
}

function displayWeather(obj) {
  const city = document.getElementById("city");
  const temp = document.getElementById("temp");
  const icon = document.getElementById("icon");
  const description = document.getElementById("description");
  const humidity = document.getElementById("humidity");
  const wind = document.getElementById("wind");
  const sunrise = document.getElementById("sunrise");
  const sunset = document.getElementById("sunset");

  city.innerText = `Weather in ${obj.name}`;
  temp.innerText = `${obj.main.temp} °C`;
  icon.src = `https://openweathermap.org/img/wn/${obj.weather[0].icon}.png`;
  description.innerText = obj.weather[0].description;
  humidity.innerText = `Humidity: ${obj.main.humidity} %`;
  wind.innerText = `Wind speed: ${obj.wind.speed} km/h`;
  document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${obj.name}')`;

  const sunriseDate = new Date(obj.sys.sunrise * 1000);
  const sunsetDate = new Date(obj.sys.sunset * 1000);

  sunrise.innerText = `sunrise at ${sunriseDate.getHours()}:${sunriseDate.getMinutes()}`;

  sunset.innerText = `sunset at ${sunsetDate.getHours()}:${sunsetDate.getMinutes()}`;
}

async function tryCatch(searchValue) {
  try {
    const fetchWeather = await fetchWeatherUrl(searchValue);
    document.getElementById("errorMessage").innerHTML = "";
    displayWeather(fetchWeather);
  } catch (error) {
    renderErrorElement(error);
  }
}

function searchFunction() {
  const search = document.getElementById("search-bar");
  const searchButton = document.getElementById("search-button");

  searchButton.addEventListener("click", async () => {
    const searchValue = search.value;
    tryCatch(searchValue);
  });
}

function main() {
  searchFunction();

  tryCatch();
}
window.addEventListener("load", main);
