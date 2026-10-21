export function formatWeatherTime(value: string) {
  const [hours, minutes] = value.slice(-5).split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;

  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export function formatWeatherHour(value: string, isNow: boolean) {
  if (isNow) {
    return 'Now';
  }

  const [hours] = value.slice(-5).split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;

  return `${formattedHours} ${period}`;
}

export function formatWeatherChartHour(value: string) {
  const [hours] = value.slice(-5).split(':').map(Number);

  return `${hours % 12 || 12}${hours >= 12 ? 'p' : 'a'}`;
}

export function formatDayLength(seconds: number) {
  const totalMinutes = Math.round(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours} hr ${minutes} min`;
}
