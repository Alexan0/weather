import { getUvLevel } from '../utils/get-uv-level';

import { HighlightCard } from './HighlightCard';

interface Props {
  index: number;
}

export function UvIndexGauge({ index }: Props) {
  const percentage = Math.min(Math.round((index / 11) * 100), 100);
  const displayIndex = index > 11 ? '11+' : `${Math.round(index)}/11`;

  return (
    <HighlightCard title='UV index'>
      <div className='mx-auto mt-2 max-w-36'>
        <svg
          aria-hidden='true'
          className='h-auto w-full text-border'
          viewBox='0 0 160 96'
        >
          <path
            d='M 16 80 A 64 64 0 0 1 144 80'
            fill='none'
            pathLength='100'
            stroke='currentColor'
            strokeLinecap='round'
            strokeWidth='4'
          />
          <path
            d='M 16 80 A 64 64 0 0 1 144 80'
            fill='none'
            pathLength='100'
            stroke='var(--accent)'
            strokeDasharray={`${percentage} 100`}
            strokeLinecap='round'
            strokeWidth='4'
          />
        </svg>
      </div>
      <p className='-mt-6 text-center text-sm font-medium'>{displayIndex}</p>
      <p className='mt-1 text-center text-sm text-foreground-muted'>{getUvLevel(index)}</p>
    </HighlightCard>
  );
}
