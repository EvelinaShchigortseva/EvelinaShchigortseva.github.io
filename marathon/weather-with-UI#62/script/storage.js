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

export {setFavoriteCity,deleteFavoriteCity,getFavoriteCities}