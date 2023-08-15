import * as React from 'react';
import { IconType } from 'react-icons';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';
import clsxm from '@/lib/clsxm';

enum IconLinkVariant {
  'primary',
  'danger',
  'warning',
  'success',
  'label',
  'none',
}
enum IconLinkSize {
  'sm',
  'base',
  'lg',
}

type IconLinkProps = {
  variant?: keyof typeof IconLinkVariant;
  size?: keyof typeof IconLinkSize;
  icon?: IconType;
  iconClassName?: string;
} & Omit<UnstyledLinkProps, 'children'>;

const IconLink = React.forwardRef<HTMLAnchorElement, IconLinkProps>(
  (
    {
      className,
      icon: Icon,
      variant = 'outline',
      iconClassName,
      size = 'base',
      ...rest
    },
    ref
  ) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={clsxm(
          'inline-flex items-center justify-center font-semibold',
          'focus:outline-none focus-visible:ring focus-visible:ring-blue-50',
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
              'bg-blue-40',
              'hover:bg-blue-70',
              'active:bg-blue-80',
              'disabled:bg-blue-70 disabled:brightness-90 disabled:hover:bg-blue-70',
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
              'bg-typo-label',
              'hover:bg-typo-label',
              'active:bg-typo-label',
              'disabled:bg-typo-label disabled:brightness-90 disabled:hover:bg-typo-label',
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
      </UnstyledLink>
    );
  }
);

export default IconLink;
