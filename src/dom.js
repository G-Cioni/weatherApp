import { fetchCityData, getTemp, getHumidity, getCountry } from './fetch';

const name = document.getElementById('name');
const temperature = document.getElementById('temp');
const humidity = document.getElementById('humidity');
const high = document.getElementById('high');
const low = document.getElementById('low');
const country = document.getElementById('country');
const weather = document.getElementById('weather');
const weatherDescription = document.getElementById('weather-description');
const windSpeed = document.getElementById('wind-speed');
const windDirection = document.getElementById('wind-direction');

function renderCityWindSpeed(cityData) {
  windSpeed.textContent = `${cityData.wind.speed} m/s`;
}

function renderCityWindDirection(cityData) {
  windDirection.textContent = `${cityData.wind.deg}°`;
}
function renderCityWeatherDesc(cityData) {
  weatherDescription.textContent = cityData.weather[0].description;
}
function renderCityWeather(cityData) {
  weather.textContent = cityData.weather[0].main;
}

function renderCityName(cityData) {
  name.textContent = cityData.name;
}

function renderCityCountry(cityData) {
  country.textContent = getCountry(cityData);
}
function renderCityHumidity(cityData) {
  humidity.textContent = getHumidity(cityData);
}
function renderCityTemp(cityData, temp, unit, div) {
  // eslint-disable-next-line no-param-reassign
  div.textContent = `${`${getTemp(cityData, temp, unit)} ${unit}`}°`;
}
async function renderCityInfo(city) {
  const cityData = await fetchCityData(city);
  renderCityName(cityData);
  renderCityTemp(cityData, 'temp', 'c', temperature);
  renderCityTemp(cityData, 'temp_max', 'c', high);
  renderCityTemp(cityData, 'temp_min', 'c', low);
  renderCityHumidity(cityData);
  renderCityCountry(cityData);
  renderCityWeather(cityData);
  renderCityWeatherDesc(cityData);
  renderCityWindSpeed(cityData);
  renderCityWindDirection(cityData);
  return cityData;
}

const input = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  renderCityInfo(input.value);
});

renderCityInfo('roma,it');
