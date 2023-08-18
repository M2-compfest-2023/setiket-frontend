import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import Input from '@/components/form/Input';
import Typography from '@/components/Typography';
import useMutationToast from '@/hooks/useMutationToast';
import api from '@/lib/api';

export default function ToastPage() {
  const [data, setData] = React.useState();
  const methods = useForm<{ email: string; password: string }>();
  const { handleSubmit } = methods;

  const { mutate: handleLogin, isLoading } = useMutationToast<
    void,
    { email: string; password: string }
  >(
    useMutation(async (data) => {
      const res = await api.post('/login_user', data);
      const { token } = res.data.data;
      // eslint-disable-next-line no-console
      console.log(token);

      const user = await api.get('/province');

      setData(user.data.data);
    })
  );
  const onSubmit = (data: { email: string; password: string }) => {
    handleLogin({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className='layout mt-4'>
      <Typography variant='h1' as='h1' font='ubuntu'>
        Toast
      </Typography>
      <div className='grid grid-cols-2 gap-x-5'>
        <div className='flex'>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
              <Input id='email' label='Email' placeholder='Masukkan nama' />
              <Input
                id='password'
                label='Password'
                placeholder='Masukkan nama'
              />
              <div className='pt-4'>
                <Button type='submit' variant='success' isLoading={isLoading}>
                  Submit
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
        <div>
          <Typography variant='p' as='p' font='ubuntu'>
            /Me
          </Typography>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
