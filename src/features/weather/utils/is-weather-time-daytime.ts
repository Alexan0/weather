export function isWeatherTimeDaytime(time: string, sunriseTimes: string[], sunsetTimes: string[]) {
  const day = time.slice(0, 10);
  const dayIndex = sunriseTimes.findIndex(sunrise => sunrise.startsWith(day));

  if (dayIndex === -1 || !sunsetTimes[dayIndex]) return true;

  return time >= sunriseTimes[dayIndex] && time < sunsetTimes[dayIndex];
}
