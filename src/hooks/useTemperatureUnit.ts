'use client';

import { useContext } from 'react';

import { TemperatureUnitContext } from '@/components/providers/temperature-unit-context';

export function useTemperatureUnit() {
  const context = useContext(TemperatureUnitContext);

  if (!context) {
    throw new Error('useTemperatureUnit must be used inside TemperatureUnitProvider');
  }

  return context;
}
