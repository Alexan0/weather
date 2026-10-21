import { MAX_RECENT_CITIES, RECENT_CITIES_STORAGE_KEY } from '@/constants/city-storage';

import type { WeatherLocation } from '@/types/location';

import { isSameLocation, readStoredLocations, writeStoredLocations } from './location-storage';

export function getRecentCities() {
  return readStoredLocations(RECENT_CITIES_STORAGE_KEY);
}

export function saveRecentCity(city: WeatherLocation) {
  const recentCities = getRecentCities().filter(recentCity => !isSameLocation(recentCity, city));
  const nextRecentCities = [city, ...recentCities].slice(0, MAX_RECENT_CITIES);

  return writeStoredLocations(RECENT_CITIES_STORAGE_KEY, nextRecentCities) ? nextRecentCities : recentCities;
}
