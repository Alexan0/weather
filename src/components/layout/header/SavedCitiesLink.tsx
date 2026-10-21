'use client';

import { Bookmark } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { APP_PAGES } from '@/config/pages';

import { isPageActive } from '@/utils/is-page-active';

import { cn } from '@/lib/cn';

export function SavedCitiesLink() {
  const pathname = usePathname();
  const isActive = isPageActive(pathname, APP_PAGES.SAVED.path);

  return (
    <Link
      aria-label='Saved cities'
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'flex h-12 items-center justify-center gap-2 rounded-full bg-surface px-4 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        isActive && 'bg-primary text-primary-foreground shadow-md hover:bg-primary'
      )}
      href={APP_PAGES.SAVED.path}
    >
      <Bookmark
        aria-hidden='true'
        className={cn('size-5 text-foreground-muted', isActive && 'fill-current text-primary-foreground')}
      />
      <span className='hidden lg:inline'>Saved cities</span>
    </Link>
  );
}
