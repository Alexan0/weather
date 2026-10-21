import { WeatherIcon } from '@/components/weather/WeatherIcon';

import type { TemperatureUnit } from '@/constants/temperature-units';

import { formatTemperature } from '@/utils/format-temperature';

interface Props {
  isDay: boolean;
  label: string;
  temperature: number;
  unit: TemperatureUnit;
  weatherCode: number;
}

export function HourlyForecastItem({ isDay, label, temperature, unit, weatherCode }: Props) {
  return (
    <article className='flex min-w-[3.55rem] flex-1 flex-col items-center justify-center gap-3 rounded-full border border-border px-2 py-3 sm:min-w-[3.8rem]'>
      <p className='text-sm font-medium'>{label}</p>
      <WeatherIcon
        code={weatherCode}
        isDay={isDay}
        className='size-7 text-primary'
      />
      <p className='text-sm font-medium'>{formatTemperature(temperature, unit)}</p>
    </article>
  );
}
