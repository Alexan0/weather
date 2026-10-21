export const WEATHER_CODES: Record<string, readonly number[]> = {
  CLEAR_SKY: [0],
  PARTLY_CLOUDY: [1, 2],
  FOG: [45, 48],
  DRIZZLE: [51, 53, 55, 56, 57],
  RAIN: [61, 63, 65, 66, 67, 80, 81, 82],
  SNOW: [71, 73, 75, 77, 85, 86],
  THUNDERSTORM: [95, 96, 99],
  OVERCAST: [3]
} as const;
