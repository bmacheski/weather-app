var API_URL = 'http://api.wunderground.com/api/3fa89a5b727cc31d/forecast10day/conditions'
var zipbutton = document.querySelector('.zip-search');
var locbutton = document.querySelector('.loc-search');
var daytitle = document.querySelector('.daytitle')
var parent = document.querySelector('.parent');
var currenttempspan = document.querySelector('span');
var usercity = document.querySelector('.user-city');
var userregion = document.querySelector('.user-region');
var daysofweek = document.querySelectorAll('.dayweek');
var weekhighs = document.querySelectorAll('.day-high');
var weekimgs = document.querySelectorAll('.day-img');
var weeklows = document.querySelectorAll('.day-low');

zipbutton.onclick = function() {
  var zipinput = document.querySelector('input').value;
  var ZIP_URL = API_URL + '/q/' + zipinput + '.json';
  getJSON(ZIP_URL, function(data) {
    createWeatherEls(data);
  });
}

locbutton.onclick = function() {
  navigator.geolocation.getCurrentPosition(function(location) {
    var lat = location.coords.latitude;
    var long = location.coords.longitude;
    var LOC_URL = API_URL + '/geolookup/q/' + lat + ',' + long + '.json';
    getJSON(LOC_URL, function(data) {
      createWeatherEls(data);
    });
  });
}

function createWeatherEls(data) {
  daytitle.classList.remove('hidden');
  parent.classList.remove('hidden');
  usercity.innerHTML = data.current_observation.display_location.city;
  userregion.innerHTML = data.current_observation.display_location.state;
  currenttempspan.innerHTML = data.current_observation.temp_f;
  for (var i = 0; i < daysofweek.length; i++) {
    daysofweek[i].innerHTML = data.forecast.simpleforecast.forecastday[i].date.weekday;
    weekhighs[i].innerHTML = data.forecast.simpleforecast.forecastday[i].high.fahrenheit;
    weekimgs[i].src = data.forecast.simpleforecast.forecastday[i].icon_url;
    weeklows[i].innerHTML = data.forecast.simpleforecast.forecastday[i].low.fahrenheit;
  }
}

function getJSON(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      cb(JSON.parse(this.response));
    }
  };
  xhr.send();
}
