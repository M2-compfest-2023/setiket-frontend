import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { BsSearch } from 'react-icons/bs';

import EventCard from '@/components/cards/EventCard';
import IconCard from '@/components/cards/IconCard';
import Input from '@/components/form/Input';
import Layout from '@/layouts/Layout';
import { ApiReturn } from '@/types/api';

type SearchForm = {
  keyword: string;
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

export default function MyEvents() {
  const router = useRouter();
  // search bar
  const searchMethod = useForm<SearchForm>({
    mode: 'onTouched',
  });

  const myEvents = useQuery<ApiReturn<MyEvent[]>>(['/events/user/me']);

  return (
    <Layout withNavbar={true} withFooter={true}>
      <div className='min-h-screen'>
        <div className='flex justify-end px-10 py-5'>
          <FormProvider {...searchMethod}>
            <form action=''>
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
              startDate={event.start_date}
              eventId={event.id}
              size='sm'
              buttonText='See detail'
              buttonOnClik={() => router.push('/events/detail/'.concat('1'))}
            />
          ))}

          <IconCard
            Icon={BsFillPlusCircleFill}
            link='/myevents/add'
            className='hover:shadow-xl'
            // text='Add event'
            size='sm'
          />
        </div>
      </div>
    </Layout>
  );
}
