import { SkeletonBlock } from './SkeletonBlock';

export function SkeletonLoader() {
  return (
    <div
      aria-label='Loading weather forecast'
      className='grid w-full gap-6 xl:flex-1 xl:grid-cols-[minmax(0,38rem)_minmax(0,1fr)]'
      role='status'
    >
      <div className='grid gap-6 xl:grid-rows-2'>
        <SkeletonBlock className='min-h-[20.5rem]' />
        <SkeletonBlock className='min-h-[20rem]' />
      </div>
      <SkeletonBlock className='min-h-[41rem]' />
    </div>
  );
}
