//accessing the required dom elements
let locationCity = document.getElementById('searchLocation');
let cityTitle = document.getElementById('location');
let temp = document.getElementById('temp');
let weatherStatus = document.querySelector('.status');
let range = document.querySelector('.range');
let dateBox = document.getElementById('date');
let dayBox = document.getElementById('day');

//object to store the weather conditions
let weatherLst = {
    'Clear': {},
    'Rain': {},
    'Clouds': {},
    'Snow': {},
    'Smoke': {},
    'Haze': {},
    'Drizzle': {},
    'Mist': {},
    'Fog': {}
};

//to get the data
let currDate = new Date();
let day = currDate.getDay();
let date = currDate.getDate();
let month = currDate.getMonth();
let year = currDate.getFullYear();
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday', 'Saturday'];
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

//to update the value in the page
dayBox.innerText = `${daysOfWeek[day]}`;
dateBox.innerText = `${months[month]} ${date}, ${year}`;

//to access the geological data of the location
let getGeoData = (cityName) => {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=d00dfa901b2e8d978949507fbe2f1ee9`)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            //console.log(result)
            let city = result[0];
            getweatherData(city.lat, city.lon);
        })
        .catch((error) =>{
            alert('No data found. Try changing the location');
            console.log(error);
        });
};

// Progression 1: Create a function and fetch data using "fetch" from openweathermap api and display the data as given in reference image.
let getweatherData = (latitude, longitude) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d00dfa901b2e8d978949507fbe2f1ee9`)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            showWeather(result);
        })
        .catch((error)=>{
            console.log(error);
        });
};

//to show the weather over the screen
let showWeather = (Info) => {
    let weathInfo = Info.weather[0].main;
    console.log(weathInfo);
    weatherStatus.innerText = `${weathInfo}`;
    cityTitle.innerText += `, ${Info.sys.country}`;
    range.innerText = `${kelvinToCelsius(Info.main.temp_max)}°C / ${kelvinToCelsius(Info.main.temp_min)}°C`;
    temp.innerText = `${kelvinToCelsius(Info.main.feels_like)}°C`;
};

//to search the city and initialise the chain
let searchCity = (cityName = "Delhi") => {
    cityTitle.innerText = cityName;
    getGeoData(cityName);
};

//enabling the search bar
let searchBtn = document.getElementById('search');
searchBtn.onclick = () => {
    if (locationCity.value) {
        cityTitle.innerText = locationCity.value;
        searchCity(locationCity.value);
    }
};

//helper function for conversion of temperature from K to °C.
let kelvinToCelsius = (temp) => {
    return (temp - 273).toFixed(1);
};

//Initialising the chain of functions
searchCity();
