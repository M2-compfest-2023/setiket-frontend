import * as React from 'react';

import PrimaryLink, {
  PrimaryLinkVariant,
} from '@/components/links/PrimaryLink';
import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

const breadcrumbs: Record<
  string,
  { title: string; color: keyof typeof PrimaryLinkVariant }
> = {
  // Dashboard Event
  '/dashboard': {
    title: 'Events',
    color: 'secondary',
  },
};
type BreadcrumbProps = {
  crumbs: Array<keyof typeof breadcrumbs>;
} & React.ComponentPropsWithoutRef<'div'>;

export default function Breadcrumb({
  className,
  crumbs: _crumbs,
  ...rest
}: BreadcrumbProps) {
  // split array into the last part and the rest
  const lastCrumb = _crumbs[_crumbs.length - 1];
  const crumbs = _crumbs.slice(0, _crumbs.length - 1);

  return (
    <div className={clsxm('space-x-1', className)} {...rest}>
      {crumbs.map((crumb) => (
        <React.Fragment key={crumb}>
          <PrimaryLink
            href={crumb}
            variant={breadcrumbs[crumb].color}
            className='font-semibold no-underline'
          >
            {breadcrumbs[crumb].title}
          </PrimaryLink>
          <span className='text-base font-medium'>/</span>
        </React.Fragment>
      ))}
      <Typography
        as='span'
        variant='bt'
        weight='medium'
        color={crumbs.length == 0 ? breadcrumbs[lastCrumb].color : 'primary'}
      >
        {breadcrumbs[lastCrumb].title}
      </Typography>
    </div>
  );
}
