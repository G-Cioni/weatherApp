import { fetchCityData, getTemp, getHumidity, getCountry } from './fetch';

const cityName = document.getElementById('city-name');
const cityTemp = document.getElementById('city-temp');
const cityHumidity = document.getElementById('city-humidity');
const cityHigh = document.getElementById('city-high');
const cityLow = document.getElementById('city-low');
const cityCountry = document.getElementById('city-country');
const cityWeather = document.getElementById('city-weather');
const cityWeatherDescription = document.getElementById(
  'city-weather-description',
);
const cityWindSpeed = document.getElementById('city-wind-speed');
const cityWindDirection = document.getElementById('city-wind-direction');

function renderCityWindSpeed(cityData) {
  cityWindSpeed.textContent = `${cityData.wind.speed} m/s`;
}

function renderCityWindDirection(cityData) {
  cityWindDirection.textContent = `${cityData.wind.deg}°`;
}
function renderCityWeatherDesc(cityData) {
  cityWeatherDescription.textContent = cityData.weather[0].description;
}
function renderCityWeather(cityData) {
  cityWeather.textContent = cityData.weather[0].main;
}

function renderCityName(cityData) {
  cityName.textContent = cityData.name;
}

function renderCityCountry(cityData) {
  const country = getCountry(cityData);
  cityCountry.textContent = country;
  return country;
}
function renderCityHumidity(cityData) {
  const humidity = getHumidity(cityData);
  cityHumidity.textContent = `${humidity}%`;
}
function renderCityTemp(cityData, temp, unit, div) {
  const temperature = getTemp(cityData, temp, unit);
  // eslint-disable-next-line no-param-reassign
  div.textContent = `${`${temperature} ${unit}`}°`;
}
async function renderCityInfo(city) {
  const cityData = await fetchCityData(city);
  renderCityName(cityData);
  renderCityTemp(cityData, 'temp', 'c', cityTemp);
  renderCityTemp(cityData, 'temp_max', 'c', cityHigh);
  renderCityTemp(cityData, 'temp_min', 'c', cityLow);
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
