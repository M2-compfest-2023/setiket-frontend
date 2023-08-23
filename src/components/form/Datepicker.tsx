import { get, RegisterOptions, useFormContext } from 'react-hook-form';

import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

export type InputProps = {
  id: string;
  label?: string;
  helperText?: string;
  helperTextClassName?: string;
  hideError?: boolean;
  validation?: RegisterOptions;
  labelClassName?: string;
  classname?: string;
} & React.ComponentPropsWithoutRef<'input'>;

export default function Datepicker({
  id,
  label,
  readOnly = false,
  // helperText,
  // helperTextClassName,
  // hideError,
  validation,
  labelClassName,
  className,
  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, id);

  return (
    <div className='w-full space-y-1.5 rounded-md'>
      {label && (
        <label htmlFor={id} className='flex space-x-1'>
          <Typography
            font='inter'
            variant='p3'
            weight='semibold'
            className={clsxm('text-sm', labelClassName)}
          >
            {label}
          </Typography>
          {validation?.required && (
            <Typography className='text-danger-50'>*</Typography>
          )}
        </label>
      )}

      <div className='w-full flex relative rounded-md'>
        <div className='absolute w-full h-full rounded-md ring-1 ring-inset ring-typo-outline pointer-events-none' />

        <div className={clsxm('relative w-full rounded-md')}>
          <input
            {...register(id, validation)}
            type='date'
            id={id}
            name={id}
            readOnly={readOnly}
            disabled={readOnly}
            className={clsxm(
              'w-full h-full px-3 py-3 rounded-md border-none',
              'focus:ring-2 focus:ring-inset',
              'bg-transparent font-primary text-cyan-800 text-sm',
              readOnly && 'cursor-not-allowed',
              error
                ? 'border-none focus:ring-danger-50 ring-1 ring-inset ring-danger-50 '
                : 'focus:ring-cyan-800',
              className
            )}
            aria-describedby={id}
            {...rest}
          />
        </div>
      </div>
    </div>
  );
}
