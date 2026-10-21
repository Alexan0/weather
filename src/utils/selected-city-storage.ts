import { SELECTED_CITY_STORAGE_KEY } from '@/constants/city-storage';

import type { WeatherLocation } from '@/types/location';

import { readStoredLocation, writeStoredLocation } from './location-storage';

export function getSelectedCity() {
  return readStoredLocation(SELECTED_CITY_STORAGE_KEY);
}

export function saveSelectedCity(city: WeatherLocation) {
  return writeStoredLocation(SELECTED_CITY_STORAGE_KEY, city);
}
