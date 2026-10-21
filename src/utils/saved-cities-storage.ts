import { MAX_SAVED_CITIES, SAVED_CITIES_STORAGE_KEY } from '@/constants/city-storage';

import type { WeatherLocation } from '@/types/location';

import { isSameLocation, readStoredLocations, writeStoredLocations } from './location-storage';

export type SaveCityResult = 'saved' | 'already-saved' | 'limit-reached' | 'storage-error';

export function getSavedCities() {
  return readStoredLocations(SAVED_CITIES_STORAGE_KEY).slice(0, MAX_SAVED_CITIES);
}

export function saveCity(city: WeatherLocation) {
  const savedCities = getSavedCities();

  if (savedCities.some(savedCity => isSameLocation(savedCity, city))) {
    return { cities: savedCities, result: 'already-saved' as const };
  }

  if (savedCities.length >= MAX_SAVED_CITIES) {
    return { cities: savedCities, result: 'limit-reached' as const };
  }

  const nextSavedCities = [city, ...savedCities];
  const result: SaveCityResult = writeStoredLocations(SAVED_CITIES_STORAGE_KEY, nextSavedCities)
    ? 'saved'
    : 'storage-error';

  return { cities: result === 'saved' ? nextSavedCities : savedCities, result };
}

export function removeSavedCity(city: WeatherLocation) {
  const savedCities = getSavedCities();
  const nextSavedCities = savedCities.filter(savedCity => !isSameLocation(savedCity, city));

  return writeStoredLocations(SAVED_CITIES_STORAGE_KEY, nextSavedCities) ? nextSavedCities : savedCities;
}
