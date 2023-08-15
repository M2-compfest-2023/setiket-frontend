import * as React from 'react';

import Tag, { TagColor } from '@/components/tag/Tag';
import { PaymentId, PaymentText } from '@/types/entities/pembayaran';

export const statusPembayaran: Record<
  string,
  {
    id: number;
    color: keyof typeof TagColor;
    text: PaymentText;
  }
> = {
  DEFAULT: {
    id: 0,
    color: 'primary',
    text: 'Tidak Diketahui',
  },
  unverified: {
    id: 5,
    color: 'primary',
    text: 'Menunggu',
  },
  need_revision: {
    id: 1,
    color: 'warning',
    text: 'Revisi',
  },
  rejected: {
    id: 2,
    color: 'danger',
    text: 'Ditolak',
  },
  verified: {
    id: 3,
    color: 'success',
    text: 'Diterima',
  },
};

const PaymentTag = React.forwardRef<HTMLDivElement, { color: PaymentId }>(
  ({ color, ...rest }, ref) => {
    return (
      <Tag
        ref={ref}
        {...rest}
        color={color ? statusPembayaran[color].color : 'primary'}
        size='small'
        className='!text-base'
      >
        {color ? statusPembayaran[color].text : 'Tidak Diketahui'}
      </Tag>
    );
  }
);

export default PaymentTag;
