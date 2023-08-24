import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

enum ChipsVariant {
  'primary',
  'secondary',
  'tertiary',
}

enum ChipsSize {
  'sm',
  'base',
}

type CardProps = {
  size?: keyof typeof ChipsSize;
  variant?: keyof typeof ChipsVariant;
  className?: string;
  children?: string;
  // icon?: IconType
};

export default function Chips({
  size = 'sm',
  variant = 'primary',
  children = '',
  className,
}: // icon,
CardProps) {
  return (
    <div
      className={clsxm(
        [
          variant === 'primary' && ['from-gradient-100 to-gradient-200'],
          variant === 'secondary' && ['from-gradient-300 to-gradient-400'],
          variant === 'tertiary' && ['from-gradient-500 to-gradient-600'],
        ],
        [size === 'sm' && ['px-3 py-2'], size === 'base' && ['px-5 py-3']],
        'bg-gradient-to-r rounded-full inline-block ',
        className
      )}
    >
      <Typography variant='b3' font='ubuntu' color='white'>
        {children}
      </Typography>
    </div>
  );
}
