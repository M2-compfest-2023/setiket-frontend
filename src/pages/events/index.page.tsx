import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BsSearch } from 'react-icons/bs';
import { FaFilter } from 'react-icons/fa';

import Button from '@/components/buttons/Button';
import EventCard from '@/components/cards/EventCard';
import Checkbox from '@/components/form/Checkbox';
import Datepicker from '@/components/form/Datepicker';
import Input from '@/components/form/Input';
import SearchableSelectInput from '@/components/form/SearchableSelectInput';
import SEO from '@/components/SEO';
import Typography from '@/components/Typography';
import Layout from '@/layouts/Layout';
import api from '@/lib/api';
import { ApiReturn } from '@/types/api';
import { Event } from '@/types/entities/event';

type SearchForm = {
  keyword: string;
};

type FilterForm = {
  province: string;
  city: string;
  category: string;
  startdate: string;
  enddate: string;
};

export default function Events() {
  // search bar
  const searchMethod = useForm<SearchForm>({
    mode: 'onTouched',
  });

  const filterMethod = useForm<FilterForm>({
    mode: 'onTouched',
  });

  const category = useQuery<ApiReturn<{ id: string; category_name: string }[]>>(
    ['/category']
  );

  const province = useQuery<ApiReturn<{ id: string; name: string }[]>>([
    '/location/province',
  ]);

  const [kabupaten, setKabupaten] = useState<
    { id: string; name: string }[] | undefined
  >(undefined);

  const getKabupaten = (provinsiId: string) => {
    api
      .get<ApiReturn<{ id: string; name: string }[]>>(
        `/location/city/${provinsiId}`
      )
      .then((res) => {
        setKabupaten(res.data.data);
      });
  };

  const events = useQuery<ApiReturn<Event[]>>(['/events']);

  return (
    <Layout withNavbar={true} withFooter={true}>
      <SEO title='Events' description='Events Page' />

      <div className='flex justify-end p-7'>
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

      <div className='flex px-5 mb-10'>
        <div className='w-[20%] pr-5'>
          <Typography
            className='my-1 sm:my-5 text-cyan-700'
            variant='p2'
            weight='semibold'
            font='inter'
          >
            <FaFilter className='inline-block' /> Filter
          </Typography>

          <FormProvider {...filterMethod}>
            <Typography
              className='my-1 sm:my-2 text-cyan-700'
              variant='p2'
              weight='semibold'
              font='inter'
            >
              Location
            </Typography>

            <SearchableSelectInput
              id='province'
              label='Province'
              placeholder='Select province'
              handleChange={getKabupaten}
              options={
                province.data?.data?.map((prov) => ({
                  value: prov.id,
                  label: prov.name,
                })) || []
              }
              labelClassName='text-cyan-600'
            />
            <SearchableSelectInput
              id='city'
              label='City'
              placeholder='Select city'
              options={
                kabupaten?.map((kab) => ({
                  value: kab.id,
                  label: kab.name,
                })) || []
              }
              labelClassName='text-cyan-600'
            />

            <hr className='h-px my-3 border-0 bg-gray-300' />

            <Typography
              className='my-1 sm:my-2 text-cyan-700'
              variant='p2'
              weight='semibold'
              font='inter'
            >
              Category
            </Typography>

            {category.data?.data?.map((cat) => (
              <Checkbox
                key={cat.category_name}
                label={cat.category_name}
                name='category'
                size='sm'
                value={cat.category_name}
                labelClassName='text-cyan-800'
              />
            ))}

            <hr className='h-px my-3 border-0 bg-gray-300' />

            <Typography
              className='my-1 sm:my-2 text-cyan-700'
              variant='p2'
              weight='semibold'
              font='inter'
            >
              Date
            </Typography>

            <div>
              <Datepicker
                label='Start Date'
                labelClassName='text-cyan-600'
                id='startdate'
              />
              <Datepicker
                label='End Date'
                labelClassName='text-cyan-600'
                id='enddate'
              />
            </div>

            <hr className='h-px my-3 border-0 bg-gray-300' />

            <Button size='sm' variant='danger'>
              Clear all
            </Button>
          </FormProvider>
        </div>

        <div className='w-[80%] grid grid-cols-3 gap-x-3 gap-y-5 place-content-start'>
          {events.data?.data
            ?.filter((event) => event.verified === true) // Filter events where verified is true
            .slice(0, 5) // Limit to a maximum of 5 events
            .map((event) => (
              <EventCard
                key={event.id}
                eventName={event.title}
                startDate={event.start_date.substring(0, 10)}
                endDate={event.end_date.substring(0, 10)}
                startTime={event.start_date.substring(11, 16)}
                endTime={event.end_date.substring(11, 16)}
                link={`/events/detail/${event.id}`}
                ticketPrice={event.price}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
}
