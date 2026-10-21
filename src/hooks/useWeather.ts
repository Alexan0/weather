'use client';

import { useQuery } from '@tanstack/react-query';

import { getWeatherQueryOptions } from '@/config/weather-query-options';

import type { WeatherLocation } from '@/types/location';

export function useWeather(location?: WeatherLocation) {
  return useQuery(getWeatherQueryOptions(location));
}
