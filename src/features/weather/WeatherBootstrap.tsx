'use client';

import { SkeletonLoader } from '@/components/ui';

import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import { useWeather } from '@/hooks/useWeather';

import { CurrentWeather } from './current-weather/CurrentWeather';
import { TodayHighlights } from './today-highlights/TodayHighlights';
import { TodayWeek } from './today-week';

export function WeatherBootstrap() {
  const locationQuery = useCurrentLocation();
  const weatherQuery = useWeather(locationQuery.data);

  let status = 'Requesting your location';

  if (locationQuery.isSuccess && weatherQuery.isPending) {
    status = `Loading weather for ${locationQuery.data.name}`;
  }

  if (weatherQuery.isSuccess) {
    status = `Weather loaded for ${locationQuery.data?.name ?? 'your location'}`;
  }

  if (locationQuery.isError || weatherQuery.isError) {
    status = 'Weather data is temporarily unavailable';
  }

  if (locationQuery.isSuccess && weatherQuery.isSuccess) {
    return (
      <div className='weather-dashboard grid w-full max-w-full gap-6 xl:flex-1 xl:min-h-0 xl:grid-cols-[minmax(0,38rem)_minmax(0,1fr)]'>
        <div className='flex min-w-0 flex-col gap-6 xl:min-h-0'>
          <CurrentWeather
            key={`${locationQuery.data.latitude}-${locationQuery.data.longitude}`}
            location={locationQuery.data}
            weather={weatherQuery.data}
          />
          <TodayWeek weather={weatherQuery.data} />
        </div>
        <TodayHighlights weather={weatherQuery.data} />
      </div>
    );
  }

  if (!locationQuery.isError && !weatherQuery.isError) {
    return <SkeletonLoader />;
  }

  return (
    <section
      aria-live='polite'
      aria-labelledby='current-weather-status'
      className='flex min-h-[20.5rem] items-center justify-center rounded-lg border border-border bg-surface p-6 text-center'
      role='status'
    >
      <div>
        <p
          id='current-weather-status'
          className='text-lg font-medium'
        >
          {status}
        </p>
        {locationQuery.isError || weatherQuery.isError ? (
          <p className='mt-2 text-sm text-foreground-muted'>Please try again in a moment.</p>
        ) : null}
      </div>
    </section>
  );
}
