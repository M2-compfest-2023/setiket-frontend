import * as React from 'react';
import { get, RegisterOptions, useFormContext } from 'react-hook-form';

import ErrorMessage from '@/components/form/ErrorMessage';
import HelperText from '@/components/form/HelperText';
import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

export type SelectInputProps = {
  id: string;
  label?: string;
  helperText?: string;
  hideError?: boolean;
  validation?: RegisterOptions;
  readOnly?: boolean;
} & React.ComponentPropsWithoutRef<'select'>;

export default function SelectInput({
  id,
  label,
  helperText,
  hideError = false,
  validation,
  className,
  readOnly = false,
  defaultValue = '',
  placeholder = '',
  children,
  ...rest
}: SelectInputProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const error = get(errors, id);
  const value = watch(id);

  return (
    <div className='w-full space-y-1.5 rounded-md'>
      {label && (
        <label htmlFor={id} className='flex space-x-1'>
          <Typography
            font='inter'
            variant='c1'
            weight='semibold'
            className='text-sm text-typo-primary'
          >
            {label}
          </Typography>
          {validation?.required && (
            <Typography className='text-danger-50'>*</Typography>
          )}
        </label>
      )}

      <select
        {...register(id, validation)}
        id={id}
        name={id}
        defaultValue={defaultValue}
        disabled={readOnly}
        className={clsxm(
          'w-full pl-3 pr-8 py-2.5 truncate rounded-md border-none',
          'focus:ring-2 focus:ring-inset ring-1 ring-inset ring-typo-outline',
          'bg-typo-white font-primary text-typo-primary text-sm',
          readOnly && 'cursor-not-allowed',
          error
            ? 'focus:ring-danger-50 ring-1 ring-inset ring-danger-50'
            : 'focus:ring-typo-primary',
          !value && !readOnly && 'text-typo-primary',
          className
        )}
        aria-describedby={id}
        {...rest}
      >
        {placeholder && (
          <option value='' disabled hidden>
            {placeholder}
          </option>
        )}
        {children}
      </select>

      {!hideError && error && <ErrorMessage>{error.message}</ErrorMessage>}
      {!error && helperText && <HelperText>{helperText}</HelperText>}
    </div>
  );
}
