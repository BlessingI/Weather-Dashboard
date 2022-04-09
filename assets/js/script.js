let citiesbox = document.querySelector('.citiesbox')
let searchBar= document.querySelector('.searchBar')
let apiName = document.querySelector('.apiName')
let button = document.querySelector('.btn')
let temperature = document.querySelector('.temp')
let wind = document.querySelector('.wind')
let humidity = document.querySelector('.humidity')
let uvIndex= document.querySelector('.uvIndex')

let firstTemp = document.querySelector('.firsttemp')
let secondTemp = document.querySelector('.secondtemp')
let thirdTemp = document.querySelector('.thirdtemp')
let fourthTemp = document.querySelector('.fourthtemp')
let fifthTemp = document.querySelector('.fifthtemp')

//query selector for wind!!
let firstWind = document.querySelector('.firstwind')
let secondWind = document.querySelector('.secondwind')
let thirdWind = document.querySelector('.thirdwind')
let fourthWind = document.querySelector('.fourthwind')
let fifthWind = document.querySelector('.fifthwind')

//query selector for Icons
let firstIcon1 = document.querySelector('.firstIcon')
let secondIcon1 = document.querySelector('.secondIcon')
let thirdIcon1 = document.querySelector('.thirdIcon')
let fourthIcon1 = document.querySelector('.fourthIcon')
let fifthIcon1 = document.querySelector('.fifthIcon')


//querySelector for humidity
let firstHumidity = document.querySelector('.firsthumidity')
let secondHumidity = document.querySelector('.secondhumidity')
let thirdHumidity = document.querySelector('.thirdhumidity')
let fourthHumidity = document.querySelector('.fourthhumidity')
let fifthHumidity = document.querySelector('.fifthhumidity')

//querySelector for Dates
let firstDate = document.querySelector('.firstDate')
let secondDate = document.querySelector('.secondDate')
let thirdDate = document.querySelector('.thirdDate')
let fourthDate = document.querySelector('.fourthDate')
let fifthDate = document.querySelector('.fifthDate')

//getting and displaying date
var day = new Date(); 
var dd = day.getDate(); 
var mm = day.getMonth()+1; 
var yyyy = day.getFullYear(); 
todaysDate = dd + '/' + mm + '/' + yyyy
//get next 5 days dates
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

let nextday =day.addDays(1);
let nextday2 =day.addDays(2);
let nextday3 =day.addDays(3);
let nextday4 =day.addDays(4);
let nextday5 =day.addDays(5);

let nextdayDd = nextday.getDate() + '/' + (nextday.getMonth()+1 )+ '/' + nextday.getFullYear()
let next2dayDd = nextday2.getDate() + '/' + (nextday2.getMonth()+1 )+ '/' + nextday2.getFullYear()
let next3dayDd = nextday3.getDate() + '/' + (nextday3.getMonth()+1 )+ '/' + nextday3.getFullYear()
let next4dayDd = nextday4.getDate() + '/' + (nextday4.getMonth()+1 )+ '/' + nextday4.getFullYear()
let next5dayDd = nextday5.getDate() + '/' + (nextday5.getMonth()+1 )+ '/' + nextday5.getFullYear()


let cityDiv

//save element to list
const saveToList = (event) => {
    event.preventDefault()
    let typedInput = searchBar.value

    if(searchBar.value == ""){
        alert("Please input a US city")
        citiesbox.appendChild(searchBar.value)
    }

    cityDiv = document.createElement('p')
    cityDiv.textContent = typedInput

    cityDiv.classList.add('rounded')
    cityDiv.classList.add('bg-secondary')
    cityDiv.classList.add('py-2')
    cityDiv.classList.add('my-2')
    cityDiv.classList.add('targetButton')
    citiesbox.appendChild(cityDiv)

    searchBar.value=""


    // call api
    getCityInUSWeather(typedInput)
    getUVI()
    getFiveDaysFocast(typedInput)
}



citiesbox.addEventListener('click', (event)=> {
    event.preventDefault()
    let countryInput = event.target.innerHTML  

    // call api
    getCityInUSWeather(countryInput)
    getUVI()
    getFiveDaysFocast(countryInput)
})




