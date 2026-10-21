import { geocodingResponseSchema } from '@/schemas/geocoding-schema';

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export async function searchCities(query: string, signal?: AbortSignal) {
  const url = new URL(GEOCODING_URL);

  url.searchParams.set('name', query.trim());
  url.searchParams.set('count', '8');
  url.searchParams.set('language', 'en');
  url.searchParams.set('format', 'json');

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Open-Meteo geocoding request failed with status ${response.status}`);
  }

  return geocodingResponseSchema.parse(await response.json()).results;
}
