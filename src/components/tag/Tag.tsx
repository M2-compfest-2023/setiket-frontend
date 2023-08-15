import * as React from 'react';

import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

enum TagSize {
  'small',
  'base',
}

export enum TagColor {
  'primary',
  'warning',
  'success',
  'danger',
  'purple',
  'skyblue',
}

type TagProps = {
  children: React.ReactNode;
  size?: keyof typeof TagSize;
  color?: keyof typeof TagColor;
} & React.ComponentPropsWithRef<'div'>;

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ children, className, size = 'base', color = 'primary', ...rest }, ref) => {
    return (
      <div
        ref={ref}
        {...rest}
        className={clsxm(
          'inline-flex items-center justify-center rounded-md',

          //*=========== Size ===========
          {
            'px-4 !text-xs': size === 'small',
            'px-6 !text-sm': size === 'base',
          },
          {
            'bg-gray-100 border border-gray-300': color === 'primary',
            'bg-warning-10 border border-warning-20': color === 'warning',
            'bg-success-10 border border-success-30': color === 'success',
            'bg-danger-10 border border-danger-30': color === 'danger',
            'bg-purple-100 border border-purple-300': color === 'purple',
            'bg-blue-100 border border-blue-300': color === 'skyblue',
          },
          className
        )}
      >
        <Typography variant='p' as='span' color={'secondary'}>
          {children}
        </Typography>
      </div>
    );
  }
);

export default Tag;
