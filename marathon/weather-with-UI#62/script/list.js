let list = []


function isCity(cityName){
    return list.includes(cityName);
}

function addCity(cityName){
  if(!isCity(cityName)){
      list.push(cityName)
}}



function deleteCity(cityName){
    list = list.filter(item => item !== cityName);
}

export { list,addCity, deleteCity, isCity};
