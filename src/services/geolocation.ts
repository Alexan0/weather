import { DEFAULT_LOCATION } from '@/constants/default-location';

import { getSelectedCity } from '@/utils/selected-city-storage';

import type { WeatherLocation } from '@/types/location';

const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: false,
  maximumAge: 10 * 60 * 1000,
  timeout: 10 * 1000
};

export function getCurrentLocation(): Promise<WeatherLocation> {
  const selectedCity = getSelectedCity();

  if (selectedCity) {
    return Promise.resolve(selectedCity);
  }

  if (typeof navigator === 'undefined' || !navigator.geolocation) {
    return Promise.resolve(DEFAULT_LOCATION);
  }

  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          name: 'Current location',
          source: 'geolocation'
        });
      },
      () => resolve(DEFAULT_LOCATION),
      GEOLOCATION_OPTIONS
    );
  });
}
