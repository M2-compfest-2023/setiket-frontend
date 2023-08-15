import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

export default function HelperText({
  children,
  helperTextClassName,
}: {
  children: string;
  helperTextClassName?: string;
}) {
  return (
    <div className='flex space-x-1'>
      <Typography
        variant='c2'
        className={clsxm(
          '!leading-tight text-typo-secondary text-xs',
          helperTextClassName
        )}
      >
        {children}
      </Typography>
    </div>
  );
}
