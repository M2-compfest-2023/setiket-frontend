import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import { showToast, SUCCESS_TOAST } from '@/components/Toast';
import Typography from '@/components/Typography';
import useMutationToast from '@/hooks/useMutationToast';
import EventDetail from '@/layouts/EventDetail';
import Layout from '@/layouts/Layout';
import Modal from '@/layouts/Modal';
import api from '@/lib/api';
import useAuthStore from '@/store/useAuthStore';
import { ApiReturn } from '@/types/api';
import { Category, Event } from '@/types/entities/event';

type TicketForm = {
  quantity: number;
  event_id: number;
};

type MyEvent = {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  ticket_total: number;
  location: string;
  category_id: number;
  organizer_id: number;
  verified: boolean;
  city_id: number;
  price: number;
};

export default function Detail() {
  const methods = useForm<TicketForm>({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;
  const router = useRouter();
  const user = useAuthStore.useUser();

  const eventId = router.query.id as string;
  const events = useQuery<ApiReturn<Event>>([
    '/events/detail/'.concat(eventId),
  ]);
  const myEvents = useQuery<ApiReturn<MyEvent[]>>(['/events/user/me']);
  const categories = useQuery<ApiReturn<Category[]>>(['/category/']);

  const eventItem = events.data?.data;
  const categoryItem = categories.data?.data?.find(
    (category) => category.id == eventItem?.category_id
  );
  const category_name = categoryItem ? categoryItem.category_name : undefined;

  const [ticketAmount, setTicketAmount] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  const ticketPrice = (eventItem?.price ?? 1) * ticketAmount;

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

  const { mutate: handlePayment, isLoading } = useMutationToast<
    void,
    TicketForm
  >(
    useMutation(async (data) => {
      await api.post(`/ticket/purchase`, data);

      showToast('Berhasil Membeli Tiket', SUCCESS_TOAST);
      router.push('/mytickets');
    })
  );

  const onSubmit = () => {
    handlePayment({
      quantity: ticketAmount,
      event_id: parseInt(eventId),
    });
  };

  const ticketLeft = useQuery<
    ApiReturn<{
      ticket_sold: number;
      ticket_left: number;
    }>
  >([`/events/ticket_left/${eventId}`]);

  return (
    <Layout withNavbar={true} withFooter={true}>
      <div className='flex flex-col md:flex-row px-4 md:px-10 py-4 min-h-screen gap-5'>
        <div className='md:w-[70%]'>
          <EventDetail content={eventProps} />
        </div>

        {/* role customer */}
        {user?.role === 'CUSTOMER' && (
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
                Rp. {ticketPrice}
              </Typography>
              <Button onClick={() => setIsVisible(!isVisible)}>Book Now</Button>
            </div>
          </div>
        )}

        {/* role EVENTORGANIZER */}
        {user?.role === 'EVENTORGANIZER' &&
          myEvents.data?.data?.find(
            (event) => event.id == parseInt(eventId)
          ) && (
            <div className='flex flex-col gap-3 w-[30%] items-center justify-center bg-white rounded-2xl shadow-xl h-[200px] p-5'>
              <Typography variant='b2' weight='semibold' className='mx-auto'>
                Sales Data
              </Typography>
              <Typography
                variant='p2'
                weight='semibold'
                className='mx-auto'
                color='cyan'
              >
                {ticketLeft.data?.data?.ticket_sold ?? 0} Tickets Sold
              </Typography>
              <Typography
                variant='p2'
                weight='semibold'
                className='mx-auto'
                color='cyan'
              >
                {ticketLeft.data?.data?.ticket_left ?? 0} Tickets Left
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
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='relative z-[110]'>
              {isVisible && (
                <Modal className='flex flex-col'>
                  <div className='md:w-[40%] bg-white rounded-xl px-8 py-5'>
                    <Typography
                      className='text-center'
                      variant='p1'
                      weight='semibold'
                      font='inter'
                      color='cyan'
                    >
                      Do you want to proceed with purchasing the event tickets?
                    </Typography>
                    <div className='flex justify-evenly mt-5'>
                      <Button
                        variant='danger'
                        onClick={() => setIsVisible(!isVisible)}
                      >
                        No
                      </Button>
                      <Button type='submit' isLoading={isLoading}>
                        Yes
                      </Button>
                    </div>
                  </div>
                </Modal>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </Layout>
  );
}
