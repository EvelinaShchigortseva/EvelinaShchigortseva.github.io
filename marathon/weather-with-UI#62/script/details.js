import {UI_ELEMENTS} from "./script.js";

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
export {setDetails}