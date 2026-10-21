export function getCurrentHourIndex(times: string[], currentTime: string) {
  if (times.length === 0) return 0;

  const nextIndex = times.findIndex(time => time > currentTime);

  if (nextIndex === -1) return times.length - 1;

  return Math.max(0, nextIndex - 1);
}
