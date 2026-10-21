import { cn } from '@/lib/cn';

interface Props {
  className?: string;
}

export function SkeletonBlock({ className }: Props) {
  return (
    <div className={cn('skeleton-block rounded-lg border border-border bg-surface p-5 sm:p-6', className)}>
      <div className='h-5 w-40 rounded-full bg-surface-muted' />
      <div className='mt-8 h-12 w-32 rounded-lg bg-surface-muted' />
      <div className='mt-4 h-4 w-24 rounded-full bg-surface-muted' />
      <div className='mt-8 h-px w-full bg-border' />
      <div className='mt-5 flex gap-3'>
        <div className='h-10 flex-1 rounded-md bg-surface-muted' />
        <div className='h-10 flex-1 rounded-md bg-surface-muted' />
        <div className='h-10 flex-1 rounded-md bg-surface-muted' />
      </div>
    </div>
  );
}
