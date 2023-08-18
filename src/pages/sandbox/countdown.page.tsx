import React from 'react';

import Countdown from '@/components/countdown/Countdown';
import Typography from '@/components/Typography';

export default function BadgePage() {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen space-y-4'>
      <div className='text-center flex flex-col justify-center items-center gap-10'>
        <Typography variant='h4' as='h4' font='ubuntu'>
          Countdown
        </Typography>
        <Countdown
          className='text-center'
          closeDate={new Date('2023-08-27T00:00:00+07:00')}
          startDate={new Date('2023-07-01T00:00:00+07:00')}
        />
      </div>
    </div>
  );
}
