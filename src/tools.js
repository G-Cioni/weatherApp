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

function convertNumToTime(num) {
  const stringifiedNum = Math.round(num).toString();
  let result;
  if (stringifiedNum.length === 1) {
    result = `0${stringifiedNum}:00`;
  } else if (stringifiedNum.length === 2) {
    result = `${stringifiedNum}:00`;
  }
  return result;
}

function addHours(time, addend) {
  const hour = parseInt(time.slice(0, 2), 10) + 24;
  let newTime = hour + addend;
  newTime = newTime > 23 ? newTime - 24 : newTime;
  newTime = newTime > 23 ? newTime - 24 : newTime;
  return convertNumToTime(newTime);
}

// eslint-disable-next-line import/prefer-default-export
export {
  convertToFahrenheit,
  convertToCelsius,
  convertToKph,
  convertToMph,
  msToKph,
  addHours,
};
