import * as React from 'react';

import Typography from '@/components/Typography';
import useCountdown from '@/hooks/useCountdown';
import clsxm from '@/lib/clsxm';

export default function Countdown({
  closeDate,
  startDate,
  className = '',
  isNotStartedMessage = 'Pendaftaran dimulai dalam',
  isStartingMessage = 'Waktu pendaftaran tersisa',
  isClosedMessage = 'Pendaftaran telah ditutup',
}: {
  closeDate: Date;
  startDate: Date;
  className?: string;
  isNotStartedMessage?: string;
  isStartingMessage?: string;
  isClosedMessage?: string;
} & React.ComponentPropsWithoutRef<'div'>) {
  const isStarted = new Date() > new Date(startDate);
  const isClosed = new Date() > new Date(closeDate);
  const [days, hours, minutes] = useCountdown(
    isStarted ? new Date(closeDate) : new Date(startDate)
  );

  return (
    <div>
      <Typography
        variant='t'
        className={clsxm('font-semibold text-typo-primary', className)}
      >
        {!isStarted
          ? isNotStartedMessage
          : !isClosed
          ? isStartingMessage
          : isClosedMessage}
      </Typography>
      <div className='w-full flex justify-center items-center gap-2 mt-4'>
        <div
          className={clsxm(
            'w-full md:w-20 flex flex-col items-center p-3',
            'rounded-md bg-typo-surface'
          )}
        >
          <Typography variant='h5' className='font-bold'>
            {days}
          </Typography>
          <Typography variant='c1' color='secondary' className='font-semibold'>
            Hari
          </Typography>
        </div>

        <Typography variant='p' className='text-typo-icon'>
          :
        </Typography>

        <div className='w-full md:w-20 flex flex-col items-center p-3 rounded-md bg-typo-surface'>
          <Typography variant='h5' className='font-bold'>
            {hours}
          </Typography>
          <Typography variant='c1' color='secondary' className='font-semibold'>
            Jam
          </Typography>
        </div>

        <Typography variant='p' className='text-typo-icon'>
          :
        </Typography>

        <div className='w-full md:w-20 flex flex-col items-center p-3 rounded-md bg-typo-surface'>
          <Typography variant='h5' className='font-bold'>
            {minutes}
          </Typography>
          <Typography variant='c1' color='secondary' className='font-semibold'>
            Menit
          </Typography>
        </div>
      </div>
    </div>
  );
}
