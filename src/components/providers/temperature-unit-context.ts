import { createContext } from 'react';

import type { TemperatureUnit } from '@/constants/temperature-units';

export interface TemperatureUnitContextValue {
  setUnit: (unit: TemperatureUnit) => void;
  unit: TemperatureUnit;
}

export const TemperatureUnitContext = createContext<TemperatureUnitContextValue | null>(null);
