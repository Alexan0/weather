import { MapPin, Trash2 } from 'lucide-react';

import { WeatherIcon } from '@/components/weather/WeatherIcon';

import { useTemperatureUnit } from '@/hooks/useTemperatureUnit';

import { formatTemperature } from '@/utils/format-temperature';
import { getWeatherCondition } from '@/utils/get-weather-condition';

import type { WeatherLocation } from '@/types/location';
import type { WeatherForecast } from '@/types/weather';

interface Props {
  city: WeatherLocation;
  forecast?: WeatherForecast;
  hasError: boolean;
  isLoading: boolean;
  onDelete: () => void;
  onOpen: () => void;
}

export function SavedCityCard({ city, forecast, hasError, isLoading, onDelete, onOpen }: Props) {
  const { unit } = useTemperatureUnit();
  return (
    <article className='weather-glass relative rounded-lg border border-border p-5'>
      <button
        aria-label={`Open weather for ${city.name}`}
        className='w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
        onClick={onOpen}
        type='button'
      >
        <div className='flex items-start justify-between gap-3'>
          <div>
            <p className='flex items-center gap-1.5 text-sm text-foreground-muted'>
              <MapPin
                aria-hidden='true'
                className='size-4'
              />
              {city.name}
            </p>
            {isLoading ? (
              <div className='mt-5 h-10 w-24 rounded bg-surface-muted motion-safe:animate-pulse' />
            ) : forecast ? (
              <p className='mt-3 text-4xl font-medium tracking-[-0.05em]'>
                {formatTemperature(forecast.current.temperature_2m, unit)}
              </p>
            ) : hasError ? (
              <p className='mt-4 text-sm text-foreground-muted'>Weather unavailable</p>
            ) : null}
          </div>
          {forecast ? (
            <WeatherIcon
              code={forecast.current.weather_code}
              isDay={Boolean(forecast.current.is_day)}
              className='mr-10 mt-6 size-12 text-primary'
            />
          ) : null}
        </div>
        {forecast ? (
          <div className='mt-4 flex justify-between border-t border-border pt-3 text-xs text-foreground-muted'>
            <span>{getWeatherCondition(forecast.current.weather_code)}</span>
            <span>
              H {formatTemperature(forecast.daily.temperature_2m_max[0], unit)} / L{' '}
              {formatTemperature(forecast.daily.temperature_2m_min[0], unit)}
            </span>
          </div>
        ) : null}
      </button>
      <button
        aria-label={`Remove ${city.name} from saved cities`}
        className='absolute right-5 top-5 flex size-10 cursor-pointer items-center justify-center rounded-full border border-primary/30 bg-primary-foreground text-primary shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
        onClick={onDelete}
        type='button'
      >
        <Trash2
          aria-hidden='true'
          className='size-5'
        />
      </button>
    </article>
  );
}
