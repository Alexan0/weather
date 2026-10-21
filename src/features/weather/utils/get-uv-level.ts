export function getUvLevel(index: number) {
  if (index <= 2) {
    return 'Low';
  }

  if (index <= 5) {
    return 'Moderate';
  }

  if (index <= 7) {
    return 'High';
  }

  if (index <= 10) {
    return 'Very high';
  }

  return 'Extreme';
}
