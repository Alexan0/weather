import type { WeatherLocation } from '@/types/location';

export const QUERY_KEYS = {
  citySearch: (query: string) => ['city-search', query] as const,
  currentLocation: ['current-location'] as const,
  savedCities: ['saved-cities'] as const,
  weather: (location?: WeatherLocation) => ['weather', location?.latitude, location?.longitude] as const
};
