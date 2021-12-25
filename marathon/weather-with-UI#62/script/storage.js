function setFavoriteCity(cityName){
    const cities = getFavoriteCities()
    cities.push(cityName)
    localStorage.setItem('cities', cities.toString())
}

function deleteFavoriteCity(cityName){
    let cities = getFavoriteCities()
    cities = cities.filter(item => item !== cityName)
    localStorage.setItem('cities', cities.toString())
}

function getFavoriteCities(){
    const citiesString = localStorage.getItem('cities')
    return citiesString ? citiesString.split(',') : []
}
function getCurrentCity(){
    const currentCityString = localStorage.getItem('currentCity')
    return currentCityString ? currentCityString.split(',') : []
}

function saveCurrentCity(currentCityString){
 return localStorage.setItem('currentCity', currentCityString)
}
export {setFavoriteCity,deleteFavoriteCity,getFavoriteCities, saveCurrentCity,getCurrentCity}