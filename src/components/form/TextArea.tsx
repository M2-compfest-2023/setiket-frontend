import * as React from 'react';
import { get, RegisterOptions, useFormContext } from 'react-hook-form';

import ErrorMessage from '@/components/form/ErrorMessage';
import HelperText from '@/components/form/HelperText';
import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

export type TextAreaProps = {
  id: string;
  label?: string;
  helperText?: string;
  hideError?: boolean;
  validation?: RegisterOptions;
} & React.ComponentPropsWithoutRef<'textarea'>;

export default function TextArea({
  id,
  label,
  helperText,
  hideError = false,
  validation,
  className,
  maxLength = 255,
  readOnly = false,
  ...rest
}: TextAreaProps) {
  const [value, setValue] = React.useState('');

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, id);
  const textArea = register(id, validation);

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    textArea.onChange(e);
    setValue(e.currentTarget.value);
  };

  return (
    <div className='w-full space-y-1.5'>
      {label && (
        <label htmlFor={id} className='flex space-x-1'>
          <Typography
            className='font-semibold text-typo-primary'
            font={'ubuntu'}
          >
            {label}
          </Typography>
          {validation?.required && (
            <Typography className='text-red'>*</Typography>
          )}
        </label>
      )}

      <div className='relative'>
        <textarea
          {...textArea}
          id={id}
          name={id}
          readOnly={readOnly}
          disabled={readOnly}
          maxLength={maxLength}
          onChange={handleChange}
          className={clsxm(
            'w-full px-3 py-2.5 rounded-md',
            'focus:ring-2 ring-1 ring-typo-label border-none',
            'bg-base-white font-primary text-typo-primary',
            'placeholder:font-primary placeholder:text-typo-label',
            readOnly && 'cursor-not-allowed',
            error
              ? 'border-none focus:ring-red-500 ring-1 ring-inset ring-red-500'
              : 'focus:ring-blue-500',
            className
          )}
          aria-describedby={id}
          {...rest}
        />

        <Typography
          variant='c1'
          className='absolute right-3 bottom-2.5 text-typo-label'
        >
          {value.length}/{maxLength}
        </Typography>
      </div>

      {!hideError && error && <ErrorMessage>{error.message}</ErrorMessage>}
      {!error && helperText && <HelperText>{helperText}</HelperText>}
    </div>
  );
}
