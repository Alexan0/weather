'use client';

import { Palette } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Select } from '@/components/ui';

import { THEME_OPTIONS } from '@/constants/themes';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Select
      ariaLabel='Theme'
      icon={
        <Palette
          aria-hidden='true'
          className='size-5'
        />
      }
      options={THEME_OPTIONS}
      value={theme ?? 'system'}
      onValueChange={setTheme}
    />
  );
}
