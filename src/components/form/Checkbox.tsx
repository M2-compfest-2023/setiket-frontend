import clsx from 'clsx';
import * as React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

import Typography, { TypographyColor } from '@/components/Typography';
import clsxm from '@/lib/clsxm';

enum CheckboxSize {
  'sm',
  'base',
}

export type CheckboxProps = {
  /** Input label */
  label: string;
  name: string;
  /** Add value only if you're using grouped checkbox, omit value if using a single checkbox */
  value?: string | number;
  /** Small text below input, useful for additional information */
  helperText?: string;
  /** Disables the input and shows defaultValue (can be set from React Hook Form) */
  readOnly?: boolean;
  /** Disable error style (not disabling error validation) */
  hideError?: boolean;
  /** Manual validation using RHF, it is encouraged to use yup resolver instead */
  validation?: RegisterOptions;
  labelClassName?: string;
  labelVariant?: string;
  size?: keyof typeof CheckboxSize;
  color?: keyof typeof TypographyColor;
} & Omit<React.ComponentPropsWithoutRef<'input'>, 'size'>;

export default function Checkbox({
  label,
  name,
  value,
  placeholder = '',
  helperText,
  readOnly = false,
  hideError = false,
  validation,
  size = 'base',
  color = 'primary',
  labelClassName,
  labelVariant = 'p3',
  ...rest
}: CheckboxProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div>
      <div className='flex items-start gap-2'>
        <input
          {...register(name, validation)}
          {...rest}
          type='checkbox'
          name={name}
          id={`${name}_${value}`}
          value={value}
          disabled={readOnly}
          className={clsxm(
            // add top margin so the checkbox align with the text
            'mt-[0.25em]',
            'shrink-0',
            'border-typo rounded-sm border-2 focus:ring-0',
            'checked:bg-lightBlue-400 checked:hover:bg-lightBlue-600 checked:focus:bg-lightBlue-400 checked:active:bg-lightBlue-700',
            readOnly &&
              'cursor-not-allowed bg-gray-100 disabled:checked:bg-lightBlue-300',
            error && 'border-danger-400 bg-danger-100',
            size === 'sm' && 'h-3.5 w-3.5'
          )}
          placeholder={placeholder}
          aria-describedby={name}
        />
        <Typography
          color={color}
          className={clsx(readOnly && 'cursor-not-allowed', labelClassName)}
          as='label'
          htmlFor={`${name}_${value}`}
          variant='p2'
        >
          {label}
        </Typography>
      </div>
      <div className='mt-1'>
        {!(!hideError && error) && helperText && <p>{helperText}</p>}
        {!hideError && error && (
          <Typography variant='bt'>{error?.message?.toString()}</Typography>
        )}
      </div>
    </div>
  );
}
