export function formatWeatherDay(value: string, isToday: boolean) {
  if (isToday) {
    return 'Today';
  }

  return new Intl.DateTimeFormat('en', {
    weekday: 'short',
    timeZone: 'UTC'
  }).format(new Date(`${value}T00:00:00Z`));
}
