import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

const MascotCard = ({
  event,
  link,
  src,
  className,
  textClassName,
}: {
  event: string;
  link: string;
  src: string;
  className?: string;
  textClassName?: string;
}) => {
  return (
    <Link href={`${link}`}>
      <div
        className={clsxm(
          'relative h-[546px] max-w-[252px] rounded-md border border-typo-outline group transition-all duration-100 ease-in-out px-10',
          className
        )}
      >
        <div className='mt-14'>
          <Typography
            variant='p'
            font='ubuntu'
            weight='bold'
            className='text-center'
          >
            SeTicket
          </Typography>
          <Typography
            variant='h4'
            font='ubuntu'
            className={clsxm(
              'text-center text-[48px] md:text-[36px]',
              textClassName
            )}
          >
            {event}
          </Typography>
        </div>
        <div className='flex justify-center'>
          <div className='absolute object-contain bottom-0'>
            <Image
              src={src}
              width={220}
              height={400}
              alt={`${event} Mascot`}
              className='h-full w-full'
            ></Image>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MascotCard;
