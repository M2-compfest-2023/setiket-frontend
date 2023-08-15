import * as React from 'react';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';
import clsxm from '@/lib/clsxm';

const PrimaryLinkSize = ['medium', 'small'] as const;
export enum PrimaryLinkVariant {
  'primary',
  'secondary',
  'danger',
  'success',
  'warning',
}

type PrimaryLinkProps = {
  size?: (typeof PrimaryLinkSize)[number];
  variant?: (typeof PrimaryLinkVariant)[number];
  underline?: boolean;
} & UnstyledLinkProps;

const PrimaryLink = React.forwardRef<HTMLAnchorElement, PrimaryLinkProps>(
  (
    {
      className,
      children,
      size = 'medium',
      variant = 'primary',
      underline = true,
      ...rest
    },
    ref
  ) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={clsxm(
          'button inline-flex items-center justify-center font-semibold',
          'focus:outline-none focus-visible:ring',
          'transition duration-150',
          'decoration-current hover:decoration-white/0 active:decoration-current disabled:hover:decoration-current',
          underline && 'underline',
          //*=========== Size ===========
          size === 'medium' && 'text-md md:text-base ',
          size === 'small' && 'text-sm md:text-md',
          //*======== Size ===========

          //*=========== Variant ===========
          variant === 'primary' && [
            'text-primary-50',
            'hover:text-primary-60',
            'active:text-primary-70',
          ],
          variant === 'secondary' && [
            'text-black', // color config?
            'focus-visible:ring-typo-secondary',
          ],
          variant === 'danger' && [
            'text-danger-50 hover:text-danger-60 active:text-danger-60',
            'focus-visible:ring-danger-40',
          ],
          variant == 'warning' && [
            'text-warning-50 hover:text-warning-60 active:text-warning-60',
            'focus-visible:ring-warning-40',
          ],
          variant == 'success' && [
            'text-success-50 hover:text-success-60 active:text-success-60',
            'focus-visible:ring-success-40',
          ],
          //*======== Variant ===========
          className
        )}
      >
        {children}
      </UnstyledLink>
    );
  }
);

export default PrimaryLink;
