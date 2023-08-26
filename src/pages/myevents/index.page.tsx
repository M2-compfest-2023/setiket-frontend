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

  const searchKeyword = searchMethod.watch().keyword;

  const myEvents = useQuery<ApiReturn<MyEvent[]>>(['/events/user/me']);

  return (
    <Layout withNavbar={true} withFooter={true}>
      <div className='min-h-screen'>
        <div className='md:flex md:justify-end px-10 py-5'>
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
          className='px-4 sm:px-10 md:grid md:grid-cols-4 md:gap-x-3 md:gap-y-5 md:place-content-start'
          id='events'
        >
          {myEvents.data?.data.map(
            (event) =>
              event.title.includes(searchKeyword) && (
                <EventCard
                  key={event.id}
                  eventName={event.title}
                  startDate={event.start_date}
                  eventId={event.id}
                  verified={event.verified}
                  showVerified
                  size='sm'
                  buttonText='See detail'
                  buttonOnClik={() => router.push(`/events/detail/${event.id}`)}
                />
              )
          )}

          <IconCard
            Icon={BsFillPlusCircleFill}
            link='/myevents/add'
            className='hover:shadow-xl'
            text='Add event'
            size='sm'
          />
        </div>
      </div>
    </Layout>
  );
}
