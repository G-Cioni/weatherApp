import { convertToFahrenheit } from './converters';

const apiKey = 'a4c958d3ad3419e33e51b58a31da8bc4';

//! TODO Must add error handling

async function fetchCityData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`,
    { mode: 'cors' },
  );
  const data = await response.json();
  return data;
}

async function fetchForecastData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=8&units=metric&appid=${apiKey}`,
    { mode: 'cors' },
  );
  const data = await response.json();
  return data;
}

function getTemp(cityData, temp, unit) {
  const celsiusTemp = cityData.main[temp];
  return unit === 'F'
    ? convertToFahrenheit(celsiusTemp)
    : Math.round(celsiusTemp);
}

// eslint-disable-next-line no-unused-vars
function getHumidity(cityData) {
  const { humidity } = cityData.main;
  return humidity;
}

function getCountry(cityData) {
  const { country } = cityData.sys;
  return country;
}

// eslint-disable-next-line import/prefer-default-export
export { fetchCityData, fetchForecastData, getTemp, getHumidity, getCountry };
