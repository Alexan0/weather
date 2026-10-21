'use client';

import { useState } from 'react';

import { Tabs } from '@/components/ui';
import { WeatherIcon } from '@/components/weather/WeatherIcon';

import { useTemperatureUnit } from '@/hooks/useTemperatureUnit';

import { formatTemperature } from '@/utils/format-temperature';
import { getWeatherCondition } from '@/utils/get-weather-condition';

import type { WeatherForecast } from '@/types/weather';

import { cn } from '@/lib/cn';

import { formatWeatherDay } from '../utils/format-weather-day';
import { formatDayLength, formatWeatherHour, formatWeatherTime } from '../utils/format-weather-time';
import { getCurrentHourIndex } from '../utils/get-current-hour-index';
import { isWeatherTimeDaytime } from '../utils/is-weather-time-daytime';

import { DailyForecastItem } from './DailyForecastItem';
import { HourlyForecastItem } from './HourlyForecastItem';

const FORECAST_TABS = [
  { label: 'Today', value: 'today' },
  { label: 'Week', value: 'week' }
] as const;

type ForecastTab = (typeof FORECAST_TABS)[number]['value'];

interface Props {
  weather: WeatherForecast;
}

export function TodayWeek({ weather }: Props) {
  const [activeTab, setActiveTab] = useState<ForecastTab>('today');
  const { unit } = useTemperatureUnit();
  const { current, daily, hourly } = weather;
  const currentHourIndex = getCurrentHourIndex(hourly.time, current.time);
  const nextHours = Array.from({ length: 5 }, (_, index) => currentHourIndex + index).filter(
    index => index < hourly.time.length
  );
  const tomorrowIndex = daily.time.length > 1 ? 1 : 0;
  const tomorrowCode = daily.weather_code[tomorrowIndex];

  return (
    <section
      aria-labelledby='today-week-heading'
      className='weather-glass min-w-0 max-w-full rounded-lg border border-border p-5 sm:p-6'
    >
      <h2
        id='today-week-heading'
        className='sr-only'
      >
        Weather forecast
      </h2>

      <div className='flex items-center justify-between gap-3'>
        <Tabs
          ariaLabel='Forecast period'
          id='forecast-period'
          onValueChange={setActiveTab}
          options={FORECAST_TABS}
          value={activeTab}
        />
        <span className='hidden text-sm text-foreground-muted sm:block'>
          {activeTab === 'today' ? 'Next hours' : '7-day forecast'}
        </span>
      </div>

      <div className='mt-5 sm:grid'>
        <div
          aria-hidden={activeTab !== 'today'}
          aria-labelledby='forecast-period-today-tab'
          className={cn(
            'grid gap-5 sm:col-start-1 sm:row-start-1 sm:grid-cols-[minmax(0,1fr)_9rem]',
            activeTab !== 'today' && 'hidden sm:invisible sm:pointer-events-none sm:grid'
          )}
          id='forecast-period-today-panel'
          role='tabpanel'
        >
          <div className='flex min-w-0 flex-col'>
            <div className='flex min-h-0 flex-1 gap-2 overflow-x-auto pb-1'>
              {nextHours.map(index => (
                <HourlyForecastItem
                  isDay={isWeatherTimeDaytime(hourly.time[index], daily.sunrise, daily.sunset)}
                  key={hourly.time[index]}
                  label={formatWeatherHour(hourly.time[index], index === currentHourIndex)}
                  temperature={hourly.temperature_2m[index]}
                  unit={unit}
                  weatherCode={hourly.weather_code[index]}
                />
              ))}
            </div>

            <article className='weather-glass-muted mt-4 flex min-h-[4.5rem] items-center gap-3 rounded-md px-4 py-3'>
              <div className='min-w-0 flex-1'>
                <p className='text-sm font-medium'>Tomorrow</p>
                <p className='mt-1 truncate text-xs text-foreground-muted'>{getWeatherCondition(tomorrowCode)}</p>
              </div>
              <p className='text-3xl font-medium tracking-[-0.04em]'>
                {formatTemperature(daily.temperature_2m_max[tomorrowIndex], unit)}
              </p>
              <WeatherIcon
                code={tomorrowCode}
                isDay
                className='size-10 shrink-0 text-primary'
              />
            </article>
          </div>

          <aside className='weather-glass-muted rounded-md p-4'>
            <div>
              <p className='text-sm text-foreground-muted'>Sunrise</p>
              <p className='mt-1 text-2xl font-medium tracking-[-0.04em]'>{formatWeatherTime(daily.sunrise[0])}</p>
            </div>
            <div className='mt-5'>
              <p className='text-sm text-foreground-muted'>Sunset</p>
              <p className='mt-1 text-2xl font-medium tracking-[-0.04em]'>{formatWeatherTime(daily.sunset[0])}</p>
            </div>
            <div className='mt-5'>
              <p className='text-sm text-foreground-muted'>Day length</p>
              <p className='mt-1 text-xl font-medium tracking-[-0.03em]'>
                {formatDayLength(daily.daylight_duration[0])}
              </p>
            </div>
          </aside>
        </div>

        <div
          aria-hidden={activeTab !== 'week'}
          aria-labelledby='forecast-period-week-tab'
          className={cn(
            'flex min-w-0 max-w-full items-center gap-2 overflow-x-auto pb-3 sm:col-start-1 sm:row-start-1',
            activeTab !== 'week' && 'hidden sm:invisible sm:pointer-events-none sm:flex'
          )}
          id='forecast-period-week-panel'
          role='tabpanel'
        >
          {daily.time.map((day, index) => (
            <DailyForecastItem
              key={day}
              label={formatWeatherDay(day, index === 0)}
              maxTemperature={daily.temperature_2m_max[index]}
              minTemperature={daily.temperature_2m_min[index]}
              unit={unit}
              weatherCode={daily.weather_code[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
