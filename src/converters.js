function convertToFahrenheit(celsiusTemp) {
  return Math.round(celsiusTemp * 1.8 + 32);
}
function convertToCelsius(fahrenheitTemp) {
  return Math.round((fahrenheitTemp - 32) / 1.8);
}

function msToKph(msSpeed) {
  return Math.round(msSpeed * 36) / 10;
}

function convertToMph(kphSpeed) {
  return Math.round((kphSpeed / 1.609) * 10) / 10;
}

function convertToKph(mphSpeed) {
  return Math.round(mphSpeed * 1.609 * 10) / 10;
}

// eslint-disable-next-line import/prefer-default-export
export {
  convertToFahrenheit,
  convertToCelsius,
  convertToKph,
  convertToMph,
  msToKph,
};
