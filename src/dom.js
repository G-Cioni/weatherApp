import { fetchCityData, getTemp, getHumidity, getCountry } from './fetch';
import {
  convertToFahrenheit,
  convertToCelsius,
  convertToMph,
  convertToKph,
  msToKph,
} from './converters';
import { getCityTime } from './time';

const time = document.getElementById('time');
const name = document.getElementById('city');
const temperature = document.getElementById('main-temperature');
const humidity = document.getElementById('humidity');
const country = document.getElementById('country');
const weather = document.getElementById('weather');
const windSpeed = document.getElementById('wind-speed');
const feelsLike = document.getElementById('feels-like');
const celsiusBtn = document.getElementById('celsius');
const fahrenheitBtn = document.getElementById('fahrenheit');
// const high = document.getElementById('high');
// const low = document.getElementById('low');
// const windDirection = document.getElementById('wind-direction');

// function renderCityWindDirection(cityData) {
//   windDirection.textContent = `${cityData.wind.deg}°`;
// }

function switchTempPseudoElements(remove, add) {
  // low.classList.remove(remove);
  // low.classList.add(add);
  // high.classList.remove(remove);
  // high.classList.add(add);
  feelsLike.classList.remove(remove);
  feelsLike.classList.add(add);
}

function switchSpeedPseudoElement(remove, add) {
  windSpeed.classList.remove(remove);
  windSpeed.classList.add(add);
}

function convertAll(convertTemp, convertSpeed) {
  temperature.textContent = convertTemp(temperature.textContent);
  // low.textContent = convertTemp(low.textContent);
  // high.textContent = convertTemp(high.textContent);
  feelsLike.textContent = convertTemp(feelsLike.textContent);
  windSpeed.textContent = convertSpeed(windSpeed.textContent);
}
function setImperial() {
  if (celsiusBtn.classList.contains('active-unit')) {
    celsiusBtn.classList.remove('active-unit');
    fahrenheitBtn.classList.add('active-unit');
    switchTempPseudoElements('temp-metric', 'temp-imperial');
    switchSpeedPseudoElement('speed-metric', 'speed-imperial');
    convertAll(convertToFahrenheit, convertToMph);
  }
}

function setMetric() {
  if (fahrenheitBtn.classList.contains('active-unit')) {
    fahrenheitBtn.classList.remove('active-unit');
    celsiusBtn.classList.add('active-unit');
    switchTempPseudoElements('temp-imperial', 'temp-metric');
    switchSpeedPseudoElement('speed-imperial', 'speed-metric');
    convertAll(convertToCelsius, convertToKph);
  }
}
function capitalize(string) {
  const wordArray = string.split('');
  wordArray[0] = wordArray[0].toUpperCase();
  return wordArray.join('');
}

function renderCityWindSpeed(cityData) {
  windSpeed.textContent = `${msToKph(cityData.wind.speed)}`;
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

function renderCityTime(offSetSeconds) {
  const dateString = getCityTime(offSetSeconds).toString().slice(0, 21);
  time.textContent = dateString;
}

async function renderCityInfo(city) {
  const cityData = await fetchCityData(city);
  renderCityName(cityData);
  renderCityTemp(cityData, 'temp', 'C', temperature);
  // renderCityTemp(cityData, 'temp_max', 'C', high);
  // renderCityTemp(cityData, 'temp_min', 'C', low);
  renderCityTemp(cityData, 'feels_like', 'C', feelsLike);
  renderCityHumidity(cityData);
  renderCityCountry(cityData);
  renderCityWeatherDesc(cityData);
  renderCityWindSpeed(cityData);
  renderCityTime(cityData.timezone);
  // renderCityWindDirection(cityData);
  return cityData;
}

const input = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  renderCityInfo(input.value);
});

celsiusBtn.addEventListener('click', () => {
  setMetric();
});
fahrenheitBtn.addEventListener('click', () => {
  setImperial();
});

// eslint-disable-next-line import/prefer-default-export
export { renderCityInfo };
