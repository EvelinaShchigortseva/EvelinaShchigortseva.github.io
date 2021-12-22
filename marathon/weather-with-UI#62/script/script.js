import { addCity, deleteCity, isCity } from "./list.js";

const UI_ELEMENTS = {
  formSearch: document.querySelector(".form"),
  degree: document.querySelector("#degree"),
  cityName: document.querySelectorAll(".city_text"),
  imageNow: document.querySelector(".weather_now_img"),
  favoriteCity: document.querySelector("#favorite-city"),
  favoriteCitiesList: document.querySelector(".favorite-cities-list"),
  listItem: document.querySelector(".list-item"),
  cityText: document.querySelector(".city_text"),
  temp: document.querySelector(".temp"),
  feels: document.querySelector(".feels"),
  weather: document.querySelector(".weather"),
  sunrise: document.querySelector(".sunrise"),
  sunset: document.querySelector(".sunset"),
};
let isFavorite;

function colorFavorite(cityName) {
  if (cityName) {
    UI_ELEMENTS.favoriteCity.style.background =
      'url("img/like-red.svg") no-repeat';
  } else {
    UI_ELEMENTS.favoriteCity.style.background =
      'url("img/like.svg") no-repeat';
  }
}

function initialState() {
  UI_ELEMENTS.degree.textContent = `...`;
}

function catchError(city) {
  switch (city.message) {
    case "city not found":
      UI_ELEMENTS.cityName.textContent = `City not found`;
      initialState();
      break;
    case "Internal error":
      alert("Internal error");
      break;
  }
}

function setNow(city) {
  console.log(city);
  let cityName = city.name;
  UI_ELEMENTS.degree.textContent = `${parseInt(city.main.temp)}°C`;
  UI_ELEMENTS.cityName[0].textContent = cityName;
  let iconUrl = `https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`;
  UI_ELEMENTS.imageNow.style.background = `url(${iconUrl}) 50% 50% no-repeat`;
  isFavorite = isCity(cityName);
  colorFavorite(isFavorite);
}

function setDetails(city) {
  let dateSunset = new Date(city.sys.sunset);
  let dateSunrise = new Date(city.sys.sunrise);

  let timeSunrise = dateSunrise.toTimeString().split(" ")[0].slice(0, -3);
  let timeSunset = dateSunset.toTimeString().split(" ")[0].slice(0, -3);

  let cityName = city.name;
  UI_ELEMENTS.cityName[1].textContent = cityName;
  UI_ELEMENTS.temp.textContent = `${parseInt(city.main.temp)}°C`;
  UI_ELEMENTS.feels.textContent = `${parseInt(city.main.feels_like)}°C`;
  UI_ELEMENTS.weather.textContent = city.weather[0].main;
  UI_ELEMENTS.sunrise.textContent = timeSunrise;
  UI_ELEMENTS.sunset.textContent = timeSunset;
}

function setForecast(city) {
  let cityName = city.name;
  UI_ELEMENTS.cityName[2].textContent = cityName;
}

function deleteCityElement(event) {
  let cityName = event.target.previousElementSibling.textContent;
  deleteCity(cityName);
  colorFavorite(!cityName);
  event.target.parentElement.remove();

  let cityText = UI_ELEMENTS.cityText.textContent;
  if (isCity(cityText)) {
    colorFavorite("red");
  }
}

function showListCities(event) {
  let cityName = event.target.textContent;
  let isFavorite = isCity(cityName);
  fetchQuery(cityName);
  colorFavorite(isFavorite);
}
//rename
function fetchQuery(cityName) {
  const serverUrl = "https://api.openweathermap.org/data/2.5/weather";
  const apiKey = "f660a2fb1e4bad108d6160b7f58c555f";
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((cityInfo) => {
      catchError(cityInfo);
      setNow(cityInfo);
      setDetails(cityInfo);
      setForecast(cityInfo);
    });
}

function createAddedLocationElements(cityName) {
  const shellCity = document.createElement("div");
  shellCity.classList.add("list-item");

  const cityNameElement = document.createElement("div");
  cityNameElement.textContent = cityName;
  cityNameElement.addEventListener("click", showListCities);

  const buttonDeleteCity = document.createElement("input");
  buttonDeleteCity.classList.add("button_x");
  buttonDeleteCity.setAttribute("type", "button");
  buttonDeleteCity.setAttribute("value", "");
  buttonDeleteCity.addEventListener("click", deleteCityElement);

  shellCity.append(cityNameElement, buttonDeleteCity);
  UI_ELEMENTS.favoriteCitiesList.append(shellCity);
}

UI_ELEMENTS.formSearch.addEventListener("submit", function (event) {
  event.preventDefault();
  const cityName = event.target.firstElementChild.value;
  fetchQuery(cityName);
  UI_ELEMENTS.formSearch.reset();
});

UI_ELEMENTS.favoriteCity.addEventListener("click", function (event) {
  const cityName = event.target.parentElement.firstElementChild.textContent;

  if (!isCity(cityName) && cityName != "City not found" && cityName) {
    addCity(cityName);
    createAddedLocationElements(cityName);
    colorFavorite(cityName);
  }
});
