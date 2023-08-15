import * as React from 'react';
import { IconType } from 'react-icons';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';
import clsxm from '@/lib/clsxm';

enum ButtonSize {
  'sm',
  'base',
  'lg',
}

enum ButtonVariant {
  'primary',
  'warning',
  'danger',
  'success',
  'netral',
}

type ButtonLinkProps = {
  size?: keyof typeof ButtonSize;
  leftIcon?: IconType;
  rightIcon?: IconType;
  leftIconClassName?: string;
  rightIconClassName?: string;
  variant?: keyof typeof ButtonVariant;
} & UnstyledLinkProps;

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      children,
      className,
      variant = 'red',
      size = 'base',
      leftIconClassName,
      rightIconClassName,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      ...rest
    },
    ref
  ) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={clsxm(
          'button inline-flex items-center justify-center rounded-md md:rounded-lg',
          'focus:outline-none focus-visible:ring focus-visible:ring-blue-50',
          'transition duration-200 ease-in-out',
          'text-sm md:text-base font-semibold',
          'border-2 border-typo-primary',
          'text-typo-primary',
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
              'bg-primary-40 ',
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
            variant === 'netral' && [
              'bg-typo-white',
              'hover:bg-typo-label hover:text-typo-white active:bg-typo-label',
              'active:bg-typo-label disabled:bg-typo-label disabled:text-white disabled:brightness-95',
            ],
          ],
          //#endregion  //*======== Variants ===========
          className
        )}
      >
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
        {children}
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
      </UnstyledLink>
    );
  }
);

export default ButtonLink;
