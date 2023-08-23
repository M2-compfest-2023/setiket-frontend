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
import { categories } from '@/contents/categories';
import Layout from '@/layouts/Layout';

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

  // static data, delete this
  const provinces = [
    { value: 'dki-jakarta', label: 'DKI Jakarta' },
    { value: 'jawa-barat', label: 'Jawa Barat' },
    { value: 'jawa-timur', label: 'Jawa Timur' },
    { value: 'jawa-tengah ', label: 'Jawa Barat' },
  ];
  // const cities = [
  //   {
  //     province: 'jawa-barat',
  //     cities: [
  //       { value: 'bekasi', label: 'Bekasi' },
  //       { value: 'depok', label: 'Depok' },
  //       { value: 'bogor', label: 'Bogor' },
  //     ],
  //   },
  //   {
  //     province: 'dki-jakarta',
  //     cities: [
  //       { value: 'jakarta-barat', label: 'Jakarta Barat' },
  //       { value: 'jakarta-timur', label: 'Jakarta Timur' },
  //       { value: 'jakarta-selatan', label: 'Jakarta Selatan' },
  //     ],
  //   },
  // ];

  const cities_in_selected_province = [{ value: '', label: '' }];

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
              options={provinces}
              labelClassName='text-cyan-600'
            />
            <SearchableSelectInput
              id='city'
              label='City'
              placeholder='Select city'
              options={cities_in_selected_province}
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

            {categories.map((category) => (
              <Checkbox
                key={category.name}
                label={category.name}
                name='category'
                size='sm'
                value={category.name}
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
          <EventCard
            city='Bekasi'
            province='Jawa Barat'
            eventName='Festival Kota'
            ticketPrice='50,000'
            startdate='dd/mm/yyyy'
            starttime='00:00 - 24:00'
            eventId='1'
            className='hover:bg-gray-100'
          />
          <EventCard
            city='Bekasi'
            province='Jawa Barat'
            eventName='Festival Kota'
            ticketPrice='50,000'
            startdate='dd/mm/yyyy'
            starttime='00:00 - 24:00'
            eventId='1'
            className='hover:bg-gray-100'
          />
          <EventCard
            city='Bekasi'
            province='Jawa Barat'
            eventName='Festival Kota'
            ticketPrice='50,000'
            startdate='dd/mm/yyyy'
            starttime='00:00 - 24:00'
            eventId='1'
            className='hover:bg-gray-100'
          />
          <EventCard
            city='Bekasi'
            province='Jawa Barat'
            eventName='Festival Kota'
            ticketPrice='50,000'
            startdate='dd/mm/yyyy'
            starttime='00:00 - 24:00'
            eventId='1'
            className='hover:bg-gray-100'
          />
          <EventCard
            city='Bekasi'
            province='Jawa Barat'
            eventName='Festival Kota'
            ticketPrice='50,000'
            startdate='dd/mm/yyyy'
            starttime='00:00 - 24:00'
            eventId='1'
            className='hover:bg-gray-100'
          />
          <EventCard
            city='Bekasi'
            province='Jawa Barat'
            eventName='Festival Kota'
            ticketPrice='50,000'
            startdate='dd/mm/yyyy'
            starttime='00:00 - 24:00'
            eventId='1'
            className='hover:bg-gray-100'
          />
          <EventCard
            city='Bekasi'
            province='Jawa Barat'
            eventName='Festival Kota'
            ticketPrice='50,000'
            startdate='dd/mm/yyyy'
            starttime='00:00 - 24:00'
            eventId='1'
            className='hover:bg-gray-100'
          />
          <EventCard
            city='Bekasi'
            province='Jawa Barat'
            eventName='Festival Kota'
            ticketPrice='50,000'
            startdate='dd/mm/yyyy'
            starttime='00:00 - 24:00'
            eventId='1'
            className='hover:bg-gray-100'
          />
          <EventCard
            city='Bekasi'
            province='Jawa Barat'
            eventName='Festival Kota'
            ticketPrice='50,000'
            startdate='dd/mm/yyyy'
            starttime='00:00 - 24:00'
            eventId='1'
            className='hover:bg-gray-100'
          />
          <EventCard
            city='Bekasi'
            province='Jawa Barat'
            eventName='Festival Kota'
            ticketPrice='50,000'
            startdate='dd/mm/yyyy'
            starttime='00:00 - 24:00'
            eventId='1'
            className='hover:bg-gray-100'
          />
        </div>
      </div>
    </Layout>
  );
}
