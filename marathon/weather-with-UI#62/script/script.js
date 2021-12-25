import {addCity, isCity} from "./list.js";
import {getFavoriteCities, setFavoriteCity,saveCurrentCity,getCurrentCity} from "./storage.js";
import {setNow, colorFavorite} from "./now.js";
import {setDetails} from "./details.js";
import {setForecast} from "./forecast.js";
import {createAddedFavoriteCitiesElements} from './favoriteCities.js'


const UI_ELEMENTS = {
    formSearch : document.querySelector('.form'),
    degree: document.querySelector('#degree'),
    cityName: document.querySelectorAll('.city_text'),
    imageNow: document.querySelector('.weather_now_img'),
    favoriteCity: document.querySelector('#favorite-city'),
    favoriteCitiesList: document.querySelector('.favorite-cities-list'),
    listItem: document.querySelector('.list-item'),
    cityText: document.querySelector('.city_text'),
    temp: document.querySelector('.temp'),
    feels: document.querySelector('.feels'),
    weather: document.querySelector('.weather'),
    sunrise: document.querySelector('.sunrise'),
    sunset: document.querySelector('.sunset'),
    itemsList: document.querySelector('.weather_forecast_column')
}


function start() {
    let currentCity = getCurrentCity()
    const cities = getFavoriteCities()
    cities.forEach((city) => {
        createAddedFavoriteCitiesElements(city)
        addCity(city)
    })
    getWeatherInformation(currentCity)
}

start()



UI_ELEMENTS.formSearch.addEventListener('submit', function (event){
    event.preventDefault()

    UI_ELEMENTS.itemsList.textContent = ""
    const cityName = event.target.firstElementChild.value;

    getWeatherInformation(cityName)
    saveCurrentCity(cityName)

    UI_ELEMENTS.formSearch.reset();
})

UI_ELEMENTS.favoriteCity.addEventListener('click', function (event){

    const cityName = event.target.parentElement.firstElementChild.textContent

    if(!isCity(cityName) && cityName !== 'City not found' && cityName){
        addCity(cityName)
        createAddedFavoriteCitiesElements(cityName)
        colorFavorite(cityName)
        setFavoriteCity(cityName)
    }
})


function getWeatherInformation(cityName){
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response=>response.json())
        .then(cityInfo => {
            setDataPage(cityInfo)
        })

}

function setDataPage(cityName){
    catchError(cityName)
    setNow(cityName)
    setDetails(cityName)
    setForecast(cityName)
}

function initialState (){
    UI_ELEMENTS.degree.textContent = `...`
    colorFavorite(false);

}

function catchError(city){

    switch (city.message){
        case 'city not found' : UI_ELEMENTS.cityText.textContent = `City not found`; initialState(); break;
        case 'Internal error' : alert('Internal error'); break;
    }
}

export {getWeatherInformation, UI_ELEMENTS}



