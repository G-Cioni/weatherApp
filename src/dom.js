import {
  fetchCityData,
  fetchForecastData,
  getTemp,
  getHumidity,
  getCountry,
} from './fetch';
import {
  convertToFahrenheit,
  convertToCelsius,
  convertToMph,
  convertToKph,
  msToKph,
  addHours,
} from './converters';
import { getCityTime, getSunrise, getSunset } from './time';

const sunriseElement = document.getElementById('sunrise');
const sunsetElement = document.getElementById('sunset');
const timeElement = document.getElementById('time');
const nameElement = document.getElementById('city');
const temperatureElement = document.getElementById('main-temperature');
const humidityElement = document.getElementById('humidity');
const countryElement = document.getElementById('country');
const weatherElement = document.getElementById('weather');
const windSpeedElement = document.getElementById('wind-speed');
const feelsLikeElement = document.getElementById('feels-like');
const celsiusBtnElement = document.getElementById('celsius');
const fahrenheitBtnElement = document.getElementById('fahrenheit');
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
  const forecastTemps = document.querySelectorAll('.forecast-temp');
  for (var i = 0; i < forecastTemps.length; i += 1) {
    forecastTemps[i].classList.remove(remove);
    forecastTemps[i].classList.add(add);
  }

  feelsLikeElement.classList.remove(remove);
  feelsLikeElement.classList.add(add);
}

function switchSpeedPseudoElement(remove, add) {
  windSpeedElement.classList.remove(remove);
  windSpeedElement.classList.add(add);
}

function convertAll(convertTemp, convertSpeed) {
  temperatureElement.textContent = convertTemp(temperatureElement.textContent);
  // low.textContent = convertTemp(low.textContent);
  // high.textContent = convertTemp(high.textContent);
  feelsLikeElement.textContent = convertTemp(feelsLikeElement.textContent);
  windSpeedElement.textContent = convertSpeed(windSpeedElement.textContent);
  const forecastTemps = [...document.querySelectorAll('.forecast-temp')];
  for (let i = 0; i < forecastTemps.length; i += 1) {
    forecastTemps[i].textContent = convertTemp(forecastTemps[i].textContent);
  }
}

function setImperial() {
  if (celsiusBtnElement.classList.contains('active-unit')) {
    celsiusBtnElement.classList.remove('active-unit');
    fahrenheitBtnElement.classList.add('active-unit');
    switchTempPseudoElements('temp-metric', 'temp-imperial');
    switchSpeedPseudoElement('speed-metric', 'speed-imperial');
    convertAll(convertToFahrenheit, convertToMph);
  }
}

function setMetric() {
  if (fahrenheitBtnElement.classList.contains('active-unit')) {
    fahrenheitBtnElement.classList.remove('active-unit');
    celsiusBtnElement.classList.add('active-unit');
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
  windSpeedElement.textContent = `${msToKph(cityData.wind.speed)}`;
}

function renderCityWeatherDesc(cityData) {
  const { description } = cityData.weather[0];
  weatherElement.textContent = capitalize(description);
}

function renderCityName(cityData) {
  nameElement.textContent = cityData.name;
}

function renderCityCountry(cityData) {
  countryElement.textContent = getCountry(cityData);
}

function renderCityHumidity(cityData) {
  humidityElement.textContent = `${getHumidity(cityData)}%`;
}

function renderCityTemp(cityData, temp, unit, div) {
  // eslint-disable-next-line no-param-reassign
  div.textContent = `${`${getTemp(cityData, temp, unit)}`}`;
}

function renderCityTime(offSetSeconds) {
  const dateString = getCityTime(offSetSeconds).toString().slice(0, 21);
  timeElement.textContent = dateString;
}

function renderSunrise(cityData) {
  const sunriseTime = getSunrise(cityData).toString().slice(16, 21);
  sunriseElement.textContent = sunriseTime;
}
function renderSunset(cityData) {
  const sunsetTime = getSunset(cityData).toString().slice(16, 21);
  sunsetElement.textContent = sunsetTime;
}
async function renderCityData(city) {
  const cityData = await fetchCityData(city);
  renderCityName(cityData);
  renderCityTemp(cityData, 'temp', 'C', temperatureElement);
  // renderCityTemp(cityData, 'temp_max', 'C', high);
  // renderCityTemp(cityData, 'temp_min', 'C', low);
  renderCityTemp(cityData, 'feels_like', 'C', feelsLikeElement);
  renderCityHumidity(cityData);
  renderCityCountry(cityData);
  renderCityWeatherDesc(cityData);
  renderCityWindSpeed(cityData);
  renderCityTime(cityData.timezone);
  renderSunrise(cityData);
  renderSunset(cityData);
  // renderCityWindDirection(cityData);
  return cityData;
}

//! From here on FORECAST

function pullForecastData(forecastDataItem) {
  const utcTime = forecastDataItem.dt_txt.slice(11, 16);
  const highTemp = forecastDataItem.main.temp_max;
  const lowTemp = forecastDataItem.main.temp_min;
  const avgTemp = Math.round((highTemp + lowTemp) / 2);
  const weather = forecastDataItem.weather[0].main;
  return { utcTime, avgTemp, weather };
}

function pullAllForecastData(forecastDataList) {
  return forecastDataList.reduce((accumulator, forecastDataItem) => {
    accumulator.push(pullForecastData(forecastDataItem));
    return accumulator;
  }, []);
}

function removeAllChildren(parentNode) {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.lastChild);
  }
}

function createForecastCard(forecastDataItem, forecastTime) {
  const forecastContainer = document.getElementById('forecast');
  const forecastCard = document.createElement('div');
  const time = document.createElement('div');
  const weatherCondition = document.createElement('div');
  const avgTemp = document.createElement('div');
  time.textContent = forecastTime;
  weatherCondition.textContent = forecastDataItem.weather;
  avgTemp.textContent = forecastDataItem.avgTemp;
  forecastCard.appendChild(time);
  forecastCard.appendChild(weatherCondition);
  avgTemp.classList.add('temp-metric', 'forecast-temp');
  forecastCard.appendChild(avgTemp);
  forecastCard.classList.add('forecast-card');
  forecastContainer.appendChild(forecastCard);
}

function createAllForecastCards(forecastDataArray, offSetHours) {
  removeAllChildren(document.getElementById('forecast'));
  forecastDataArray.forEach((forecastDataItem) => {
    const forecastTime = addHours(forecastDataItem.utcTime, offSetHours);
    createForecastCard(forecastDataItem, forecastTime);
  });
}

async function renderForecastData(city) {
  const forecastData = await fetchForecastData(city);
  const forecastDataArray = pullAllForecastData(forecastData.list);
  const offSetHours = forecastData.city.timezone / (60 * 60);
  createAllForecastCards(forecastDataArray, offSetHours);
  return forecastData;
}
// todo searching for a new city while in Imperial doesn't work

function renderAll(city) {
  renderCityData(city);
  renderForecastData(city);
}

//! FORECAST CODE FINISHES HERE

const input = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  renderAll(input.value);
});

celsiusBtnElement.addEventListener('click', () => {
  setMetric();
});
fahrenheitBtnElement.addEventListener('click', () => {
  setImperial();
});

// eslint-disable-next-line import/prefer-default-export
export { renderAll };
