import type { WeatherForecast } from '@/types/weather';

import { formatWeatherChartHour } from '../utils/format-weather-time';
import { getCurrentHourIndex } from '../utils/get-current-hour-index';

import { HumidityStatus } from './HumidityStatus';
import { RainChanceChart } from './RainChanceChart';
import { UvIndexGauge } from './UvIndexGauge';
import { WindStatus } from './WindStatus';

interface Props {
  weather: WeatherForecast;
}

export function TodayHighlights({ weather }: Props) {
  const { current, daily, hourly } = weather;
  const currentHourIndex = getCurrentHourIndex(hourly.time, current.time);
  const rainChanceData = Array.from({ length: 6 }, (_, index) => currentHourIndex + index)
    .filter(index => index < hourly.time.length)
    .map(index => ({
      label: formatWeatherChartHour(hourly.time[index]),
      probability: hourly.precipitation_probability[index]
    }));

  return (
    <section
      aria-labelledby='today-highlights-heading'
      className='weather-glass flex h-full flex-col rounded-lg border border-border p-5 sm:p-6'
    >
      <h2
        id='today-highlights-heading'
        className='text-2xl font-medium tracking-tight'
      >
        Today&apos;s highlights
      </h2>
      <div className='mt-5 grid flex-1 gap-4 sm:grid-cols-2 sm:grid-rows-2'>
        <RainChanceChart data={rainChanceData} />
        <UvIndexGauge index={daily.uv_index_max[0]} />
        <WindStatus
          direction={current.wind_direction_10m}
          speed={current.wind_speed_10m}
        />
        <HumidityStatus humidity={current.relative_humidity_2m} />
      </div>
    </section>
  );
}
