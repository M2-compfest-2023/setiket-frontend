import Link from 'next/link';
import { AiOutlineCalendar, AiOutlineClockCircle } from 'react-icons/ai';
import { HiLocationMarker } from 'react-icons/hi';

import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

enum CardVariant {
  'primary',
  'secondary',
  'gradient',
}

enum CardSize {
  'sm',
  'base',
  'lg',
}

type CardProps = {
  size?: keyof typeof CardSize;
  variant?: keyof typeof CardVariant;
  className?: string;
  province: string;
  city: string;
  eventName: string;
  startdate: string;
  starttime: string;
  ticketPrice: string;
  eventId: string;
};

export default function EventCard({
  className,
  province,
  city,
  eventName,
  startdate,
  starttime,
  ticketPrice,
  eventId,
}: CardProps) {
  const link = '/events/detail/'.concat(eventId);
  return (
    <Link href={link}>
      <div
        className={clsxm(
          'w-[310px] h-[160px] bg-white rounded-3xl px-5 py-3 shadow-lg flex flex-col justify-between',
          className
        )}
      >
        <div>
          <Typography
            className='text-cyan-600 my-1'
            variant='p3'
            weight='semibold'
          >
            <HiLocationMarker className='inline-block' /> {city}, {province}
          </Typography>

          <Typography variant='h5' color='cyan' className='my-1'>
            {eventName}
          </Typography>

          <Typography
            className='text-cyan-700 my-1'
            variant='p3'
            weight='semibold'
          >
            <AiOutlineCalendar className='inline-block' /> {startdate}
          </Typography>

          <Typography
            className='text-cyan-700 my-1'
            variant='p3'
            weight='semibold'
          >
            <AiOutlineClockCircle className='inline-block' /> {starttime}
          </Typography>
        </div>

        <Typography className='text-cyan-700' variant='b2'>
          Rp {ticketPrice}
        </Typography>
      </div>
    </Link>
  );
}
