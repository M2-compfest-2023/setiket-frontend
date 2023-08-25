import { useMutation, useQuery } from '@tanstack/react-query';
import router from 'next/router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FaBackward } from 'react-icons/fa';

import Button from '@/components/buttons/Button';
import Datepicker from '@/components/form/Datepicker';
import Input from '@/components/form/Input';
import SearchableSelectInput from '@/components/form/SearchableSelectInput';
import TextArea from '@/components/form/TextArea';
import PrimaryLink from '@/components/links/PrimaryLink';
import { DANGER_TOAST, showToast, SUCCESS_TOAST } from '@/components/Toast';
import Typography from '@/components/Typography';
import useDialog from '@/hooks/useDialog';
import useMutationToast from '@/hooks/useMutationToast';
import Layout from '@/layouts/Layout';
import api from '@/lib/api';
import { ApiReturn } from '@/types/api';

type AddEventForm = {
  title: string;
  category_id: number;
  city_id: number;
  start_date: string;
  end_date: string;
  description: string;
  ticket_total: number;
  location: string;
  price: number;
};

export default function AddEvent() {
  const category = useQuery<ApiReturn<{ id: string; category_name: string }[]>>(
    ['/category']
  );

  const provinsi = useQuery<ApiReturn<{ id: string; name: string }[]>>([
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

  const searchMethod = useForm<AddEventForm>({
    mode: 'onTouched',
  });
  const { handleSubmit } = searchMethod;
  const dialog = useDialog();

  const { mutate: handleRegister, isLoading } = useMutationToast<
    void,
    AddEventForm
  >(
    useMutation(async (data) => {
      await api.post(`/events`, data);
    })
  );

  const onSubmit = (data: AddEventForm) => {
    const y = parseInt(data.ticket_total.toString());
    data.ticket_total = y;
    const x = parseInt(data.price.toString());
    data.price = x;
    dialog({
      title: 'Pastikan Informasi yang Anda Isi Benar',
      description:
        'Apakah Anda yakin bahwa informasi yang Anda isi sudah benar?',
      submitText: 'Sudah Benar',
    }).then(() =>
      handleRegister(data, {
        onSuccess: () => {
          showToast('Berhasil membuat event', SUCCESS_TOAST);
          router.push('/myevents');
        },
        onError: () => {
          showToast('Periksa kembali data yang anda masukkan', DANGER_TOAST);
        },
      })
    );
  };

  return (
    <Layout withFooter withNavbar>
      <div className='mt-6'>
        <PrimaryLink
          href='/myevents'
          size='medium'
          variant='primary'
          className='w-1/4 mt-4 mx-4 sm:mx-10'
        >
          <Typography variant='p2' className='text-primary-50' weight='medium'>
            <FaBackward className='mr-2 inline-block' />
            Back to My Events page
          </Typography>
        </PrimaryLink>
        <div className='flex items-center justify-center flex-col gap-4 mx-4 sm:mx-10 my-8'>
          <Typography variant='h4' font='ubuntu' color='cyan'>
            Event Form
          </Typography>

          <FormProvider {...searchMethod}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col gap-3 w-[50%]'
            >
              <Input
                id='title'
                placeholder='Event Name'
                label='Event Name'
                required
              />

              <SearchableSelectInput
                id='category_id'
                label='Category'
                placeholder='Select category'
                options={
                  category.data?.data.map((res) => ({
                    value: res.id,
                    label: res.category_name,
                  })) || []
                }
                required
              />

              <Typography variant='b3'>Location</Typography>

              <div className='flex gap-5'>
                <SearchableSelectInput
                  id='province'
                  label='Province'
                  placeholder='Select province'
                  handleChange={getKabupaten}
                  options={
                    provinsi.data?.data?.map((prov) => ({
                      value: prov.id,
                      label: prov.name,
                    })) || []
                  }
                  containerClassName='w-[50%]'
                  required
                />

                <SearchableSelectInput
                  id='city_id'
                  label='City'
                  placeholder='Select city'
                  options={
                    kabupaten?.map((kab) => ({
                      value: kab.id,
                      label: kab.name,
                    })) || []
                  }
                  containerClassName='w-[50%]'
                  required
                />
              </div>
              <Input
                id='location'
                placeholder='Location'
                label='Event Location'
                required
              />

              <Typography variant='b3'>Date and Time</Typography>

              <div className='flex gap-5'>
                <Datepicker label='Start Date' id='start_date' required />
                <Datepicker label='End Date' id='end_date' />
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
                id='ticket_total'
                label='Ticket Provided'
                type='number'
                required
              />

              <Input id='price' label='Ticket Price' type='number' required />

              <Button type='submit' isLoading={isLoading}>
                Submit
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </Layout>
  );
}
