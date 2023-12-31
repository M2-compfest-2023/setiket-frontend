import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineHome } from 'react-icons/ai';

import Button from '@/components/buttons/Button';
import Input from '@/components/form/Input';
import SearchableSelectInput from '@/components/form/SearchableSelectInput';
import PrimaryLink from '@/components/links/PrimaryLink';
import SEO from '@/components/SEO';
import { showToast, SUCCESS_TOAST } from '@/components/Toast';
import Typography from '@/components/Typography';
import { REG_EMAIL, REG_PASSWORD } from '@/constants/regex';
import useMutationToast from '@/hooks/useMutationToast';
import Layout from '@/layouts/Layout';
import api from '@/lib/api';
import AuthIllustration from '@/pages/auth/AuthIllustration';

type RegisterForm = {
  username: string;
  email: string;
  role: string;
  name: string;
  password: string;
  organizationName: string;
};

export default function RegisterPage() {
  const methods = useForm<RegisterForm>({
    mode: 'onTouched',
  });
  const router = useRouter();
  const { handleSubmit } = methods;
  const role = [
    { value: 'customer', label: 'Customer' },
    { value: 'eo', label: 'Event Organizer' },
  ];

  const { mutate: handleRegister, isLoading } = useMutationToast<
    void,
    RegisterForm
  >(
    useMutation(async (data) => {
      if (data.role == 'eo') await api.post(`/auth/register/eo`, data);
      else await api.post(`/auth/register/customer`, data);

      showToast('Berhasil register', SUCCESS_TOAST);
      router.push('/login');
    })
  );

  const onSubmit = (data: RegisterForm) => {
    handleRegister({
      username: data.username,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      organizationName: data.organizationName ?? '',
    });
  };

  const [userRoleVar, setUserRoleVar] = React.useState('');
  const userRole = (role: string) => {
    setUserRoleVar(role);
  };

  return (
    <Layout>
      <SEO title='Register' description='Register Page' />
      <main>
        <section className='flex bg-gradient-to-b from-gradient-500 to-gradient-600'>
          <section className='hidden lg:block md:w-1/2 lg:w-7/12'>
            <AuthIllustration />
          </section>
          <section className='w-screen lg:w-5/12 min-h-screen flex bg-white lg:rounded-l-3xl'>
            <div className='w-10/12 mx-auto py-10'>
              <PrimaryLink href='/' size='medium' variant='primary'>
                <Typography
                  className='text-primary-50 flex items-center'
                  variant='p2'
                >
                  <AiOutlineHome className='mr-2 inline-block' />
                  Back to home
                </Typography>
              </PrimaryLink>
              <div className='mt-4'>
                <Typography variant='h4' font='ubuntu'>
                  Sign Up
                </Typography>
              </div>
              <div className='mt-4'>
                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <Input
                        id='username'
                        label='Username'
                        placeholder='Input Username'
                        validation={{ required: 'Username shouldn`t be empty' }}
                      />
                    </div>
                    <div className='mt-3'>
                      <Input
                        id='name'
                        label='Name'
                        placeholder='Input Name'
                        validation={{
                          required: 'Name shouldn`t be empty',
                          maxLength: {
                            value: 10,
                            message: 'Name cannot exceed 10 characters',
                          },
                        }}
                      />
                    </div>
                    <div className='mt-3'>
                      <Input
                        id='email'
                        label='Email'
                        placeholder='Input Email'
                        helperText='Email must be example@mail.com format'
                        validation={{
                          required: 'Email shouldn`t be empty',
                          pattern: {
                            value: REG_EMAIL,
                            message: 'Email not valid',
                          },
                        }}
                      />
                    </div>
                    <div className='mt-3'>
                      <SearchableSelectInput
                        id='role'
                        label='Role'
                        placeholder='Select Role'
                        validation={{
                          required: 'Role shouldn`t be empty',
                        }}
                        options={role}
                        handleChange={userRole}
                      />
                    </div>
                    {userRoleVar === 'eo' && (
                      <div className='mt-3'>
                        <Input
                          id='organizationName'
                          label='Organization Name'
                          placeholder='Input Organization Name'
                          validation={{
                            required: 'Organization Name shouldn`t be empty',
                          }}
                        />
                      </div>
                    )}
                    <div className='mt-3'>
                      <Input
                        id='password'
                        label='Password'
                        type='password'
                        placeholder='Masukkan Password'
                        helperText='The password must contain a minimum of 8 characters consisting of a combination of uppercase letters, lowercase letters, and numbers.'
                        validation={{
                          required: 'Password shouldn`t be empty',
                          pattern: {
                            value: REG_PASSWORD,
                            message:
                              'The password must contain a minimum of 8 characters consisting of a combination of uppercase letters, lowercase letters, and numbers.',
                          },
                        }}
                      />
                    </div>
                    <Button
                      variant='primary'
                      size='base'
                      className='w-full mt-5'
                      type='submit'
                      isLoading={isLoading}
                    >
                      Submit
                    </Button>
                    <Typography
                      variant='p2'
                      weight='medium'
                      className='mt-4 text-center'
                    >
                      Already have account?{' '}
                      <PrimaryLink
                        href='/login'
                        variant='primary'
                        size='medium'
                      >
                        Login
                      </PrimaryLink>
                    </Typography>
                  </form>
                </FormProvider>
              </div>
            </div>
          </section>
        </section>
      </main>
    </Layout>
  );
}
