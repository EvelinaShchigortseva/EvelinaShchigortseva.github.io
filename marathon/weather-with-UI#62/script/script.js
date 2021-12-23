import {addCity, deleteCity, isCity} from "./list.js";
import {deleteFavoriteCity, getFavoriteCities, setFavoriteCity} from "./storage.js";

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
let isFavorite


function start() {
    const cities = getFavoriteCities()
    cities.forEach((city) => {
        createAddedLocationElements(city)
        addCity(city)
    })
    fetchQuery(cities[0])
}


start()


function colorFavorite(cityName){
    if(cityName){
        UI_ELEMENTS.favoriteCity.style.background = 'url("img/like-red.svg") no-repeat'
    }
    else{
        UI_ELEMENTS.favoriteCity.style.background = 'url("img/like.svg") no-repeat'
    }
}

function initialState (){
    UI_ELEMENTS.degree.textContent = `...`

}

function catchError(city){

    switch (city.message){
        case 'city not found' : UI_ELEMENTS.cityText.textContent = `City not found`; initialState(); break;
        case 'Internal error' : alert('Internal error'); break;
    }
}

function setNow(city) {

    let cityName = city.name
    UI_ELEMENTS.degree.textContent = `${parseInt(city.main.temp)}°C`
    UI_ELEMENTS.cityName[0].textContent = cityName
    let iconUrl = `https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`
    UI_ELEMENTS.imageNow.style.background = `url(${iconUrl}) 50% 50% no-repeat`
    isFavorite = isCity(cityName)
    colorFavorite(isFavorite)
}

function setDetails(city) {

    let dateSunset = new Date(city.sys.sunset);
    let dateSunrise = new Date(city.sys.sunrise);

    let timeSunrise = dateSunrise.toTimeString().split(' ')[0].slice(0, -3);
    let timeSunset = dateSunset.toTimeString().split(' ')[0].slice(0, -3);


    UI_ELEMENTS.cityName[1].textContent = city.name;
    UI_ELEMENTS.temp.textContent = `${parseInt(city.main.temp)}°C`;
    UI_ELEMENTS.feels.textContent = `${parseInt(city.main.feels_like)}°C`;
    UI_ELEMENTS.weather.textContent = city.weather[0].main;
    UI_ELEMENTS.sunrise.textContent = timeSunrise;
    UI_ELEMENTS.sunset.textContent = timeSunset;
}

function setForecast(city) {



    let cityName = city.name;
    const serverUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`

    UI_ELEMENTS.cityName[2].textContent = cityName;

    fetch(url)
        .then(response => response.json())
        .then(cityInfo =>
            getDate(cityInfo)
        ).then(cityInfo => createItems(cityInfo))



}



function getDate(cityInfo) {
    console.log(cityInfo.list)
    const massItem = []
    cityInfo.list.forEach((item, i) =>{
        const arrayItem = {
            time: new Date(cityInfo.list[i].dt_txt).toTimeString().split(' ')[0].slice(0, -3),
            day: new Date(cityInfo.list[i].dt_txt).toDateString().split(' ').reverse().slice(1,3).join(' '),
            temp: parseInt(cityInfo.list[i].main.temp),
            feelsLike: parseInt(cityInfo.list[i].main.feels_like),
            weather: cityInfo.list[i].weather[0].main,
            weather_img: cityInfo.list[i].weather[0].icon,
        }
        massItem.push(arrayItem)
    })
   return massItem

}

function createItems (massItem){
    massItem.forEach(arrayItem=>{
        const itemsShell =  document.createElement("div");
        itemsShell.classList.add('weather_forecast_item')

        const itemDay =  document.createElement("div");
        itemDay.classList.add('weather-forecast-item-date');
        const itemTemp =  document.createElement("div");
        itemTemp.classList.add('weather-forecast-item-temp')



        itemsShell.append(itemDay,itemTemp)

        const dayDate = document.createElement('div')
        dayDate.classList.add('item-date-day')
        dayDate.textContent = arrayItem.day
        const timeDate = document.createElement('div')
        timeDate.classList.add('item-date-time')
        timeDate.textContent = arrayItem.time

        itemDay.append(dayDate, timeDate)

        const itemTempInfo = document.createElement('div')
        itemTempInfo.classList.add('item-temp-info')
        // переименовать на мэйн
        const itemTempWeather = document.createElement('div')
        itemTempWeather.classList.add('item-temp-weather')

        itemTemp.append(itemTempInfo,itemTempWeather)
        //
        const temp = document.createElement('div')
        temp.textContent = `Temperature: ${arrayItem.temp}`
        const feel_like = document.createElement('div')
        feel_like.textContent = `Feel like: ${arrayItem.feelsLike}`

        itemTempInfo.append(temp,feel_like)

        const weather = document.createElement('div')
        weather.classList.add('item-weather')
        weather.textContent = arrayItem.weather
        const weather_img = document.createElement('img')
        weather_img.classList.add('item-weather-img')
        weather_img.src = `https://openweathermap.org/img/wn/${arrayItem.weather_img}@2x.png`

        itemTempWeather.prepend(weather,weather_img)

        UI_ELEMENTS.itemsList.append(itemsShell)
    })

}



function deleteCityElement (event){
    let cityName = event.target.previousElementSibling.textContent
    deleteCity(cityName);
    deleteFavoriteCity(cityName)
    colorFavorite(!cityName)
    event.target.parentElement.remove();

    let cityText = UI_ELEMENTS.cityText.textContent
    if(isCity(cityText)){
        colorFavorite('red')
    }
}

function showListCities(event){
    UI_ELEMENTS.itemsList.textContent = ""
    let cityName = event.target.textContent
    let isFavorite = isCity(cityName)
    fetchQuery(cityName)
    colorFavorite(isFavorite)
}
//rename
function fetchQuery(cityName){
    const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response=>response.json())
        .then(cityInfo => {
            catchError(cityInfo)
            setNow(cityInfo)
            setDetails(cityInfo)
            setForecast(cityInfo)
        })
}

function createAddedLocationElements (cityName){

    const shellCity = document.createElement("div");
    shellCity.classList.add("list-item");

    const cityNameElement = document.createElement('div')
    cityNameElement.textContent = cityName
    cityNameElement.addEventListener('click', showListCities)

    const buttonDeleteCity = document.createElement("input");
    buttonDeleteCity.classList.add("button_x");
    buttonDeleteCity.setAttribute("type", "button");
    buttonDeleteCity.setAttribute("value", "");
    buttonDeleteCity.addEventListener("click", deleteCityElement)

    shellCity.append(cityNameElement, buttonDeleteCity)
    UI_ELEMENTS.favoriteCitiesList.append(shellCity)
}

UI_ELEMENTS.formSearch.addEventListener('submit', function (event){
    event.preventDefault()

    UI_ELEMENTS.itemsList.textContent = ""
    const cityName = event.target.firstElementChild.value;

    fetchQuery(cityName)
    UI_ELEMENTS.formSearch.reset();
})

UI_ELEMENTS.favoriteCity.addEventListener('click', function (event){

    const cityName = event.target.parentElement.firstElementChild.textContent

    if(!isCity(cityName) && cityName !== 'City not found' && cityName){
        addCity(cityName)
        createAddedLocationElements(cityName)
        colorFavorite(cityName)
        setFavoriteCity(cityName)
    }
})


