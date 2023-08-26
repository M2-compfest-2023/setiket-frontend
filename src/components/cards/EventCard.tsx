import { useRouter } from 'next/router';
import { MouseEventHandler } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { AiOutlineClockCircle } from 'react-icons/ai';

import Button from '@/components/buttons/Button';
import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

enum CardVariant {
  'primary',
  'secondary',
}

enum CardSize {
  'sm',
  'base',
}

type CardProps = {
  size?: keyof typeof CardSize;
  variant?: keyof typeof CardVariant;
  className?: string;

  eventName?: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  ticketPrice?: number;
  eventId?: number;
  buttonText?: string;

  buttonOnClik?: MouseEventHandler;
  link?: string;
};

export default function EventCard({
  className,
  eventName,
  startDate,
  startTime,
  endDate,
  endTime,
  ticketPrice,
  size = 'base',
  buttonText,
  buttonOnClik,
  link,
}: CardProps) {
  const router = useRouter();
  return (
    <div
      className={clsxm(
        'bg-white rounded-3xl px-5 py-3 shadow-lg flex flex-col justify-between shrink-0',
        [
          size === 'base' && ['w-[310px] h-[160px]'],
          size === 'sm' && ['w-[280px] h-[160px]'],
        ],
        link && 'hover:bg-gray-100 hover:cursor-pointer',
        className
      )}
      onClick={() => link && router.push(link)}
    >
      <div>
        <Typography variant='h5' color='cyan' className='my-1'>
          {eventName}
        </Typography>

        <Typography
          className='text-cyan-700 my-1'
          variant='p3'
          weight='semibold'
        >
          <AiOutlineCalendar className='inline-block' /> {startDate}{' '}
          {endDate && ` - ${endDate}`}
        </Typography>

        <Typography
          className='text-cyan-700 my-1'
          variant='p3'
          weight='semibold'
        >
          <AiOutlineClockCircle className='inline-block' /> {startTime}{' '}
          {endTime && ` - ${endTime}`}
        </Typography>
      </div>

      {ticketPrice && (
        <Typography className='text-cyan-700' variant='b2'>
          Rp {ticketPrice}
        </Typography>
      )}

      {buttonText && (
        <div className='w-[50%]'>
          <Button variant='secondary' size='sm' onClick={buttonOnClik}>
            {buttonText}
          </Button>
        </div>
      )}
    </div>
  );
}
