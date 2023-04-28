var APIkey = '116630283f8adda1965e22975fef6733';
var cityInput = document.getElementById("city-searched");
var submitBtn = document.getElementById("submitbtn");
var pastCity = document.getElementById("past-cities");
var searchedCities = [];
var currentForecast = document.getElementById("current-forecast");
var currentCityEl = document.getElementById("city-info");
var currentConditions = document.getElementById("current-conditions");
var fiveDayForecast = document.getElementById("5-day-forecast");

function getWeather() {
  
    var city = cityInput.value;
    var currentDay = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=' + APIkey;
    fetch(currentDay)
      .then(function (response) {
        if (response.ok) {
          console.log(response.status);
          return response.json();
        }
      })
      .then(function (data) {
        console.log(data);
        displayResults(data);
      }); 
      
     };

     function displayResults(data) {

        var cityName = data.city.name;
        var weatherCondition = data.list[0].weather[0].main;
        var weatherDescription = data.list[0].weather[0].icon;
        var temperature = data.list[0].main.temp;
        var windspeed = data.list[0].wind.speed;
        var humidity = data.list[0].main.humidity
        var date = new Date().toLocaleDateString();
        var iconLink ='http://openweathermap.org/img/wn/' + weatherDescription + '@2x.png';
     
        currentCityEl.innerHTML = '<h2>' + cityName + ' '  + date  + "<img src ='"+iconLink+"'/>";
        currentConditions.innerHTML = '</h2>' + '<p>Weather:'+ weatherCondition  + '</p>' +'<p>Temperature:' + temperature + '°F</p>' + '<p>Windspeed: ' + windspeed + 'mph</p>' + '<p>Humidity: ' + humidity + '%</p>';
     
        
         };

         submitBtn.addEventListener('click', function () {
           getWeather();
            searchedCities.push(cityInput.value);
            localStorage.setItem('searchedCities', JSON.stringify(searchedCities));
          });
  