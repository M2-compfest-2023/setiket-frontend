import { MouseEventHandler } from 'react';
import { IconType } from 'react-icons';
import { BsFillCalendarFill } from 'react-icons/bs';
import { FaClock, FaRegMap } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';

import IconButton from '@/components/buttons/IconButton';
import Chips from '@/components/Chips';
import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

type CardProps = {
  className?: string;
  eventName?: string;
  eventCategory?: string;
  province?: string;
  city?: string;
  eventOrganization?: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  description?: string;
  purchaseTime?: string;
  totalTickets?: number;
  totalPrice?: string;
  iconButton?: IconType;
  iconButtonOnClick?: MouseEventHandler;
};

export default function EventDetail({
  className,
  eventName,
  eventCategory,
  province,
  city,
  eventOrganization,
  startDate,
  endDate,
  startTime,
  endTime,
  description,
  purchaseTime,
  totalTickets,
  totalPrice,
  iconButton,
  iconButtonOnClick,
}: CardProps) {
  return (
    <div
      className={clsxm(
        'w-full bg-white rounded-2xl shadow-2xl p-5 h-auto',
        className
      )}
    >
      <div className='flex justify-between'>
        {eventName && (
          <Typography variant='h3' font='ubuntu' color='cyan'>
            {eventName}
          </Typography>
        )}
        {iconButton && (
          <IconButton
            variant='none'
            size='lg'
            className='rounded-full border-0 p-0'
            iconClassName='text-gray-400 hover:text-gray-500'
            icon={iconButton}
            onClick={iconButtonOnClick}
          />
        )}
      </div>

      <div className='flex my-4 gap-5 items-center'>
        {eventCategory && <Chips>{eventCategory}</Chips>}

        {city && (
          <Typography variant='p2' color='secondary'>
            <FaRegMap className='inline-block' /> {province}, {city}
          </Typography>
        )}
      </div>

      <div className='flex flex-col gap-5'>
        {eventOrganization && (
          <Typography variant='p2'>
            <IoIosPeople className='inline-block mr-3' /> {eventOrganization}
          </Typography>
        )}
        {startDate && (
          <Typography variant='p2'>
            <BsFillCalendarFill className='inline-block mr-3' /> {startDate}
            {endDate && ` - ${endDate}`}
          </Typography>
        )}
        {startTime && (
          <Typography variant='p2'>
            <FaClock className='inline-block mr-3' /> {startTime}
            {endTime && ` - ${endTime}`}
          </Typography>
        )}
        {description && <Typography variant='p2'>{description}</Typography>}

        {purchaseTime && totalPrice && totalTickets && (
          <div className='flex flex-col gap-2'>
            <hr className='h-px my-2 border-0 bg-gray-300' />
            <Typography variant='b2' color='cyan'>
              Purchase Summary
            </Typography>
            <div className='flex justify-between'>
              <Typography variant='p2' weight='semibold'>
                Purchased on
              </Typography>
              <Typography variant='p2'>{purchaseTime}</Typography>
            </div>
            <div className='flex justify-between'>
              <Typography variant='p2' weight='semibold'>
                Total tickets
              </Typography>
              <Typography variant='p2'>{totalTickets}</Typography>
            </div>
            <div className='flex justify-between'>
              <Typography variant='p2' weight='semibold'>
                Total price
              </Typography>
              <Typography variant='p2'>Rp {totalPrice}</Typography>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
