import React from 'react';

import Badge from '@/components/Badge';
import Typography from '@/components/Typography';

export default function BadgePage() {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen space-y-4'>
      <div className='text-center flex flex-col justify-center items-center gap-10'>
        <Typography variant='h4' as='h4' font='ubuntu'>
          Badge
        </Typography>
        <div className='w-full flex flex-col gap-6'>
          <Badge label='Badge' size='large' variant='success' />
          <Badge label='Badge' size='large' variant='warning' />
          <Badge label='Badge' size='large' variant='danger' />
        </div>
      </div>
    </div>
  );
}
