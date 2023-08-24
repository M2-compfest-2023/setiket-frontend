import { MouseEventHandler } from 'react';
import { IconType } from 'react-icons';

import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

enum ChipsVariant {
  'primary',
  'secondary',
  'tertiary',
  'yellow',
}

enum ChipsSize {
  'sm',
  'base',
}

type ChipProps = {
  size?: keyof typeof ChipsSize;
  variant?: keyof typeof ChipsVariant;
  className?: string;
  children?: string;
  Icon?: IconType;
  clickAble?: boolean;
  onClick?: MouseEventHandler;
};

export default function Chips({
  size = 'sm',
  variant = 'primary',
  children = '',
  className,
  Icon,
  clickAble,
  onClick,
}: // icon,
ChipProps) {
  return (
    <div onClick={onClick}
      className={clsxm(
        [
          variant === 'primary' && ['from-gradient-100 to-gradient-200'],
          variant === 'secondary' && ['from-gradient-300 to-gradient-400'],
          variant === 'tertiary' && ['from-gradient-500 to-gradient-600'],
          variant === 'yellow' && ['from-yellow-400 to-yellow-500'],
        ],
        [size === 'sm' && ['px-3 py-2'], size === 'base' && ['px-5 py-3']],
        clickAble && ['hover:cursor-pointer'],
        'flex items-center bg-gradient-to-r rounded-full',
        className
      )}
    >
      <Typography variant='b3' font='ubuntu' color='white'>
        {children}
      </Typography>

      {Icon && (<Icon className='text-white'/>)}
    </div>
  );
}
