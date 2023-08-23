import { FaBackward } from 'react-icons/fa';
import { FormProvider, useForm } from 'react-hook-form';

import Layout from '@/layouts/Layout';
import PrimaryLink from '@/components/links/PrimaryLink';
import Button from '@/components/buttons/Button';
import Typography from '@/components/Typography';

import Input from '@/components/form/Input';
import TextArea from '@/components/form/TextArea';
import Datepicker from '@/components/form/Datepicker';
import SearchableSelectInput from '@/components/form/SearchableSelectInput';

import { categories } from '@/contents/categories';

type AddEventForm = {
  eventName: string;
  category: string;
  province: string;
  city: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  description: string;
  ticketProvided: number;
};

export default function AddEvent() {
  const categorySelect = categories.map((category) => ({
    value: category.href,
    label: category.name,
  }));

  const searchMethod = useForm<AddEventForm>({
    mode: 'onTouched',
  });

  //static data, delete this
  const provinces = [
    { value: 'dki-jakarta', label: 'DKI Jakarta' },
    { value: 'jawa-barat', label: 'Jawa Barat' },
    { value: 'jawa-timur', label: 'Jawa Timur' },
    { value: 'jawa-tengah ', label: 'Jawa Barat' },
  ];
  const cities_in_selected_province = [{ value: '', label: '' }];

  return (
    <Layout withFooter={true}>
      <div className='flex flex-col gap-4 mx-4 sm:mx-10 my-8 min-h-screen'>
        <PrimaryLink
          href='/'
          size='medium'
          variant='primary'
          className='justify-start'
        >
          <Typography variant='p2' className='text-primary-50' weight='medium'>
            <FaBackward className='mr-2 inline-block' />
            Back to My Events page
          </Typography>
        </PrimaryLink>

        <Typography variant='h4' font='ubuntu' color='cyan'>
          Event Form
        </Typography>

        <FormProvider {...searchMethod}>
          <form action='' className='flex flex-col gap-3 w-[50%]'>
            <Input
              id='keyword'
              placeholder='Event Name'
              label='Event Name'
              required
            />

            <SearchableSelectInput
              id='category'
              label='Category'
              placeholder='Select category'
              options={categorySelect}
              required
            />

            <Typography variant='b3'>Location</Typography>

            <div className='flex gap-5'>
              <SearchableSelectInput
                id='province'
                label='Province'
                placeholder='Select province'
                options={provinces}
                containerClassName='w-[50%]'
                required
              />

              <SearchableSelectInput
                id='city'
                label='City'
                placeholder='Select city'
                options={cities_in_selected_province}
                containerClassName='w-[50%]'
                required
              />
            </div>

            <Typography variant='b3'>Datetime</Typography>

            <div className='flex gap-5'>
              <Datepicker label='Start Date' id='startdate' required />
              <Input id='startTime' label='Start Time' type='time' required />
            </div>
            <div className='flex gap-5'>
              <Datepicker label='End Date' id='enddate' />
              <Input id='endTime' label='End Time' type='time' />
            </div>

            <TextArea
              id='description'
              label='Description'
              placeholder='Write event description here'
              className='focus:ring-black'
              maxLength={512}
              required
            />

            <Input
              id='ticketProvided'
              label='Ticket Provided'
              type='number'
              required
            />

            <Button type='submit'>Submit</Button>
          </form>
        </FormProvider>
      </div>
    </Layout>
  );
}
