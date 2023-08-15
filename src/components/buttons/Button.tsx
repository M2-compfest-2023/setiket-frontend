import * as React from 'react';
import { IconType } from 'react-icons';
import { ImSpinner2 } from 'react-icons/im';

import clsxm from '@/lib/clsxm';

enum ButtonVariant {
  'primary',
  'primary-darker',
  'warning',
  'danger',
  'success',
  'label',
  'outline',
  'unstyled',
}

enum ButtonSize {
  'sm',
  'base',
  'lg',
}

type ButtonProps = {
  isLoading?: boolean;
  size?: keyof typeof ButtonSize;
  variant?: keyof typeof ButtonVariant;
  leftIcon?: IconType;
  rightIcon?: IconType;
  leftIconClassName?: string;
  rightIconClassName?: string;
  textClassName?: string;
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      size = 'base',
      variant = 'primary',
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      leftIconClassName,
      rightIconClassName,
      textClassName,
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={clsxm(
          'button inline-flex items-center justify-center rounded-md',
          'focus:warning-none focus-visible:ring focus-visible:ring-blue-500',
          'transition-colors duration-75',
          'border-2 border-typo-primary',
          'text-typo-primary text-sm md:text-base font-semibold',
          //#region  //*=========== Size ===========
          [
            size === 'lg' && [
              'min-h-[42px] py-2 px-3 md:min-h-[48px] md:py-2.5 md:px-6',
            ],
            size === 'base' && [
              'min-h-[34px] py-1.5 px-2.5 md:min-h-[40px] md:py-[6px] md:px-5',
            ],
            size === 'sm' && [
              'min-h-[30px] py-[1px] px-2 md:min-h-[34px] md:py-[2px] md:px-4',
            ],
          ],
          //#endregion  //*======== Size ===========
          //#region  //*=========== Variants ===========
          [
            variant === 'primary' && [
              'bg-primary-40',
              'hover:bg-primary-60',
              'active:bg-primary-70',
              'shadow-p-100 hover:shadow-p-200 disabled:hover:shadow-p-100',
              'disabled:bg-primary-70 disabled:brightness-90 disabled:hover:bg-primary-70',
            ],
            variant === 'primary-darker' && [
              'bg-primary-80',
              'hover:bg-primary-60',
              'active:bg-primary-70',
              'shadow-p-100 hover:shadow-p-200 disabled:hover:shadow-p-100',
              'disabled:bg-primary-70 disabled:brightness-90 disabled:hover:bg-primary-70',
            ],
            variant === 'warning' && [
              'bg-warning-50',
              'hover:bg-warning-20 active:bg-warning-40',
              'disabled:bg-warning-30 disabled:brightness-95',
            ],
            variant === 'danger' && [
              'bg-danger-50',
              'shadow-d-100 hover:shadow-d-200 disabled:hover:shadow-d-100',
              'hover:bg-danger-60 active:bg-danger-70',
              'disabled:bg-danger-70 disabled:brightness-95',
            ],
            variant === 'success' && [
              'bg-success-50',
              'hover:bg-success-60 active:bg-success-70',
              'shadow-d-100 hover:shadow-d-200 disabled:hover:shadow-d-100',
              'shadow-s-100 hover:shadow-s-200 disabled:hover:shadow-s-100',
            ],
            variant === 'label' && [
              'bg-typo-white',
              'hover:bg-typo-label hover:text-typo-white active:bg-typo-label',
              'active:bg-typo-label disabled:bg-typo-label disabled:text-white disabled:brightness-95',
            ],
            variant === 'outline' && [
              'bg-transparent text-typo-secondary border-typo-outline',
              'hover:text-white hover:border-typo-label',
              'active:text-white active:bg-typo-label disabled:bg-transparent disabled:text-typo-secondary disabled:border-typo-outline',
            ],
          ],
          //#endregion  //*======== Variants ===========
          'disabled:cursor-not-allowed',
          'hover:bg-typo-label',
          isLoading &&
            'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait',
          className
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={clsxm(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              [
                ['primary', 'danger'].includes(variant) && 'text-white',
                ['warning', 'label'].includes(variant) && 'text-gray-500',
              ]
            )}
          >
            <ImSpinner2 className='animate-spin' />
          </div>
        )}
        {/* Left Icon */}
        {LeftIcon && (
          <div
            className={clsxm([
              size === 'sm' && 'mr-[10px]',
              size === 'base' && 'mr-[8px]',
              size === 'lg' && 'mr-[8px]',
            ])}
          >
            <LeftIcon
              className={clsxm(
                'text-sm md:text-2xl font-semibold',
                leftIconClassName
              )}
            />
          </div>
        )}
        <span className={textClassName}>{children}</span>
        {RightIcon && (
          <div
            className={clsxm([
              size === 'sm' && 'ml-[10px]',
              size === 'base' && 'ml-[8px]',
              size === 'lg' && 'ml-[8px]',
            ])}
          >
            <RightIcon
              className={clsxm(
                'text-sm md:text-2xl font-semibold',
                rightIconClassName
              )}
            />
          </div>
        )}
      </button>
    );
  }
);

export default Button;
