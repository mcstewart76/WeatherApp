var apikey = "a42e069d2d9555e36ce33bf63f6cfdae";
var searchCityList = [];
var city = document.getElementById('searchCity');
var searchButton = document.getElementById('search');
searchButton.addEventListener('click',searchFunction);
var Uv = document.getElementById('uv-index');
var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
function searchFunction(){
    getWeather(city.value)
    console.log(city.value)
}

function getWeather(cityName){
    
      
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=imperial&lang=en&mode=json`, requestOptions)
        .then(response => {return response.json()})
        .then(result => {
            res = result
           
            $('#weatherBigCard').empty();
            $('#fiveDayCards').empty();
            //getForcastByCoordinates(latitude, longitude)
            $('#weatherBigCard').append(
                `<div class="row">
            <div class="col-12">
                <div class="border rounded my-3 p-3">
                    <h2 id="city">${res.name}<small class="text-muted" id="date"></small></h2>

                    <p class="mb-1" id="temp">Temperature: ${res.main.temp}&#8457</p>
                    <p class="mb-1" id="humidity">Humidity: ${res.main.humidity}%</p>
                    <p class="mb-1" id="windSpeed">Wind Speed: ${res.wind.speed} </p>
                    <p id="uv-index"> </p>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <h3>5-Day Forecast</h3>
            </div>
        </div>`)

            console.log(res)
            return res
            }
        ).then(res => {
            var latitude = res.coord.lat;
            var longitude = res.coord.lon;
            getWeatherByCoordinates(latitude,longitude)
            
        }).catch(error => console.log('error', error));

        
        
        
        
}
function getWeatherByCoordinates(latitude,longitude){
    var UVurl = `https://api.openweathermap.org/data/2.5/uvi?&lat=${latitude}&lon=${longitude}&appid=${apikey}`
            fetch(
                        UVurl, requestOptions
                    ).then(function(response){
                        return response.json()
                        //Uv.text( response.value);
                    }).then(res => {
                        
                        $('#uv-index').append("UV-index: " + res.value)
                        
                    })
                    
}