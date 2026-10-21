import { SearchIcon } from 'lucide-react';
import type { ComponentProps } from 'react';

import { cn } from '@/lib/cn';

interface Props extends Omit<ComponentProps<'input'>, 'type'> {
  containerClassName?: string;
}

export function Search({ className, containerClassName, ...props }: Props) {
  return (
    <label
      className={cn(
        'flex h-12 w-full items-center gap-3 rounded-full border border-transparent bg-surface px-5 text-foreground shadow-sm transition-colors focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/30',
        containerClassName
      )}
    >
      <SearchIcon
        aria-hidden='true'
        className='size-5 shrink-0 text-foreground-muted'
        strokeWidth={2}
      />
      <input
        type='search'
        className={cn(
          'min-w-0 flex-1 bg-transparent text-sm font-normal outline-none placeholder:text-foreground-muted [&::-webkit-search-cancel-button]:hidden',
          className
        )}
        {...props}
      />
    </label>
  );
}
