import * as React from 'react';

import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';
import { PaymentId } from '@/types/entities/pembayaran';

const colors: Record<
  PaymentId,
  { color: string; background: string; text: string }
> = {
  unverified: {
    color: 'text-typo-primary',
    background: 'bg-typo-light',
    text: 'Menunggu Verifikasi',
  },
  need_revision: {
    color: 'text-warning-70',
    background: 'bg-warning-10',
    text: 'Pendaftaran Perlu Revisi',
  },
  rejected: {
    color: 'text-danger-70',
    background: 'bg-danger-10',
    text: 'Pendaftaran Ditolak',
  },
  verified: {
    color: 'text-success-70',
    background: 'bg-success-10',
    text: 'Pendaftaran Diterima',
  },
};

type StatusPembayaranCardProps = {
  status: PaymentId;
};

export default function StatusPembayaranCard({
  status,
}: StatusPembayaranCardProps) {
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
