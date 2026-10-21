'use client';

import { useQueries } from '@tanstack/react-query';
import { Bookmark } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useSavedCities } from '@/hooks/useSavedCities';
import { useSavedCityFilter } from '@/hooks/useSavedCityFilter';
import { useSelectCity } from '@/hooks/useSelectCity';

import { APP_PAGES } from '@/config/pages';
import { getWeatherQueryOptions } from '@/config/weather-query-options';

import type { WeatherLocation } from '@/types/location';

import { SavedCityCard } from './SavedCityCard';

export function SavedCities() {
  const router = useRouter();
  const { cities, isPending, deleteCity } = useSavedCities();
  const selectCity = useSelectCity();
  const { filter } = useSavedCityFilter();
  const searchQuery = filter.trim().toLowerCase();
  const filteredCities = cities.filter(city => city.name.toLowerCase().includes(searchQuery));

  const weatherQueries = useQueries({
    queries: filteredCities.map(city => getWeatherQueryOptions(city))
  });

  function openCity(city: WeatherLocation) {
    selectCity(city);
    router.push(APP_PAGES.HOME.path);
  }

  if (isPending) {
    return (
      <section
        aria-label='Loading saved cities'
        className='weather-glass min-h-80 rounded-lg border border-border motion-safe:animate-pulse'
        role='status'
      />
    );
  }

  if (cities.length === 0) {
    return (
      <section className='weather-glass flex min-h-80 flex-1 flex-col items-center justify-center rounded-lg border border-border px-6 text-center'>
        <Bookmark
          aria-hidden='true'
          className='mb-4 size-10 text-foreground-muted'
        />
        <h1 className='text-2xl font-semibold'>Saved cities</h1>
        <p className='mt-2 max-w-md text-sm text-foreground-muted'>
          You have no saved cities yet. Add a city from the weather card to see it here.
        </p>
      </section>
    );
  }

  if (filteredCities.length === 0) {
    return (
      <section aria-labelledby='saved-cities-heading'>
        <h1
          id='saved-cities-heading'
          className='text-2xl font-semibold tracking-tight'
        >
          Saved cities
        </h1>
        <p className='mt-4 text-sm text-foreground-muted'>No saved cities match &quot;{filter.trim()}&quot;.</p>
      </section>
    );
  }

  return (
    <section aria-labelledby='saved-cities-heading'>
      <div className='mb-5 flex items-center justify-between'>
        <h1
          id='saved-cities-heading'
          className='text-2xl font-semibold tracking-tight'
        >
          Saved cities
        </h1>
        <span className='text-sm text-foreground-muted'>
          {filteredCities.length} of {cities.length} cities
        </span>
      </div>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {filteredCities.map((city, index) => (
          <SavedCityCard
            city={city}
            forecast={weatherQueries[index]?.data}
            hasError={weatherQueries[index]?.isError ?? false}
            isLoading={weatherQueries[index]?.isPending ?? true}
            key={`${city.latitude}-${city.longitude}`}
            onDelete={() => deleteCity(city)}
            onOpen={() => openCity(city)}
          />
        ))}
      </div>
    </section>
  );
}
