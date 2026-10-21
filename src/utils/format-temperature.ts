import type { TemperatureUnit } from '@/constants/temperature-units';

export function formatTemperature(temperature: number, unit: TemperatureUnit = 'celsius') {
  const convertedTemperature = unit === 'fahrenheit' ? (temperature * 9) / 5 + 32 : temperature;

  return `${Math.round(convertedTemperature)}°`;
}
