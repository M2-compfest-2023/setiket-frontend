import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BsSearch, BsXCircleFill } from 'react-icons/bs';

import EventCard from '@/components/cards/EventCard';
import Input from '@/components/form/Input';
import EventDetail from '@/layouts/EventDetail';
import Layout from '@/layouts/Layout';
import Modal from '@/layouts/Modal';
import { ApiReturn } from '@/types/api';
import { Event } from '@/types/entities/event';

type SearchForm = {
  keyword: string;
};

export default function MyTickets() {
  // search bar
  const searchMethod = useForm<SearchForm>({
    mode: 'onTouched',
  });

  const myEvents = useQuery<ApiReturn<Event[]>>(['/events/user/me']);

  const [isVisible, setIsVisible] = useState(false);
  const [eventContent, setEventContent] = useState({});

  // Function to toggle visibility and fill detail event content
  const toggleVisibility = (eventName?: Event) => {
    setEventContent({
      eventName: eventName?.title,
      eventCategory: eventName?.category_id,
      province: eventName?.city_id,
      city: eventName?.city_id,
      startDate: eventName?.start_date.substring(0, 10),
      endDate: eventName?.end_date.substring(0, 10),
      startTime: eventName?.start_date.substring(11, 16),
      endTime: eventName?.end_date.substring(11, 16),
      description: eventName?.description,
      purchaseTime: eventName?.created_at,
      totalTickets: eventName?.ticket_total,
      totalPrice: eventName?.price,
    });
    setIsVisible(!isVisible);
  };

  return (
    <Layout withNavbar={true} withFooter={true}>
      <div className='min-h-screen'>
        <div className='flex justify-end px-10 py-5 w-full'>
          <FormProvider {...searchMethod}>
            <form action='' className='flex gap-5 items-center'>
              <Input
                id='keyword'
                placeholder='search event name'
                leftIcon={BsSearch}
              />
            </form>
          </FormProvider>
        </div>

        <div
          className='px-4 sm:px-10 grid grid-cols-4 gap-x-3 gap-y-5 place-content-start'
          id='events'
        >
          {myEvents.data?.data.map((event) => (
            <EventCard
              key={event.id}
              eventName={event.title}
              startdate={event.start_date}
              eventId='1'
              size='sm'
              buttonText='See detail'
              buttonOnClik={() => toggleVisibility(event)}
            />
          ))}
        </div>
      </div>

      <div className='relative z-[110]'>
        {isVisible && (
          <Modal>
            <EventDetail
              className='w-[70%] h-[80vh] overflow-y-scroll no-scrollbar'
              content={eventContent}
              iconButton={BsXCircleFill}
              iconButtonOnClick={() => toggleVisibility()}
            />
          </Modal>
        )}
      </div>
    </Layout>
  );
}
