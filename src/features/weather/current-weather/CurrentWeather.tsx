'use client';

import { Check, MapPin, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { SegmentedControl } from '@/components/ui';
import { WeatherIcon } from '@/components/weather/WeatherIcon';

import { useSavedCities } from '@/hooks/useSavedCities';
import { useTemperatureUnit } from '@/hooks/useTemperatureUnit';

import { TEMPERATURE_UNIT_OPTIONS } from '@/constants/temperature-units';

import { formatTemperature } from '@/utils/format-temperature';
import { getWeatherCondition } from '@/utils/get-weather-condition';

import type { WeatherLocation } from '@/types/location';
import type { WeatherForecast } from '@/types/weather';

interface Props {
  location: WeatherLocation;
  weather: WeatherForecast;
}

export function CurrentWeather({ location, weather }: Props) {
  const { cities, addCity, deleteCity } = useSavedCities();
  const { unit, setUnit } = useTemperatureUnit();
  const [saveMessage, setSaveMessage] = useState('');
  const isSaved = cities.some(city => city.latitude === location.latitude && city.longitude === location.longitude);
  const { current, daily } = weather;
  const condition = getWeatherCondition(current.weather_code);
  const high = daily.temperature_2m_max[0];
  const low = daily.temperature_2m_min[0];

  function addCurrentCity() {
    const result = addCity(location);

    if (result === 'limit-reached') setSaveMessage('You can save up to 20 cities.');
    else if (result === 'storage-error') setSaveMessage('Unable to save this city.');
    else setSaveMessage('');
  }

  return (
    <section
      aria-labelledby='current-weather-heading'
      className='weather-glass relative min-h-[20.5rem] overflow-hidden rounded-lg border border-border p-5 shadow-[0_16px_40px_-32px_color-mix(in_srgb,var(--foreground)_55%,transparent)] sm:p-7 xl:flex-1'
    >
      <div className='absolute -right-16 -top-20 size-56 rounded-full bg-accent/20' />
      <div className='absolute -bottom-28 -left-16 size-64 rounded-full bg-primary/10' />

      <div className='relative flex h-full min-h-[17rem] flex-col justify-between gap-7'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <div className='flex w-fit max-w-[14rem] items-center gap-2 rounded-full bg-primary-foreground px-3 py-2 text-sm font-medium text-primary'>
              <MapPin
                aria-hidden='true'
                className='size-4 shrink-0'
              />
              <span className='truncate'>{location.name}</span>
              {isSaved ? (
                <button
                  aria-label={`Remove ${location.name} from saved cities`}
                  className='group flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
                  onClick={() => {
                    deleteCity(location);
                    setSaveMessage('');
                  }}
                  type='button'
                >
                  <Check
                    aria-hidden='true'
                    className='size-4 group-hover:hidden'
                  />
                  <Trash2
                    aria-hidden='true'
                    className='hidden size-4 group-hover:block'
                  />
                </button>
              ) : (
                <button
                  aria-label={`Save ${location.name}`}
                  className='flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
                  onClick={addCurrentCity}
                  type='button'
                >
                  <Plus
                    aria-hidden='true'
                    className='size-4'
                  />
                </button>
              )}
            </div>
            {saveMessage ? (
              <p
                aria-live='polite'
                className='mt-2 text-xs text-foreground-muted'
              >
                {saveMessage}
              </p>
            ) : null}
            <h2
              id='current-weather-heading'
              className='mt-5 text-2xl font-medium tracking-tight'
            >
              Weather
            </h2>
            <p className='mt-1 text-sm text-foreground-muted'>Now</p>
          </div>

          <SegmentedControl
            ariaLabel='Temperature unit'
            className='bg-primary-foreground text-primary'
            compact
            onValueChange={setUnit}
            options={TEMPERATURE_UNIT_OPTIONS}
            value={unit}
          />
        </div>

        <div className='flex items-end justify-between gap-4'>
          <div>
            <p className='text-6xl font-medium leading-none tracking-[-0.06em] sm:text-7xl'>
              {formatTemperature(current.temperature_2m, unit)}
            </p>
            <p className='mt-3 text-sm text-foreground-muted'>
              Feels like {formatTemperature(current.apparent_temperature, unit)}
            </p>
          </div>

          <div className='flex flex-col items-center gap-2 text-primary'>
            <WeatherIcon
              code={current.weather_code}
              isDay={Boolean(current.is_day)}
              className='size-24 sm:size-28'
            />
            <p className='text-sm font-medium text-foreground'>{condition}</p>
          </div>
        </div>

        <div className='flex justify-end gap-5 border-t border-border pt-4 text-sm text-foreground-muted'>
          <p>
            High <span className='font-semibold text-foreground'>{formatTemperature(high, unit)}</span>
          </p>
          <p>
            Low <span className='font-semibold text-foreground'>{formatTemperature(low, unit)}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
