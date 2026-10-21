import { queryOptions } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/query-keys';

import type { WeatherLocation } from '@/types/location';

import { fetchWeather } from '@/services/weather-client';

export const WEATHER_STALE_TIME_MS = 15 * 60 * 1000;

export function getWeatherQueryOptions(location?: WeatherLocation) {
  return queryOptions({
    queryKey: QUERY_KEYS.weather(location),
    queryFn: ({ signal }) => {
      if (!location) {
        throw new Error('Location is required');
      }

      return fetchWeather(location, signal);
    },
    enabled: Boolean(location),
    staleTime: WEATHER_STALE_TIME_MS,
    refetchOnWindowFocus: false
  });
}
