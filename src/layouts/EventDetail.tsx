import { MouseEventHandler } from 'react';
import { IconType } from 'react-icons';
import { BsFillCalendarFill } from 'react-icons/bs';
import { FaClock, FaRegMap } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';

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
  content,
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
        {content.content.eventName && (
          <Typography variant='h3' font='ubuntu' color='cyan'>
            {content.content.eventName}
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
        {content.content.eventCategory && (
          <Chips>{content.content.eventCategory}</Chips>
        )}

        {content.content.city && (
          <Typography variant='p2' color='secondary'>
            <FaRegMap className='inline-block' /> {content.content.province},{' '}
            {content.content.city}
          </Typography>
        )}
      </div>

      <div className='flex flex-col gap-5'>
        {content.content.eventOrganization && (
          <Typography variant='p2'>
            <IoIosPeople className='inline-block mr-3' />{' '}
            {content.eventOrganization}
          </Typography>
        )}
        {content.content.startDate && (
          <Typography variant='p2'>
            <BsFillCalendarFill className='inline-block mr-3' />{' '}
            {content.startDate}
            {content.endDate && ` - ${content.endDate}`}
          </Typography>
        )}
        {content.content.startTime && (
          <Typography variant='p2'>
            <FaClock className='inline-block mr-3' />{' '}
            {content.content.startTime}
            {content.content.endTime && ` - ${content.content.endTime}`}
          </Typography>
        )}
        {content.content.description && (
          <Typography variant='p2'>{content.content.description}</Typography>
        )}

        {content.content.purchaseTime &&
          content.content.totalPrice &&
          content.content.totalTickets && (
            <div className='flex flex-col gap-2'>
              <hr className='h-px my-2 border-0 bg-gray-300' />
              <Typography variant='b2' color='cyan'>
                Purchase Summary
              </Typography>
              <div className='flex justify-between'>
                <Typography variant='p2' weight='semibold'>
                  Purchased on
                </Typography>
                <Typography variant='p2'>
                  {content.content.purchaseTime}
                </Typography>
              </div>
              <div className='flex justify-between'>
                <Typography variant='p2' weight='semibold'>
                  Total tickets
                </Typography>
                <Typography variant='p2'>
                  {content.content.totalTickets}
                </Typography>
              </div>
              <div className='flex justify-between'>
                <Typography variant='p2' weight='semibold'>
                  Total price
                </Typography>
                <Typography variant='p2'>
                  Rp {content.content.totalPrice}
                </Typography>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
