import {deleteCity, isCity} from "./list.js";
import {deleteFavoriteCity, saveCurrentCity} from "./storage.js";
import {UI_ELEMENTS,getWeatherInformation} from './script.js'
import {colorFavorite} from './now.js'


function showFavoriteCity(event){
    UI_ELEMENTS.itemsList.textContent = ""
    let cityName = event.target.textContent
    let isFavorite = isCity(cityName)
    getWeatherInformation(cityName)
    colorFavorite(isFavorite)
    saveCurrentCity(cityName)
}

function createAddedFavoriteCitiesElements (cityName){

    const shellCity = document.createElement("div");
    shellCity.classList.add("list-item");

    const cityNameElement = document.createElement('div')
    cityNameElement.textContent = cityName
    cityNameElement.addEventListener('click', showFavoriteCity)

    const buttonDeleteCity = document.createElement("input");
    buttonDeleteCity.classList.add("button_x");
    buttonDeleteCity.setAttribute("type", "button");
    buttonDeleteCity.setAttribute("value", "");
    buttonDeleteCity.addEventListener("click", deleteFavoriteCityElement)

    shellCity.append(cityNameElement, buttonDeleteCity)
    UI_ELEMENTS.favoriteCitiesList.append(shellCity)
}


function deleteFavoriteCityElement (event){
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
export { createAddedFavoriteCitiesElements, deleteFavoriteCityElement}
