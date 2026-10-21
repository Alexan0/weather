'use client';

import { useContext } from 'react';

import { SavedCityFilterContext } from '@/components/providers/SavedCityFilterProvider';

export function useSavedCityFilter() {
  const context = useContext(SavedCityFilterContext);

  if (!context) {
    throw new Error('useSavedCityFilter must be used inside SavedCityFilterProvider');
  }

  return context;
}
