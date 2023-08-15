import * as React from 'react';

import Typography from '@/components/Typography';
import useCountdown from '@/hooks/useCountdown';

export default function PaymentCoutdown({
  closeDate,
}: {
  closeDate: Date;
} & React.ComponentPropsWithoutRef<'div'>) {
  const [days, hours, minutes, seconds] = useCountdown(new Date(closeDate));

  return (
    <div className=''>
      <Typography variant='p' className='font-bold text-navy-800'>
        Sisa Waktu Pembayaran
      </Typography>
      {hours !== 0 && minutes !== 0 && seconds !== 0 ? (
        <Typography variant='p' className='font-normal text-navy-800'>
          {days > 0 && `${days} Hari `}
          {hours} Jam {minutes} Menit
          {days === 0 && seconds > 0 && ` ${seconds} Detik`}
        </Typography>
      ) : (
        <Typography variant='p' className='font-normal text-navy-800'>
          Waktu Pembayaran Habis
        </Typography>
      )}
    </div>
  );
}
