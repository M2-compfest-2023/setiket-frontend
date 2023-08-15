import * as React from 'react';

import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

enum BadgeVariant {
  'success',
  'warning',
  'danger',
}

enum BadgeSize {
  'small',
  'base',
  'large',
}

export type BadgeProps = {
  label: string;
  size?: keyof typeof BadgeSize;
  variant?: keyof typeof BadgeVariant;
  textClassName?: string;
} & React.ComponentPropsWithoutRef<'div'>;

export default function Badge({
  label,
  size = 'base',
  variant = 'success',
  className,
  textClassName,
}: BadgeProps) {
  return (
    <div
      className={clsxm(
        'rounded-[3px] ring-1 ring-inset',
        'text-center font-semibold',
        'flex items-center justify-center text-sm',
        [
          size === 'large' && 'min-h-[32px] px-3 py-1',
          size === 'base' && 'min-h-[28px] px-2.5 py-0.5',
          size === 'small' && 'min-h-[26px] px-2 py-px',
        ],
        [
          variant === 'success' && 'bg-success-10 ring-transparent',
          variant === 'warning' && 'bg-warning-10 ring-transparent',
          variant === 'danger' && 'bg-danger-10 ring-transparent',
        ],
        className
      )}
    >
      <Typography
        variant='c1'
        weight='semibold'
        color={variant}
        className={clsxm('overflow-x-hidden', textClassName)}
      >
        {label}
      </Typography>
    </div>
  );
}
