import { Cloud } from 'lucide-react';
import Link from 'next/link';

import { APP_PAGES } from '@/config/pages';

import { cn } from '@/lib/cn';

interface Props {
  className?: string;
}

export function HeaderLogo({ className }: Props) {
  return (
    <Link
      aria-label='Weather home'
      className={cn('flex items-center gap-2 text-lg font-semibold leading-none', className)}
      href={APP_PAGES.HOME.path}
    >
      <span className='flex size-10 items-center justify-center rounded-full bg-surface text-accent shadow-sm'>
        <Cloud
          aria-hidden='true'
          className='size-6'
        />
      </span>
      Weather
    </Link>
  );
}
