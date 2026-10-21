'use client';

import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/query-keys';

import { getCurrentLocation } from '@/services/geolocation';

export function useCurrentLocation() {
  return useQuery({
    queryKey: QUERY_KEYS.currentLocation,
    queryFn: getCurrentLocation,
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
    retry: false
  });
}
