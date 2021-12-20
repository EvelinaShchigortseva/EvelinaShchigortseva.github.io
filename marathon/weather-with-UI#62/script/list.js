let list = []

function  addCity(cityName){
    if(!list.includes(cityName)){
        list.push(cityName)
        return true
}
    else {return false}
}

function deleteCity(cityName){
    list = list.filter(item => item !== cityName);
}


export { addCity, deleteCity};
