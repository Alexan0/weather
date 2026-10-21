'use client';

import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/query-keys';

import { searchCities } from '@/services/geocoding-client';

import { useDebouncedValue } from './useDebouncedValue';

export function useCitySearch(query: string) {
  const normalizedQuery = useDebouncedValue(query.trim(), 300);

  return useQuery({
    queryKey: QUERY_KEYS.citySearch(normalizedQuery),
    queryFn: ({ signal }) => searchCities(normalizedQuery, signal),
    enabled: normalizedQuery.length >= 2,
    staleTime: 5 * 60 * 1000,
    retry: false
  });
}
