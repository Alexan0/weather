import type { KeyboardEvent } from 'react';

import { cn } from '@/lib/cn';

interface Option<T extends string> {
  label: string;
  value: T;
}

interface Props<T extends string> {
  ariaLabel: string;
  className?: string;
  compact?: boolean;
  onValueChange: (value: T) => void;
  options: readonly Option<T>[];
  value: T;
}

export function SegmentedControl<T extends string>({
  ariaLabel,
  className,
  compact = false,
  onValueChange,
  options,
  value
}: Props<T>) {
  function selectAdjacentOption(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

    event.preventDefault();
    let nextIndex = index;

    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + options.length) % options.length;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % options.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = options.length - 1;

    onValueChange(options[nextIndex].value);
    event.currentTarget.parentElement?.querySelectorAll('button')[nextIndex]?.focus();
  }

  return (
    <div
      aria-label={ariaLabel}
      className={cn('inline-flex rounded-full bg-surface-muted p-1', className)}
      role='group'
    >
      {options.map((option, index) => {
        const isActive = option.value === value;

        return (
          <button
            aria-pressed={isActive}
            className={cn(
              'cursor-pointer rounded-full text-sm font-medium text-foreground-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              compact ? 'min-w-10 px-3 py-1.5' : 'min-w-20 px-4 py-2',
              isActive && 'bg-primary text-primary-foreground shadow-sm'
            )}
            key={option.value}
            onClick={() => onValueChange(option.value)}
            onKeyDown={event => selectAdjacentOption(event, index)}
            type='button'
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
