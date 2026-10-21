import { Suspense } from 'react';

import { HeaderLogo } from './HeaderLogo';
import { SavedCitiesLink } from './SavedCitiesLink';
import { SearchInput } from './SearchInput';
import { ThemeSwitcher } from './ThemeSwitcher';

export function Header() {
  return (
    <header className='mx-auto w-full max-w-[1440px] px-5 py-4 sm:px-8 lg:py-4'>
      <div className='grid w-full grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[minmax(20rem,40rem)_auto] md:justify-between'>
        <HeaderLogo className='col-start-1 row-start-1 md:hidden' />

        <div className='col-span-2 row-start-2 flex min-w-0 items-center gap-4 md:col-span-1 md:col-start-1 md:row-start-1'>
          <HeaderLogo className='hidden shrink-0 md:flex' />
          <Suspense fallback={null}>
            <div className='min-w-0 flex-1'>
              <SearchInput />
            </div>
          </Suspense>
        </div>

        <nav
          aria-label='Primary navigation'
          className='col-start-2 row-start-1 flex items-center gap-2 justify-self-end'
        >
          <ThemeSwitcher />
          <SavedCitiesLink />
        </nav>
      </div>
    </header>
  );
}
