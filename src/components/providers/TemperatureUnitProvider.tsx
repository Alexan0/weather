'use client';

import type { ReactNode } from 'react';
import { useMemo, useSyncExternalStore } from 'react';

import type { TemperatureUnit } from '@/constants/temperature-units';

import { TemperatureUnitContext } from './temperature-unit-context';

interface Props {
  children: ReactNode;
}

const TEMPERATURE_UNIT_STORAGE_KEY = 'weather-temperature-unit';
const TEMPERATURE_UNIT_LISTENERS = new Set<() => void>();

function subscribeToTemperatureUnit(listener: () => void) {
  TEMPERATURE_UNIT_LISTENERS.add(listener);

  return () => TEMPERATURE_UNIT_LISTENERS.delete(listener);
}

function getStoredTemperatureUnit(): TemperatureUnit {
  try {
    const savedUnit = window.localStorage.getItem(TEMPERATURE_UNIT_STORAGE_KEY);

    return savedUnit === 'fahrenheit' ? 'fahrenheit' : 'celsius';
  } catch {
    return 'celsius';
  }
}

function getServerTemperatureUnit(): TemperatureUnit {
  return 'celsius';
}

export function TemperatureUnitProvider({ children }: Props) {
  const unit = useSyncExternalStore(subscribeToTemperatureUnit, getStoredTemperatureUnit, getServerTemperatureUnit);

  function updateUnit(nextUnit: TemperatureUnit) {
    try {
      window.localStorage.setItem(TEMPERATURE_UNIT_STORAGE_KEY, nextUnit);
    } catch {
      return;
    }

    TEMPERATURE_UNIT_LISTENERS.forEach(listener => listener());
  }

  const value = useMemo(() => ({ unit, setUnit: updateUnit }), [unit]);

  return <TemperatureUnitContext.Provider value={value}>{children}</TemperatureUnitContext.Provider>;
}
