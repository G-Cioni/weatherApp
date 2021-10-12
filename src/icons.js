import clear from './img/day.svg';
import night from './img/night.svg';
import clouds from './img/cloudy-day-1.svg';
import cloudyNight from './img/cloudy-night-1.svg';
import rain from './img/rainy-7.svg';
import snow from './img/snowy-6.svg';
import thunder from './img/thunder.svg';

const weatherIconsRaw = {
  clear,
  night,
  clouds,
  cloudyNight,
  rain,
  snow,
  thunder,
};

function createWeatherIcon(weatherCondition) {
  const image = new Image();
  image.src = weatherCondition;
  return image;
}

export { weatherIconsRaw, createWeatherIcon };
