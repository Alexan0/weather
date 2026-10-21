import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface Props {
  children: ReactNode;
  className?: string;
  title: string;
}

export function HighlightCard({ children, className, title }: Props) {
  return (
    <article
      className={cn(
        'weather-card weather-glass-muted flex h-full min-h-40 flex-col items-center justify-center rounded-md p-4 text-center',
        className
      )}
    >
      <h3 className='w-full text-sm font-medium'>{title}</h3>
      {children}
    </article>
  );
}
