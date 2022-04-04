let citiesbox = document.querySelector('.citiesbox')
let searchBar= document.querySelector('.searchBar')
let apiName = document.querySelector('.apiName')

let button = document.querySelector('.btn')
let temperature = document.querySelector('.temp')
let wind = document.querySelector('.wind')
let humidity = document.querySelector('.humidity')
let uvIndex= document.querySelector('.uvIndex')


const saveToList = (event) => {
    event.preventDefault()
    let typedInput = searchBar.value

    let cityDiv = document.createElement('p')
    cityDiv.textContent = typedInput

    cityDiv.classList.add('rounded')
    cityDiv.classList.add('bg-secondary')
    cityDiv.classList.add('py-2')
    cityDiv.classList.add('my-2')
    citiesbox.appendChild(cityDiv)


    // call api
    getCityInUSWeather(typedInput)
    getUVI()
}


// fetch Api
const getCityInUSWeather = (city) => {
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",us&appid=396a111563a02c226f022b998b1b69da"

    fetch(apiUrl)
        .then(function(response) {
        if (response.ok) {
            response.json().then(function(data){
                apiName.textContent = data.name;
                temperature.textContent = "Temp: " + data.main.temp + "°F";
                wind.textContent = "Wind: " + data.wind.speed + " MPH";
                humidity.textContent = "Humidity: " + data.main.humidity + " %";
            })

        }
    })
}



// UV index
const getUVI = () => {
    const uviUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=396a111563a02c226f022b998b1b69da"

    fetch(uviUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data){
                    console.log(data)
                    uvIndex.textContent = "UV Index: " + data.current.uvi;
                })

            }
        })
        
}









button.addEventListener('click', saveToList)