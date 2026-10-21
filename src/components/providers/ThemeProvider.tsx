'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

import { THEME_CLASS_NAMES, THEME_NAMES } from '@/constants/themes';

interface Props {
  children: ReactNode;
}

export function ThemeProvider({ children }: Props) {
  return (
    <NextThemeProvider
      attribute='class'
      defaultTheme='system'
      disableTransitionOnChange
      enableSystem
      storageKey='weather-theme'
      themes={[...THEME_NAMES]}
      value={THEME_CLASS_NAMES}
    >
      {children}
    </NextThemeProvider>
  );
}
