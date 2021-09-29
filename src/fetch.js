const apiKey = 'a4c958d3ad3419e33e51b58a31da8bc4';

async function fetchCityData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
    { mode: 'cors' },
  );
  const data = await response.json();
  return data;
}

function getCityTemp(cityData, unit) {
  const celsiusTemp = cityData.main.temp - 273.15;
  return unit === 'c'
    ? Math.round(celsiusTemp)
    : Math.round(celsiusTemp * 1.8 + 32);
}

function getHumidity(cityData) {
  const { humidity } = cityData.main;
  return humidity;
}

fetchCityData('rome').then((data) => {
  console.log(getCityTemp(data, 'f'));
  console.log(getCityTemp(data, 'c'));
});

// fetchOffLinedata('rome').then((data) => console.log(data));
// eslint-disable-next-line import/prefer-default-export
