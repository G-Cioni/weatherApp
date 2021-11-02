/* eslint-disable import/no-duplicates */
import clear from './img/day.svg';
import clearNight from './img/night.svg';
import clouds from './img/cloudy-day-1.svg';
import cloudsNight from './img/cloudy-night-1.svg';
import rain from './img/rainy-7.svg';
import snow from './img/snowy-6.svg';
import thunder from './img/thunder.svg';
import mist from './img/cloudy.svg';
import fog from './img/cloudy.svg';

const weatherIcons = {
  clear,
  clearNight,
  clouds,
  cloudsNight,
  rain,
  snow,
  thunder,
  mist,
  fog,
};

function createWeatherIcon(weatherCondition) {
  const image = new Image();
  image.src = weatherCondition;
  return image;
}

export { weatherIcons, createWeatherIcon };
