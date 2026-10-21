export const THEME_NAMES = ['light', 'dark', 'green', 'blue', 'purple', 'red', 'orange'] as const;

export const THEME_CLASS_NAMES = {
  light: 'theme-light',
  dark: 'theme-dark',
  green: 'theme-green',
  blue: 'theme-blue',
  purple: 'theme-purple',
  red: 'theme-red',
  orange: 'theme-orange'
} as const;

export const THEME_OPTIONS = [
  { label: 'System', value: 'system' },
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'Green', value: 'green' },
  { label: 'Blue', value: 'blue' },
  { label: 'Purple', value: 'purple' },
  { label: 'Red', value: 'red' },
  { label: 'Orange', value: 'orange' }
] as const;
