import { WeatherIcon } from '@/components/weather/WeatherIcon';

import type { TemperatureUnit } from '@/constants/temperature-units';

import { formatTemperature } from '@/utils/format-temperature';

interface Props {
  label: string;
  maxTemperature: number;
  minTemperature: number;
  unit: TemperatureUnit;
  weatherCode: number;
}

export function DailyForecastItem({ label, maxTemperature, minTemperature, unit, weatherCode }: Props) {
  return (
    <article className='weather-glass-muted flex h-44 min-w-[4.5rem] flex-1 flex-col items-center justify-center rounded-md px-2 py-4 text-center'>
      <p className='text-sm font-semibold'>{label}</p>
      <WeatherIcon
        code={weatherCode}
        isDay
        className='my-3 size-9 text-primary'
      />
      <p className='text-xs font-semibold whitespace-nowrap'>
        {formatTemperature(maxTemperature, unit)}
        <span className='font-normal text-foreground-muted'> / {formatTemperature(minTemperature, unit)}</span>
      </p>
    </article>
  );
}
