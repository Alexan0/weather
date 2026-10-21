'use client';

import { usePathname } from 'next/navigation';
import { type FocusEvent, useState } from 'react';

import { Search } from '@/components/ui';

import { useCitySearch } from '@/hooks/useCitySearch';
import { useSavedCityFilter } from '@/hooks/useSavedCityFilter';
import { useSelectCity } from '@/hooks/useSelectCity';

import { APP_PAGES } from '@/config/pages';

import { isPageActive } from '@/utils/is-page-active';
import { getRecentCities } from '@/utils/recent-cities-storage';

import type { GeocodingResult } from '@/types/geocoding';
import type { WeatherLocation } from '@/types/location';

export function SearchInput() {
  const pathname = usePathname();
  const isSavedPage = isPageActive(pathname, APP_PAGES.SAVED.path);
  const applySelectedCity = useSelectCity();
  const { setFilter } = useSavedCityFilter();
  const [searchState, setSearchState] = useState({ pathname, query: '' });
  const [openPathname, setOpenPathname] = useState<string | null>(null);
  const [recentCities, setRecentCities] = useState<WeatherLocation[]>([]);

  if (searchState.pathname !== pathname) {
    setSearchState({ pathname, query: '' });
    setOpenPathname(null);
  }

  const query = searchState.pathname === pathname ? searchState.query : '';
  const isOpen = openPathname === pathname;
  const searchQuery = useCitySearch(isSavedPage ? '' : query);

  function setQuery(query: string) {
    setSearchState({ pathname, query });
  }

  function setIsOpen(isOpen: boolean) {
    setOpenPathname(isOpen ? pathname : null);
  }

  function selectLocation(location: WeatherLocation) {
    setRecentCities(applySelectedCity(location));
    setQuery(location.name);
    setIsOpen(false);
  }

  function selectCity(city: GeocodingResult) {
    selectLocation({
      latitude: city.latitude,
      longitude: city.longitude,
      name: city.name,
      source: 'search'
    });
  }

  function openSearch() {
    if (isSavedPage) {
      setIsOpen(false);
      return;
    }

    const storedCities = getRecentCities();

    setRecentCities(storedCities);
    setIsOpen(query.trim().length >= 2 || storedCities.length > 0);
  }

  function closeWhenFocusLeaves(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  }

  return (
    <div
      className='relative w-full'
      onBlur={closeWhenFocusLeaves}
      onKeyDown={event => {
        if (event.key === 'Escape') setIsOpen(false);
      }}
    >
      <form
        className='w-full'
        onSubmit={event => event.preventDefault()}
        role='search'
      >
        <Search
          aria-label='Search city'
          autoComplete='off'
          name='city'
          onChange={event => {
            const nextQuery = event.target.value;

            setQuery(nextQuery);

            if (isSavedPage) {
              setFilter(nextQuery);
              setIsOpen(false);
              return;
            }

            setIsOpen(true);
          }}
          onFocus={openSearch}
          placeholder='Search City'
          value={query}
        />
      </form>

      {!isSavedPage && isOpen && (query.trim().length >= 2 || recentCities.length > 0) ? (
        <div className='absolute inset-x-0 top-[calc(100%+0.5rem)] z-20 overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-xl'>
          {query.trim().length < 2 && recentCities.length > 0 ? (
            <>
              <p className='px-3 py-2 text-xs font-medium uppercase tracking-wide text-foreground-muted'>
                Recent cities
              </p>
              <ul aria-label='Recent cities'>
                {recentCities.map(city => (
                  <li key={`${city.latitude}-${city.longitude}`}>
                    <button
                      className='flex w-full items-start rounded-xl px-3 py-2 text-left transition-colors hover:bg-surface-muted'
                      onClick={() => selectLocation(city)}
                      type='button'
                    >
                      <span>
                        <span className='block text-sm font-medium'>{city.name}</span>
                        <span className='mt-0.5 block text-xs text-foreground-muted'>Recent city</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {searchQuery.isPending ? <p className='px-3 py-3 text-sm text-foreground-muted'>Searching...</p> : null}
          {searchQuery.isError ? (
            <p className='px-3 py-3 text-sm text-foreground-muted'>Unable to search cities.</p>
          ) : null}
          {searchQuery.isSuccess && searchQuery.data.length === 0 ? (
            <p className='px-3 py-3 text-sm text-foreground-muted'>No cities found.</p>
          ) : null}
          {searchQuery.isSuccess && searchQuery.data.length > 0 ? (
            <ul aria-label='City search results'>
              {searchQuery.data.map(city => (
                <li key={city.id}>
                  <button
                    className='flex w-full items-start rounded-xl px-3 py-2 text-left transition-colors hover:bg-surface-muted'
                    onClick={() => selectCity(city)}
                    type='button'
                  >
                    <span>
                      <span className='block text-sm font-medium'>{city.name}</span>
                      <span className='mt-0.5 block text-xs text-foreground-muted'>
                        {[city.admin1, city.country].filter(Boolean).join(', ')}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
