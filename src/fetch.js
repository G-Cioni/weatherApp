import { convToFahrenheit } from './miscellaneous';

const apiKey = 'a4c958d3ad3419e33e51b58a31da8bc4';

//! TODO Must add error handling

async function fetchCityData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
    { mode: 'cors' },
  );
  const data = await response.json();
  return data;
}

async function fetchFiveDayData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`,
    { mode: 'cors' },
  );
  const data = await response.json();
  return data;
}

fetchFiveDayData('rome,italy').then((data) => console.log(data));

fetchCityData('rome,Italy').then((data) => console.log(data));

function getTemp(cityData, temp, unit) {
  const celsiusTemp = cityData.main[temp] - 273.15;
  return unit === 'f' ? convToFahrenheit(celsiusTemp) : Math.round(celsiusTemp);
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

// fetchOffLinedata('rome').then((data) => console.log(data));
// eslint-disable-next-line import/prefer-default-export
export { fetchCityData, getTemp, getHumidity, getCountry };
