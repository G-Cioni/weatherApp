import { fetchCityData, getTemp, getHumidity, getCountry } from './fetch';
import { convertToFahrenheit, convertToCelsius } from './miscellaneous';

const name = document.getElementById('name');
const temperature = document.getElementById('main-temperature');
const humidity = document.getElementById('humidity');
const high = document.getElementById('high');
const low = document.getElementById('low');
const country = document.getElementById('country');
const weather = document.getElementById('weather-description');
const windSpeed = document.getElementById('wind-speed');
const windDirection = document.getElementById('wind-direction');
const feelsLike = document.getElementById('feels-like');
const celsiusBtn = document.getElementById('celsius');
const fahrenheitBtn = document.getElementById('fahrenheit');

function switchUnitPseudoElements(remove, add) {
  low.classList.remove(remove);
  low.classList.add(add);
  high.classList.remove(remove);
  high.classList.add(add);
  feelsLike.classList.remove(remove);
  feelsLike.classList.add(add);
}

function convertAllTemp(convertFunc) {
  temperature.textContent = convertFunc(temperature.textContent);
  low.textContent = convertFunc(low.textContent);
  high.textContent = convertFunc(high.textContent);
  feelsLike.textContent = convertFunc(feelsLike.textContent);
}
function setFahrenheit() {
  if (celsiusBtn.classList.contains('active-unit')) {
    celsiusBtn.classList.remove('active-unit');
    fahrenheitBtn.classList.add('active-unit');
    switchUnitPseudoElements('temperature-celsius', 'temperature-fahrenheit');
    convertAllTemp(convertToFahrenheit);
  }
}

function setCelsius() {
  if (fahrenheitBtn.classList.contains('active-unit')) {
    fahrenheitBtn.classList.remove('active-unit');
    celsiusBtn.classList.add('active-unit');
    switchUnitPseudoElements('temperature-fahrenheit', 'temperature-celsius');
    convertAllTemp(convertToCelsius);
  }
}
function capitalize(string) {
  const wordArray = string.split('');
  wordArray[0] = wordArray[0].toUpperCase();
  return wordArray.join('');
}

function renderCityWindSpeed(cityData) {
  windSpeed.textContent = `${cityData.wind.speed} m/s`;
}

function renderCityWindDirection(cityData) {
  windDirection.textContent = `${cityData.wind.deg}°`;
}

function renderCityWeatherDesc(cityData) {
  const { description } = cityData.weather[0];
  weather.textContent = capitalize(description);
}

function renderCityName(cityData) {
  name.textContent = cityData.name;
}

function renderCityCountry(cityData) {
  country.textContent = getCountry(cityData);
}

function renderCityHumidity(cityData) {
  humidity.textContent = `${getHumidity(cityData)}%`;
}

function renderCityTemp(cityData, temp, unit, div) {
  // eslint-disable-next-line no-param-reassign
  div.textContent = `${`${getTemp(cityData, temp, unit)}`}`;
}

async function renderCityInfo(city) {
  const cityData = await fetchCityData(city);
  renderCityName(cityData);
  renderCityTemp(cityData, 'temp', 'C', temperature);
  renderCityTemp(cityData, 'temp_max', 'C', high);
  renderCityTemp(cityData, 'temp_min', 'C', low);
  renderCityTemp(cityData, 'feels_like', 'C', feelsLike);
  renderCityHumidity(cityData);
  renderCityCountry(cityData);
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

celsiusBtn.addEventListener('click', () => {
  setCelsius();
});
fahrenheitBtn.addEventListener('click', () => {
  setFahrenheit();
});
