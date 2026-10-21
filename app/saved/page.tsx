import { Suspense } from 'react';

import { SavedCities } from '@/features/saved-cities/SavedCities';

export default function SavedCitiesPage() {
  return (
    <main className='mx-auto flex min-h-0 w-full max-w-[1440px] flex-1 flex-col px-5 pb-8 sm:px-8 xl:pb-0'>
      <Suspense fallback={null}>
        <SavedCities />
      </Suspense>
    </main>
  );
}