// fetch Api
const getCityInUSWeather = (city) => {
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",us&units=imperial&appid=396a111563a02c226f022b998b1b69da"

    fetch(apiUrl)
        .then(function(response) {
        if (response.ok) {
            response.json().then(function(data){
                let locationIcon = document.createElement('div')
                const {icon} = data.weather[0];
               

                locationIcon.innerHTML = `<img src=https://openweathermap.org/img/wn/${icon}@2x.png>`
                

                apiName.textContent = data.name + " (" + todaysDate + ") ";
                apiName.appendChild(locationIcon)
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
                    uvIndex.textContent = "UV Index: " + data.current.uvi;
                })

            }
        })
        
}

//five days Focast
const getFiveDaysFocast = (city) => {
    const fiveDays = "https://api.openweathermap.org/data/2.5/forecast?q=" + city +",us&units=imperial&lat=35&lon=139&cnt=5&appid=396a111563a02c226f022b998b1b69da"

    fetch(fiveDays)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data){
                    //pull out temp for 5 days
                    firstTemp.textContent= "Temp: " + data.list[0].main.temp + "°F"
                    secondTemp.textContent= "Temp: " + data.list[1].main.temp + "°F"
                    thirdTemp.textContent= "Temp: " + data.list[2].main.temp + "°F"
                    fourthTemp.textContent= "Temp: " + data.list[3].main.temp + "°F"
                    fifthTemp.textContent= "Temp: " + data.list[4].main.temp + "°F"

                    //pull out wind for 5 days
                    firstWind.textContent= "Wind: " + data.list[0].wind.speed + "MPH"
                    secondWind.textContent= "Wind: " + data.list[1].wind.speed + "MPH"
                    thirdWind.textContent= "Wind: " + data.list[2].wind.speed + "MPH"
                    fourthWind.textContent= "Wind: " + data.list[3].wind.speed + "MPH"
                    fifthWind.textContent= "Wind: " + data.list[4].wind.speed + "MPH"

                    //pull out Humidity for 5days
                    firstHumidity.textContent = "Humidity: " + data.list[0].main.humidity + " %";
                    secondHumidity.textContent = "Humidity: " + data.list[1].main.humidity + " %";
                    thirdHumidity.textContent = "Humidity: " + data.list[2].main.humidity + " %";
                    fourthHumidity.textContent = "Humidity: " + data.list[3].main.humidity + " %";
                    fifthHumidity.textContent = "Humidity: " + data.list[4].main.humidity + " %";

                    //pull out dates
                    firstDate.textContent = nextdayDd
                    secondDate.textContent = next2dayDd
                    thirdDate.textContent = next3dayDd
                    fourthDate.textContent = next4dayDd
                    fifthDate.textContent = next5dayDd

                    //display Icons
                    //day one icon
                    const iconparty = data.list[0].weather[0].icon;
                    let locationIcon1 = document.createElement('div')
                    locationIcon1.innerHTML= "<img src=https://openweathermap.org/img/wn/"+iconparty+"@2x.png>"
                   
                    firstIcon1.textContent = ""
                    firstIcon1.appendChild(locationIcon1)

                    //day two icon
                    const iconparty2 = data.list[1].weather[0].icon;
                    let locationIcon2 = document.createElement('div')
                    locationIcon2.innerHTML= "<img src=https://openweathermap.org/img/wn/"+iconparty2+"@2x.png>"
                   
                    secondIcon1.textContent = ""
                    secondIcon1.appendChild(locationIcon2)

                    //day three icon
                    const iconparty3 = data.list[2].weather[0].icon;
                    let locationIcon3 = document.createElement('div')
                    locationIcon3.innerHTML= "<img src=https://openweathermap.org/img/wn/"+iconparty3+"@2x.png>"
                   
                    thirdIcon1.textContent = ""
                    thirdIcon1.appendChild(locationIcon3)


                    //day four icon
                    const iconparty4 = data.list[3].weather[0].icon;
                    let locationIcon4 = document.createElement('div')
                    locationIcon4.innerHTML= "<img src=https://openweathermap.org/img/wn/"+iconparty4+"@2x.png>"
                   
                    fourthIcon1.textContent = ""
                    fourthIcon1.appendChild(locationIcon4)


                    //day five icon
                    const iconparty5 = data.list[4].weather[0].icon;
                    let locationIcon5 = document.createElement('div')
                    locationIcon5.innerHTML= "<img src=https://openweathermap.org/img/wn/"+iconparty5+"@2x.png>"
                   
                    fifthIcon1.textContent = ""
                    fifthIcon1.appendChild(locationIcon5)

                    

                })
            }
        })
}



button.addEventListener('click', saveToList)



