var APIkey = '116630283f8adda1965e22975fef6733';
var cityInput = document.getElementById("city-input");
var submitBtn = document.getElementById("submitbtn");
var pastCity = document.getElementById("past-cities");
var searchedCities = [];
var currentForecast = document.getElementById("current-forecast");
var currentCityInfo = document.getElementById("city-info");
var currentConditions = document.getElementById("current-conditions");
var fiveDayForecast = document.getElementById("5-day-forecast");

function grabCurrentWeather() {
  
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
        displayCurrentWeather(data);
        grabFiveDayForecast(data);
        saveSearchedCity();
      }); 
      
     };

     function displayCurrentWeather(data) {

        var cityName = data.city.name;
        var weatherCondition = data.list[0].weather[0].main;
        var weatherDescription = data.list[0].weather[0].icon;
        var temperature = data.list[0].main.temp;
        var windspeed = data.list[0].wind.speed;
        var humidity = data.list[0].main.humidity;
        var date = new Date().toLocaleDateString();
        var iconLink ='http://openweathermap.org/img/wn/' + weatherDescription + '@2x.png';
     
        currentCityInfo.innerHTML = '<h2>' + cityName + ' '  + date  + "<img src ='"+iconLink+"'/>";
        
        currentConditions.innerHTML = '</h2>' + '<p>Weather: '+ weatherCondition  + '</p>' +
        '<p>Temperature: ' + temperature + '°F</p>' + '<p>Windspeed: ' + windspeed + 'mph</p>' + '<p>Humidity: ' + humidity + '%</p>';
     
        
         }; 

         function grabFiveDayForecast(data) {
      
            console.log(data);
            var forecastList = data.list;
            console.log(forecastList);
            var fiveDayData = [];
            for (var i = 0; i < forecastList.length; i += 8) {
  
              var dateAndTime = forecastList[i].dt_txt;
              var dateObj = new Date(dateAndTime);
              var month = dateObj.getMonth() + 1;  
              var day = dateObj.getDate();
              var year = dateObj.getFullYear();
              var date = month + '/' + day + '/' + year;
  
              var temperature = forecastList[i].main.temp;
              var weatherDescription = forecastList[i].weather[0].description;
              var windSpeed = forecastList[i].wind.speed;
              var humidity = forecastList[i].main.humidity;
              var icon = forecastList[i].weather[0].icon;
              fiveDayData.push({ date, temperature, weatherDescription, windSpeed, humidity, icon});
            }
            
            displayFiveDayForecast(fiveDayData);
         
      }
   
      function displayFiveDayForecast(fiveDayData) {
        
        fiveDayForecast.innerHTML = '';
        
        for (var i = 0; i < fiveDayData.length; i++) {
          var date = fiveDayData[i].date;
          var temperature = fiveDayData[i].temperature;
          var weatherDescription = fiveDayData[i].weatherDescription;
          var windSpeed = fiveDayData[i].windSpeed;
          var humidity = fiveDayData[i].humidity;
          var icon = fiveDayData[i].icon;
          var iconLink ='http://openweathermap.org/img/wn/' + icon + '@2x.png';
  
          var dayEl = document.createElement('div');
          dayEl.classList = ('border border-light card-body');
          
          dayEl.innerHTML =  '<h3>' + date + '</h3>' + '<p>Temperature: ' + temperature +
           '°F</p>' + '<p>Weather: ' + weatherDescription + "<img src ='"+iconLink+"'/>" +
             '</p>' + '<p>Wind Speed: ' + windSpeed + 'mph</p>' + '<p>Humidity: ' + humidity + '%</p>';
      
          
          fiveDayForecast.appendChild(dayEl);
          
        }
      };

      function saveSearchedCity() {
        var storedCities = JSON.parse(localStorage.getItem('searchedCities'));
        if (storedCities !== null) {
          searchedCities = storedCities;
          displaySearchedCities();
        }
      };
  
      function displaySearchedCities() {
        pastCity.innerHTML = '';
        for (var i = 0; i < searchedCities.length; i++) {
          var cityBtn = document.createElement('button');
          cityBtn.classList = 'rounded my-2list-group-item list-group-item-action';
          cityBtn.textContent = searchedCities[i];
          cityBtn.addEventListener('click', function() {
            cityInput.value = this.textContent;
            grabCurrentWeather();
          });
          pastCity.appendChild(cityBtn);
        }
      }

         submitBtn.addEventListener('click', function () {
           grabCurrentWeather();
            searchedCities.push(cityInput.value);
            localStorage.setItem('searchedCities', JSON.stringify(searchedCities));
          });
  
