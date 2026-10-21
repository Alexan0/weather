'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/query-keys';

import { getSavedCities, removeSavedCity, saveCity } from '@/utils/saved-cities-storage';

import type { WeatherLocation } from '@/types/location';

export function useSavedCities() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: QUERY_KEYS.savedCities,
    queryFn: getSavedCities,
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY
  });

  function addCity(city: WeatherLocation) {
    const result = saveCity(city);
    queryClient.setQueryData(QUERY_KEYS.savedCities, result.cities);
    return result.result;
  }

  function deleteCity(city: WeatherLocation) {
    const cities = removeSavedCity(city);
    queryClient.setQueryData(QUERY_KEYS.savedCities, cities);
  }

  return { ...query, cities: query.data ?? [], addCity, deleteCity };
}
