import * as React from 'react';
import { IconType } from 'react-icons';

import clsxm from '@/lib/clsxm';

enum ButtonVariant {
  'primary',
  'secondary',
  'gradient',
  'danger',
  'warning',
  'success',
  'label',
  'none',
}
enum ButtonSize {
  'sm',
  'base',
  'lg',
}

type IconButtonProps = {
  variant?: keyof typeof ButtonVariant;
  size?: keyof typeof ButtonSize;
  icon?: IconType;
  iconClassName?: string;
} & React.ComponentPropsWithRef<'button'>;

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      icon: Icon,
      variant = 'label',
      disabled: buttonDisabled,
      iconClassName,
      size = 'base',
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type='button'
        disabled={buttonDisabled}
        className={clsxm(
          'button inline-flex items-center justify-center',
          'focus:outline-none focus-visible:ring focus-visible:ring-primary-50',
          'transition duration-100',
          'min-h-[28px] min-w-[28px] rounded-lg p-1 md:min-h-[34px] md:min-w-[34px] md:p-2',
          'border-2 border-black',
          'text-black text-sm md:text-base',

          //#region  //*=========== Size ===========
          [
            size === 'lg' && [
              'min-h-[44px] min-w-[44px] p-2 md:min-h-[48px] md:min-w-[48px] md:p-2.5',
            ],
            size === 'base' && [
              'min-h-[36px] min-w-[36px] p-1 md:min-h-[40px] md:min-w-[40px] md:p-1.5',
            ],
            size === 'sm' && [
              'min-h-[32px] min-w-[32px] p-0.5 md:min-h-[36px] md:min-w-[36px] md:p-1',
            ],
          ],
          //#endregion  //*======== Size ===========
          //#region  //*=========== Variant ===========
          [
            variant === 'primary' && [
              'bg-gradient-to-b from-primarybutton-100 to-primarybutton-200',
              'hover:from-primarybutton-300 hover:to-primarybutton-400',
              'active:from-primarybutton-500 active:to-primarybutton-600',
              'shadow-p-100 hover:shadow-p-200 disabled:hover:shadow-p-100',
              'disabled:from-primarybutton-500 disabled:to-primarybutton-600 disabled:brightness-90 disabled:hover:bg-primarybutton-600',
            ],
            variant === 'secondary' && [
              'bg-gradient-to-b from-secondarybutton-100 to-secondarybutton-200',
              'hover:from-secondarybutton-300 hover:to-secondarybutton-400',
              'active:from-secondarybutton-500 active:to-secondarybutton-600',
              'shadow-p-100 hover:shadow-p-200 disabled:hover:shadow-p-100',
              'disabled:from-secondarybutton-500 disabled:to-secondarybutton-600 disabled:brightness-90 disabled:hover:bg-secondarybutton-600',
            ],
            variant === 'gradient' && [
              'bg-gradient-to-b from-gradient-100 to-gradient-200',
              'hover:from-gradient-300 hover:to-gradient-400',
              'active:from-gradient-500 active:to-gradient-600',
              'shadow-p-100 hover:shadow-p-200 disabled:hover:shadow-p-100',
              'disabled:from-gradient-500 disabled:to-gradient-600 disabled:brightness-90 disabled:hover:bg-gradient-600',
            ],
            variant === 'danger' && [
              'bg-danger-50',
              'hover:bg-danger-70',
              'active:bg-danger-80',
              'disabled:bg-danger-70 disabled:brightness-90 disabled:hover:bg-danger-70',
            ],
            variant === 'warning' && [
              'bg-warning-50',
              'hover:bg-warning-70',
              'active:bg-warning-80',
              'disabled:bg-warning-70 disabled:brightness-90 disabled:hover:bg-warning-70',
            ],
            variant === 'success' && [
              'bg-success-50',
              'hover:bg-success-70',
              'active:bg-success-80',
              'disabled:bg-success-70 disabled:brightness-90 disabled:hover:bg-success-70',
            ],
            variant === 'label' && [
              'bg-typo-white',
              'hover:bg-typo-label',
              'active:bg-typo-label',
              'active:bg-typo-label disabled:bg-typo-label disabled:brightness-95',
            ],
            variant === 'none' && [
              '!border-none',
              'bg-none text-base-primary',
              'hover:bg-none',
              'active:bg-none',
              'disabled:bg-none',
            ],
          ],
          //#endregion  //*======== Variant ===========
          'disabled:cursor-not-allowed',
          className
        )}
        {...rest}
      >
        {Icon && (
          <Icon className={clsxm('w-6 h-6 text-typo-primary', iconClassName)} />
        )}
      </button>
    );
  }
);

export default IconButton;
