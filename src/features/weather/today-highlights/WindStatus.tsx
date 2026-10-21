import { Wind } from 'lucide-react';

import { cn } from '@/lib/cn';

import { HighlightCard } from './HighlightCard';

interface Props {
  direction: number;
  speed: number;
}

export function WindStatus({ direction, speed }: Props) {
  const activeBars = Math.min(12, Math.max(2, Math.round(speed / 4)));

  return (
    <HighlightCard title='Wind status'>
      <div className='mt-5 flex items-end justify-center gap-1.5'>
        {Array.from({ length: 12 }, (_, index) => (
          <span
            key={index}
            className={cn('w-1 rounded-full', index < activeBars ? 'bg-accent' : 'bg-border')}
            style={{ height: `${18 + Math.abs(6 - index) * 4}px` }}
          />
        ))}
      </div>
      <div className='mt-4 flex items-center gap-2 justify-between text-sm'>
        <span className='font-medium'>{Math.round(speed)} km/h</span>
        <span className='flex items-center gap-1 text-foreground-muted'>
          <Wind
            aria-hidden='true'
            className='size-4'
            style={{ transform: `rotate(${direction}deg)` }}
          />
          {Math.round(direction)}°
        </span>
      </div>
    </HighlightCard>
  );
}
