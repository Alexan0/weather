export const TEMPERATURE_UNIT_OPTIONS = [
  { label: 'F', value: 'fahrenheit' },
  { label: 'C', value: 'celsius' }
] as const;

export type TemperatureUnit = (typeof TEMPERATURE_UNIT_OPTIONS)[number]['value'];
