import { WEATHER_CODES } from '@/constants/weather-codes';

export function getWeatherCondition(code: number) {
  if (WEATHER_CODES.CLEAR_SKY.includes(code)) return 'Clear sky';
  if (WEATHER_CODES.PARTLY_CLOUDY.includes(code)) return 'Partly cloudy';
  if (WEATHER_CODES.OVERCAST.includes(code)) return 'Overcast';
  if (WEATHER_CODES.FOG.includes(code)) return 'Foggy';
  if (WEATHER_CODES.DRIZZLE.includes(code)) return 'Drizzle';
  if (WEATHER_CODES.RAIN.includes(code)) return 'Rainy';
  if (WEATHER_CODES.SNOW.includes(code)) return 'Snowy';
  if (WEATHER_CODES.THUNDERSTORM.includes(code)) return 'Thunderstorm';

  return 'Cloudy';
}
