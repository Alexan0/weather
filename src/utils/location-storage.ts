import type { WeatherLocation } from '@/types/location';

import { weatherLocationSchema } from '@/schemas/location-schema';

const WEATHER_LOCATIONS_SCHEMA = weatherLocationSchema.array();

export function readStoredLocation(key: string) {
  if (typeof window === 'undefined') return null;

  try {
    const value = window.localStorage.getItem(key);
    if (!value) return null;

    const result = weatherLocationSchema.safeParse(JSON.parse(value));
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

export function readStoredLocations(key: string) {
  if (typeof window === 'undefined') return [];

  try {
    const value = window.localStorage.getItem(key);
    if (!value) return [];

    const result = WEATHER_LOCATIONS_SCHEMA.safeParse(JSON.parse(value));
    return result.success ? result.data : [];
  } catch {
    return [];
  }
}

export function writeStoredLocation(key: string, location: WeatherLocation) {
  if (typeof window === 'undefined') return false;

  try {
    window.localStorage.setItem(key, JSON.stringify(location));
    return true;
  } catch {
    return false;
  }
}

export function writeStoredLocations(key: string, locations: WeatherLocation[]) {
  if (typeof window === 'undefined') return false;

  try {
    window.localStorage.setItem(key, JSON.stringify(locations));
    return true;
  } catch {
    return false;
  }
}

export function isSameLocation(first: WeatherLocation, second: WeatherLocation) {
  return first.latitude === second.latitude && first.longitude === second.longitude;
}
