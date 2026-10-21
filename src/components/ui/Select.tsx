import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface Option {
  label: string;
  value: string;
}

interface Props {
  ariaLabel: string;
  className?: string;
  icon?: ReactNode;
  onValueChange: (value: string) => void;
  options: readonly Option[];
  value: string;
}

export function Select({ ariaLabel, className, icon, onValueChange, options, value }: Props) {
  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={onValueChange}
    >
      <SelectPrimitive.Trigger
        aria-label={ariaLabel}
        className={cn(
          'group flex h-12 min-w-32 cursor-pointer items-center gap-2 rounded-full border border-transparent bg-surface px-4 text-sm font-medium text-foreground shadow-sm outline-none transition-colors hover:bg-surface-muted focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30 data-[state=open]:border-accent',
          className
        )}
      >
        {icon && <span className='flex shrink-0 text-foreground-muted'>{icon}</span>}
        <SelectPrimitive.Value className='flex-1 text-left' />
        <SelectPrimitive.Icon asChild>
          <ChevronDown
            aria-hidden='true'
            className='size-4 shrink-0 text-foreground-muted transition-transform group-data-[state=open]:rotate-180'
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          align='end'
          className='z-50 max-h-[calc(100vh-2rem)] min-w-[var(--radix-select-trigger-width)] overflow-y-auto rounded-md border border-border bg-surface text-foreground shadow-xl'
          position='popper'
          sideOffset={8}
        >
          <SelectPrimitive.Viewport className='p-1'>
            {options.map(option => (
              <SelectPrimitive.Item
                key={option.value}
                className='relative flex h-10 cursor-pointer select-none items-center rounded-sm py-2 pr-9 pl-3 text-sm outline-none data-[highlighted]:bg-surface-muted data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground'
                value={option.value}
              >
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className='absolute right-3 inline-flex items-center'>
                  <Check
                    aria-hidden='true'
                    className='size-4'
                  />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
