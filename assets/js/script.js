var apikey = "a42e069d2d9555e36ce33bf63f6cfdae";
var searchCityList = [];
var city = document.getElementById('searchCity');
var searchButton = document.getElementById('search');
searchButton.addEventListener('click', searchFunction);
var Uv = document.getElementById('uv-index');
var clearHistory = document.getElementById('clearHistory')
clearHistory.addEventListener('click', function () { $('#searchHistory').empty() })
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

//event listener to trigger weather function
function searchFunction() {
    getWeather(city.value)
}

//function to gather weather info from api using city name
function getWeather(cityName) {


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=imperial&lang=en&mode=json`, requestOptions)
        .then(response => { return response.json() })
        .then(result => {
            res = result
            var date = moment().format("L")
            $('#weatherBigCard').empty();
            $('#searchHistory').append(`<button class="btn btn-sm btn-info my-1" style="max-width: fit-content"; onclick="getWeather(${res.name})">${res.name}</button>`)
            $('#weatherBigCard').append(
                `<div class="row">
            <div class="col-12">
                <div class="border rounded my-3 p-3">
                    <h2 id="city">${res.name}<h4 class="text-muted" id="date">(${date})<img src="https://openweathermap.org/img/w/${res.weather[0].icon}.png"></h4></h2>
                    
                    <p class="mb-1" id="temp">Temperature: ${res.main.temp}&#8457</p>
                    <p class="mb-1" id="humidity">Humidity: ${res.main.humidity}%</p>
                    <p class="mb-1" id="windSpeed">Wind Speed: ${res.wind.speed} mph</p>
                    <p id="uv-index"> </p>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <h3>5-Day Forecast</h3>
            </div>
        </div>
        <div id="fiveDayCards" class="row">    
        </div>`)
            return res
        }
        ).then(res => {
            var latitude = res.coord.lat;
            var longitude = res.coord.lon;
            getUVByCoordinates(latitude, longitude)
            getWeatherByCoordinates(latitude, longitude)

        }).catch(error => console.log('error', error));

}

//function to get UV data
function getUVByCoordinates(latitude, longitude) {
    var UVurl = `https://api.openweathermap.org/data/2.5/uvi?&lat=${latitude}&lon=${longitude}&appid=${apikey}`
    fetch(
        UVurl, requestOptions
    ).then(function (response) {
        return response.json()
    }).then(res => {

        $('#uv-index').append("UV-index: " + res.value)

    })

}

//function to get the 5 day forcast info
function getWeatherByCoordinates(latitude, longitude) {
    var forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=${apikey}&lat=${latitude}&lon=${longitude}`
    fetch(
        forcastUrl, requestOptions
    ).then(function (response) {

        return response.json()

    }).then(res => {
        for (var i = 1; i < res.list.length; i += 8) {
            var dateCard = moment(res.list[i].dt_txt).format("L")
            $('#fiveDayCards').append(`
                         <div  class="col-2">
                         <div class="card">
                             <div class="card-body">
                                 <h5 class="card-title">(${dateCard})</h5>
                                 <img src="https://openweathermap.org/img/w/${res.list[i].weather[0].icon}.png">
                                 <p class="card-text">Temperature: ${res.list[i].main.temp}&#8457</p>
                                 <p class="card-text">Humidity: ${res.list[i].main.humidity}%</p>
                                 <p class="card-text">Wind Speed: ${res.list[i].wind.speed} mph</p>
                             </div>
                         </div>
                         </div>
                     `)

        }

    })

}