'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

import { HighlightCard } from './HighlightCard';

interface Props {
  data: Array<{
    label: string;
    probability: number;
  }>;
}

export function RainChanceChart({ data }: Props) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <HighlightCard title='Chances of rain'>
      <p className='sr-only'>{data.map(item => `${item.label}: ${item.probability}%`).join(', ')}</p>
      <div className='weather-chart mt-14 h-20 w-full select-none'>
        <ResponsiveContainer
          height='100%'
          width='100%'
        >
          <BarChart
            accessibilityLayer={false}
            data={data}
            margin={{
              bottom: 14,
              left: 0,
              right: 0,
              top: 0
            }}
          >
            <XAxis
              axisLine={false}
              dataKey='label'
              tick={{
                fill: 'var(--foreground-muted)',
                fontSize: 10
              }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              hide
            />
            <Bar
              dataKey='probability'
              fill='var(--accent)'
              animationDuration={500}
              animationEasing='ease-out'
              isAnimationActive={!prefersReducedMotion}
              maxBarSize={8}
              minPointSize={4}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </HighlightCard>
  );
}
