function processOffset(dateObj, offsetMinutes) {
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const date = dateObj.getDate();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  return new Date(year, month, date, hours, minutes + offsetMinutes);
}

function getUtc() {
  const localDate = new Date();
  const offsetMinutes = localDate.getTimezoneOffset();
  return processOffset(localDate, offsetMinutes);
}

function getCityTime(offsetSeconds) {
  const utc = getUtc();
  const offsetMinutes = offsetSeconds / 60;
  return processOffset(utc, offsetMinutes);
}

// eslint-disable-next-line import/prefer-default-export
export { getCityTime };
