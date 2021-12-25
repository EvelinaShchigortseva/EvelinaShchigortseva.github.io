import {isCity} from "./list.js";
import {UI_ELEMENTS} from './script.js'


function setNow(city) {
    let isFavorite
    let cityName = city.name
    let iconUrl = `http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`
    UI_ELEMENTS.degree.textContent = `${parseInt(city.main.temp)}°C`
    UI_ELEMENTS.cityName[0].textContent = cityName
    UI_ELEMENTS.imageNow.style.background = `url(${iconUrl}) 50% 50% no-repeat`
    isFavorite = isCity(cityName)
    colorFavorite(isFavorite)
}
function colorFavorite(cityName){
    if(cityName){
        UI_ELEMENTS.favoriteCity.style.background = 'url("../img/like-red.svg") no-repeat'
    }
    else{
        UI_ELEMENTS.favoriteCity.style.background = 'url("../img/like.svg") no-repeat'
    }
}

export {setNow, colorFavorite}