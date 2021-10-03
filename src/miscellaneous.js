function convertToFahrenheit(celsiusTemp) {
  return Math.round(celsiusTemp * 1.8 + 32);
}
function convertToCelsius(fahrenheitTemp) {
  return Math.round((fahrenheitTemp - 32) * 1.8);
}

// eslint-disable-next-line import/prefer-default-export
export { convertToFahrenheit, convertToCelsius };
