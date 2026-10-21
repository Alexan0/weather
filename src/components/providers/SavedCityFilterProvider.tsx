'use client';

import { usePathname } from 'next/navigation';
import { createContext, type ReactNode, useCallback, useMemo, useState } from 'react';

interface Props {
  children: ReactNode;
}

interface SavedCityFilterContextValue {
  filter: string;
  setFilter: (value: string) => void;
}

export const SavedCityFilterContext = createContext<SavedCityFilterContextValue | null>(null);

export function SavedCityFilterProvider({ children }: Props) {
  const pathname = usePathname();
  const [filterState, setFilterState] = useState({ pathname, value: '' });

  if (filterState.pathname !== pathname) {
    setFilterState({ pathname, value: '' });
  }

  const filter = filterState.pathname === pathname ? filterState.value : '';

  const setFilter = useCallback((value: string) => setFilterState({ pathname, value }), [pathname]);

  const value = useMemo(() => ({ filter, setFilter }), [filter, setFilter]);

  return <SavedCityFilterContext value={value}>{children}</SavedCityFilterContext>;
}
