import type { KeyboardEvent } from 'react';

import { cn } from '@/lib/cn';

interface TabOption<T extends string> {
  label: string;
  value: T;
}

interface Props<T extends string> {
  ariaLabel: string;
  className?: string;
  compact?: boolean;
  id: string;
  onValueChange: (value: T) => void;
  options: readonly TabOption<T>[];
  value: T;
}

export function Tabs<T extends string>({
  ariaLabel,
  className,
  compact = false,
  id,
  onValueChange,
  options,
  value
}: Props<T>) {
  function selectAdjacentTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

    event.preventDefault();
    let nextIndex = index;

    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + options.length) % options.length;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % options.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = options.length - 1;

    const nextOption = options[nextIndex];
    onValueChange(nextOption.value);
    document.getElementById(`${id}-${nextOption.value}-tab`)?.focus();
  }

  return (
    <div
      aria-label={ariaLabel}
      className={cn('inline-flex rounded-full bg-surface-muted p-1', className)}
      role='tablist'
    >
      {options.map((option, index) => {
        const isActive = option.value === value;

        return (
          <button
            aria-controls={`${id}-${option.value}-panel`}
            aria-selected={isActive}
            className={cn(
              cn(
                'cursor-pointer rounded-full text-sm font-medium text-foreground-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                compact ? 'min-w-10 px-3 py-1.5' : 'min-w-20 px-4 py-2'
              ),
              isActive && 'bg-primary text-primary-foreground shadow-sm'
            )}
            id={`${id}-${option.value}-tab`}
            key={option.value}
            onClick={() => onValueChange(option.value)}
            onKeyDown={event => selectAdjacentTab(event, index)}
            role='tab'
            tabIndex={isActive ? 0 : -1}
            type='button'
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
