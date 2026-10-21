'use client';

import { useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/query-keys';

import { saveRecentCity } from '@/utils/recent-cities-storage';
import { saveSelectedCity } from '@/utils/selected-city-storage';

import type { WeatherLocation } from '@/types/location';

export function useSelectCity() {
  const queryClient = useQueryClient();

  return (city: WeatherLocation) => {
    queryClient.setQueryData(QUERY_KEYS.currentLocation, city);
    saveSelectedCity(city);
    return saveRecentCity(city);
  };
}
