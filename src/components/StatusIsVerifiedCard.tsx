import * as React from 'react';

import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

const ISVERIFIED_ID = ['unverified', 'verified'] as const;

export type IsVerifiedId = (typeof ISVERIFIED_ID)[number];

const colors: Record<
  IsVerifiedId,
  { color: string; background: string; text: string }
> = {
  unverified: {
    color: 'text-typo-primary',
    background: 'bg-typo-light',
    text: 'Menunggu Verifikasi',
  },
  verified: {
    color: 'text-success-70',
    background: 'bg-success-10',
    text: 'Pendaftaran Diterima',
  },
};

type StatusIsVerifiedProps = {
  status: IsVerifiedId;
};

export default function StatusIsVerifiedCard({
  status,
}: StatusIsVerifiedProps) {
  return (
    <div className='space-y-2'>
      <div
        className={clsxm(
          'rounded-md flex justify-center items-center text-center py-1',
          colors[status].background
        )}
      >
        <Typography
          as='p'
          variant='c2'
          weight='semibold'
          className={clsxm(`text-xs leading-6 ${colors[status].color}`)}
        >
          {colors[status].text}
        </Typography>
      </div>
    </div>
  );
}
