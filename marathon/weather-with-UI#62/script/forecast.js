import {UI_ELEMENTS} from "./script.js";

async function setForecast(city) {

    let cityName = city.name;
    const serverUrl = 'http://api.openweathermap.org/data/2.5/forecast';
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`

    UI_ELEMENTS.cityName[2].textContent = cityName;

    let response = await fetch(url);
    let cityInfo = await response.json()

    let arrayInformation = collectData(cityInfo)
    createItems(arrayInformation)
}


function collectData(cityInfo) {

    const arrayInformation = []

    cityInfo.list.forEach((item, i) =>{
        const objectDataWeather = {
            time: new Date(cityInfo.list[i].dt_txt).toTimeString().split(' ')[0].slice(0, -3),
            day: new Date(cityInfo.list[i].dt_txt).toDateString().split(' ').reverse().slice(1,3).join(' '),
            temp: parseInt(cityInfo.list[i].main.temp),
            feelsLike: parseInt(cityInfo.list[i].main.feels_like),
            weather: cityInfo.list[i].weather[0].main,
            weather_img: cityInfo.list[i].weather[0].icon,
        }
        arrayInformation.push(objectDataWeather)
    })
    return arrayInformation

}

function createItems (arrayInformation){
    arrayInformation.forEach(arrayItem=>{
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
        const itemTempWeather = document.createElement('div')
        itemTempWeather.classList.add('item-temp-weather')

        itemTemp.append(itemTempInfo,itemTempWeather)

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
        weather_img.src = `http://openweathermap.org/img/wn/${arrayItem.weather_img}@2x.png`

        itemTempWeather.prepend(weather,weather_img)

        UI_ELEMENTS.itemsList.append(itemsShell)
    })

}

export {setForecast}