import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { BsSearch } from 'react-icons/bs';

import EventCard from '@/components/cards/EventCard';
import IconCard from '@/components/cards/IconCard';
import Input from '@/components/form/Input';
import Layout from '@/layouts/Layout';

type SearchForm = {
  keyword: string;
};

export default function MyEvents() {
  const router = useRouter();
  // search bar
  const searchMethod = useForm<SearchForm>({
    mode: 'onTouched',
  });

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
          <EventCard
            eventName='Festival Kota'
            startdate='dd/mm/yyyy'
            starttime='00:00 - 24:00'
            eventId='1'
            size='sm'
            buttonText='See detail'
            buttonOnClik={() => router.push('/events/detail/'.concat('1'))}
          />
          <EventCard
            eventName='Festival Kota'
            startdate='dd/mm/yyyy'
            starttime='00:00 - 24:00'
            eventId='1'
            size='sm'
            buttonText='See detail'
            buttonOnClik={() => router.push('/events/detail/'.concat('1'))}
          />
          <EventCard
            eventName='Festival Kota'
            startdate='dd/mm/yyyy'
            starttime='00:00 - 24:00'
            eventId='1'
            size='sm'
            buttonText='See detail'
            buttonOnClik={() => router.push('/events/detail/'.concat('1'))}
          />

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
