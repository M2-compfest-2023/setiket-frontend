import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import Typography from '@/components/Typography';
import EventDetail from '@/layouts/EventDetail';
import Layout from '@/layouts/Layout';
import Modal from '@/layouts/Modal';
import { getToken } from '@/lib/cookies';
import useAuthStore from '@/store/useAuthStore';
import { ApiReturn } from '@/types/api';
import { Category, Event } from '@/types/entities/event';

export default function Detail() {
  const token = getToken();
  const router = useRouter();
  const user = useAuthStore.useUser();

  const eventId = router.query.id as string;
  const events = useQuery<ApiReturn<Event>>(['/events/'.concat(eventId)]);
  const categories = useQuery<ApiReturn<Category[]>>(['/category/']);

  const eventItem = events.data?.data;
  const categoryItem = categories.data?.data?.find(
    (category) => category.id == eventItem?.category_id
  );
  const category_name = categoryItem ? categoryItem.category_name : undefined;

  const [ticketAmount, setTicketAmount] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  const ticketPrice = eventItem?.price;
  const eventProps = {
    eventName: eventItem?.title,
    eventCategory: category_name,
    province: eventItem?.province,
    city: eventItem?.city,
    location: eventItem?.location,
    startDate: eventItem?.start_date.substring(0, 10),
    endDate: eventItem?.end_date.substring(0, 10),
    startTime: eventItem?.start_date.substring(11, 16),
    endTime: eventItem?.end_date.substring(11, 16),
    description: eventItem?.description,
  };

  return (
    <Layout withNavbar={true} withFooter={true}>
      <div className='flex flex-col md:flex-row px-4 md:px-10 py-4 min-h-screen gap-5'>
        <div className='md:w-[70%]'>
          <EventDetail content={eventProps} />
        </div>

        {/* role customer */}
        {(!token || user?.role === 'CUSTOMER') && (
          <div className='flex flex-col md:w-[30%] items-center bg-white rounded-2xl shadow-xl h-[200px] p-5'>
            <Typography variant='b2' weight='semibold' className='mx-auto'>
              Buy Ticket
            </Typography>
            <div className='flex items-center gap-3 w-full justify-center mt-4 mb-2'>
              <IconButton
                variant='secondary'
                size='base'
                className='rounded-full border-0'
                iconClassName='font-bold text-white'
                icon={AiOutlineMinus}
                onClick={() => setTicketAmount(ticketAmount - 1)}
                disabled={ticketAmount <= 1}
              />
              <Typography variant='p1' color='cyan'>
                {ticketAmount}
              </Typography>
              <IconButton
                variant='secondary'
                size='base'
                className='rounded-full border-0'
                iconClassName='font-bold text-white'
                icon={AiOutlinePlus}
                onClick={() => setTicketAmount(ticketAmount + 1)}
              />
            </div>
            <div className='flex items-center gap-3 w-full justify-between my-4'>
              <Typography variant='b1' color='cyan'>
                Rp {ticketPrice}
              </Typography>
              <Button onClick={() => setIsVisible(!isVisible)}>Book Now</Button>
            </div>
          </div>
        )}

        {/* role EVENTORGANIZER */}
        {user?.role === 'EVENTORGANIZER' && (
          <div className='flex flex-col gap-3 md:w-[30%] items-center justify-center bg-white rounded-2xl shadow-xl h-[160px] p-5'>
            <Typography variant='b2' weight='semibold' className='mx-auto'>
              Sales Data
            </Typography>
            <Typography
              variant='p2'
              weight='semibold'
              className='mx-auto'
              color='cyan'
            >
              50 tickets sold
            </Typography>
            <Button onClick={() => router.push('/events/salesData/1')}>
              See detail
            </Button>
          </div>
        )}

        {/* role admin */}
        {user?.role === 'ADMIN' && (
          <div className='flex flex-col md:w-[30%] items-center justify-center bg-white rounded-2xl shadow-xl h-[120px] p-5'>
            <Typography variant='p2' weight='semibold' className='mx-auto'>
              Event Approval
            </Typography>
            <div className='flex items-center gap-3 w-full justify-center my-4'>
              <Button size='sm' variant='secondary'>
                Reject
              </Button>
              <Button size='sm'>Approve</Button>
            </div>
          </div>
        )}

        <div className='relative z-[110]'>
          {isVisible && (
            <Modal className='flex flex-col'>
              <div className='w-full md:w-[40%] bg-white rounded-xl px-8 py-5'>
                <Typography
                  className='text-center'
                  variant='p1'
                  weight='semibold'
                  font='inter'
                  color='cyan'
                >
                  Do you want to proceed with purchasing the event tickets?
                </Typography>
                <div className='flex justify-evenly mt-5 gap-5'>
                  <Button
                    variant='danger'
                    onClick={() => setIsVisible(!isVisible)}
                    className='w-full rounded-xl'
                  >
                    No
                  </Button>
                  <Button className='w-full rounded-xl'>Yes</Button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </Layout>
  );
}
