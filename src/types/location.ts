export interface WeatherLocation {
  latitude: number;
  longitude: number;
  name: string;
  source: 'fallback' | 'geolocation' | 'search';
}
