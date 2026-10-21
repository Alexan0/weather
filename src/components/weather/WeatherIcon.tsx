import { WEATHER_CODES } from '@/constants/weather-codes';

import { getPublicAssetPath } from '@/config/base-path';

import { cn } from '@/lib/cn';

interface Props {
  code: number;
  isDay: boolean;
  className?: string;
}

export function WeatherIcon({ code, isDay, className }: Props) {
  let icon = isDay ? 'clear-day.svg' : 'clear-night.svg';

  if (WEATHER_CODES.OVERCAST.includes(code)) icon = 'overcast.svg';
  else if (WEATHER_CODES.PARTLY_CLOUDY.includes(code)) {
    icon = isDay ? 'partly-cloudy-day.svg' : 'partly-cloudy-night.svg';
  } else if (WEATHER_CODES.FOG.includes(code)) icon = isDay ? 'fog-day.svg' : 'fog-night.svg';
  else if (WEATHER_CODES.DRIZZLE.includes(code)) icon = 'drizzle.svg';
  else if (WEATHER_CODES.RAIN.includes(code)) icon = 'rain.svg';
  else if (WEATHER_CODES.SNOW.includes(code)) icon = 'snow.svg';
  else if (WEATHER_CODES.THUNDERSTORM.includes(code)) {
    icon = isDay ? 'thunderstorms-day-rain.svg' : 'thunderstorms-night-rain.svg';
  }

  return (
    <span
      aria-hidden='true'
      className={cn('block size-full bg-contain bg-center bg-no-repeat', className)}
      style={{ backgroundImage: `url(${getPublicAssetPath(`/weather-icons/${icon}`)})` }}
    />
  );
}
