import { CloudRain, Droplets } from 'lucide-react';

import { HighlightCard } from './HighlightCard';

interface Props {
  humidity: number;
}

export function HumidityStatus({ humidity }: Props) {
  return (
    <HighlightCard title='Humidity'>
      <div className='mt-4 flex items-center justify-center text-primary'>
        <CloudRain
          aria-hidden='true'
          className='size-16 stroke-[1.25]'
        />
      </div>
      <div className='mt-3 flex items-center gap-2 justify-between text-sm'>
        <span className='flex items-center gap-1 font-medium'>
          <Droplets
            aria-hidden='true'
            className='size-4 text-primary'
          />
          {Math.round(humidity)}%
        </span>
        <span className='text-foreground-muted'>Relative humidity</span>
      </div>
    </HighlightCard>
  );
}
