import { MouseEventHandler } from 'react';
import { IconType } from 'react-icons';
import { BsFillCalendarFill } from 'react-icons/bs';
import { FaClock, FaRegMap } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import { MdLocationPin } from 'react-icons/md';

import IconButton from '@/components/buttons/IconButton';
import Chips from '@/components/Chips';
import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

export type CardProps = {
  content: {
    eventName?: string;
    eventCategory?: string;
    province?: string;
    city?: string;
    eventOrganization?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
    description?: string;
    purchaseTime?: string;
    totalTickets?: number;
    totalPrice?: string;
  };
  className?: string;
  iconButton?: IconType;
  iconButtonOnClick?: MouseEventHandler;
};

export default function EventDetail({
  content,
  className,
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
        {content.eventName && (
          <Typography variant='h3' font='ubuntu' color='cyan'>
            {content.eventName}
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
        {content.eventCategory && <Chips>{content.eventCategory}</Chips>}

        {content.city && (
          <Typography variant='p2' color='secondary'>
            <FaRegMap className='inline-block' /> {content.province},{' '}
            {content.city}
          </Typography>
        )}
      </div>

      <div className='flex flex-col gap-5'>
        {content.eventOrganization && (
          <Typography variant='p2'>
            <IoIosPeople className='inline-block mr-3' />{' '}
            {content.eventOrganization}
          </Typography>
        )}
        {content.location && (
          <Typography variant='p2'>
            <MdLocationPin className='inline-block mr-3' /> {content.location}
          </Typography>
        )}
        {content.startDate && (
          <Typography variant='p2'>
            <BsFillCalendarFill className='inline-block mr-3' />{' '}
            {content.startDate}
            {content.endDate && ` until ${content.endDate}`}
          </Typography>
        )}
        {content.startTime && (
          <Typography variant='p2'>
            <FaClock className='inline-block mr-3' /> {content.startTime}
            {content.endTime && ` - ${content.endTime}`}
          </Typography>
        )}
        {content.description && (
          <Typography variant='p2'>{content.description}</Typography>
        )}

        {content.purchaseTime && content.totalPrice && content.totalTickets && (
          <div className='flex flex-col gap-2'>
            <hr className='h-px my-2 border-0 bg-gray-300' />
            <Typography variant='b2' color='cyan'>
              Purchase Summary
            </Typography>
            <div className='flex justify-between'>
              <Typography variant='p2' weight='semibold'>
                Purchased on
              </Typography>
              <Typography variant='p2'>{content.purchaseTime}</Typography>
            </div>
            <div className='flex justify-between'>
              <Typography variant='p2' weight='semibold'>
                Total tickets
              </Typography>
              <Typography variant='p2'>{content.totalTickets}</Typography>
            </div>
            <div className='flex justify-between'>
              <Typography variant='p2' weight='semibold'>
                Total price
              </Typography>
              <Typography variant='p2'>Rp {content.totalPrice}</Typography>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
