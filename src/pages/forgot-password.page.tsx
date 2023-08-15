import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import Input from '@/components/form/Input';
import withAuth from '@/components/hoc/withAuth';
import UnstyledLink from '@/components/links/UnstyledLink';
import SEO from '@/components/SEO';
import Typography from '@/components/Typography';
import { REG_EMAIL } from '@/constants/regex';
import useMutationToast from '@/hooks/useMutationToast';
import Layout from '@/layouts/Layout';
import api from '@/lib/api';
import {
  ForgotPassword,
  ForgotPasswordRequest,
} from '@/types/entities/forgot-password';
import { ExtractTypeForm } from '@/types/helper';

export default withAuth(ForgotPasswordPage, 'public');
function ForgotPasswordPage() {
  // Query methods
  const router = useRouter();
  const { token } = router.query;

  // Form methods
  const methods =
    useForm<ExtractTypeForm<ForgotPassword, ForgotPasswordRequest>>();
  const { handleSubmit } = methods;
  const [email, setEmail] = useState('');

  // Request Token Change Password
  const {
    mutate: requestForgotPassword,
    isLoading: requestForgotPasswordLoading,
  } = useMutationToast<void, ForgotPasswordRequest>(
    useMutation((data) => {
      return api.post('/forgot_password/request', data);
    })
  );

  const reqForgotPassword = (_data: ForgotPasswordRequest) => {
    const data = {
      email: _data.email,
    } as ForgotPasswordRequest;

    requestForgotPassword(data, {
      onSuccess: () => setEmail(data.email),
    });
  };
  // End Request Token Change Password

  // Change Password
  const { mutate: changePassword, isLoading: changePasswordisLoading } =
    useMutationToast<void, ForgotPassword>(
      useMutation((data) => {
        return api.post('/forgot_password/change', data);
      })
    );

  const onChangePassword = (_data: ForgotPassword) => {
    const data = {
      password: _data.password,
      re_password: _data.re_password,
      token,
    } as ForgotPassword;
    changePassword(data, {
      onSuccess: () => setTimeout(() => router.replace('/login'), 1000),
    });
  };
  // End Change Password
  return (
    <Layout withNavbar={false} withFooter={false}>
      <SEO title='Forgot Password' />
      <main>
        <section className='font-secondary min-h-screen items-stretch'>
          {/* Illustration Section */}
          <div className='hidden md:block w-7/12'>
            {/* <AuthIllustration /> */}
          </div>
          <div className='flex min-h-screen w-full items-center justify-center bg-white px-4 py-16 md:float-right md:w-5/12 md:min-w-[400px] md:p-16'>
            {token && (
              <FormProvider {...methods}>
                {/* Form view */}
                <form
                  onSubmit={handleSubmit(onChangePassword)}
                  className='flex w-full flex-col space-y-7'
                >
                  <div className='flex w-full flex-col'>
                    <Typography
                      variant='h5'
                      font='atmospheric'
                      className='font-semibold'
                    >
                      Atur Ulang Kata Sandi
                    </Typography>
                  </div>

                  <div className='flex w-full flex-col space-y-4'>
                    <Input
                      id='password'
                      label='Password'
                      placeholder='Masukkan Password Baru'
                      validation={{
                        required: 'Password wajib diisi',
                      }}
                    />
                  </div>
                  <div className='flex w-full flex-col space-y-4'>
                    <Input
                      id='re_password'
                      label='Konfirmasi Passowrd'
                      placeholder='Konfirmasi Password Baru'
                      validation={{
                        required: 'Konfirmasi Password wajib diisi',
                      }}
                    />
                  </div>

                  <div className='flex flex-col space-y-4'>
                    <Button
                      type='submit'
                      variant='primary'
                      size='base'
                      className='py-3'
                      isLoading={changePasswordisLoading}
                    >
                      Ubah Kata Sandi
                    </Button>
                  </div>
                </form>
              </FormProvider>
            )}
            {!token && email && (
              <div className='flex w-full flex-col space-y-10'>
                {/* Activate account view */}
                <div className='flex flex-col'>
                  <Typography
                    variant='h2'
                    font='atmospheric'
                    className='font-semibold'
                  >
                    Periksa Email Anda
                  </Typography>
                  <Typography variant='p' className='mt-2 font-medium'>
                    Anda akan menerima tautan di email yang Anda berikan dan
                    memungkinkan Anda mengatur ulang kata sandi akun Anda.
                  </Typography>
                  <Typography variant='p' className='mt-4 font-bold'>
                    {email}
                  </Typography>
                  <Typography variant='p' className='mt-4 font-medium'>
                    Jika Anda tidak melihat email tersebut, periksa tempat lain
                    yang mungkin ada, seperti folder sampah, spam, sosial, atau
                    lainnya.
                  </Typography>
                </div>
                <div className='flex flex-col items-center justify-center space-y-4'>
                  <div className='flex flex-row justify-center space-x-2'>
                    <Typography variant='p'>Kembali ke</Typography>
                    <button onClick={() => setEmail('')}>
                      <Typography
                        variant='p'
                        className='font-semibold text-primary-50 underline underline-offset-2 hover:text-primary-60'
                      >
                        Atur Ulang Kata Sandi
                      </Typography>
                    </button>
                    <Typography variant='p'>atau</Typography>
                    <Typography variant='p'>
                      <UnstyledLink
                        href='/login'
                        className='font-semibold text-primary-50 underline underline-offset-2 hover:text-primary-60'
                      >
                        Masuk
                      </UnstyledLink>
                    </Typography>
                  </div>
                </div>
              </div>
            )}
            {!token && !email && (
              <FormProvider {...methods}>
                {/* Form view */}
                <form
                  onSubmit={handleSubmit(reqForgotPassword)}
                  className='flex w-full flex-col space-y-7'
                >
                  <div className='flex w-full flex-col'>
                    <Typography
                      variant='h5'
                      font='atmospheric'
                      className='font-semibold'
                    >
                      Atur Ulang Kata Sandi
                    </Typography>
                    <Typography variant='p' color='secondary'>
                      Isi kolom di bawah ini untuk atur ulang kata sandi
                    </Typography>
                  </div>

                  <div className='flex w-full flex-col space-y-4'>
                    <Input
                      id='email'
                      label='Email'
                      type='email'
                      placeholder='Masukkan Email'
                      validation={{
                        required: 'Email wajib diisi',
                        pattern: {
                          value: REG_EMAIL,
                          message: 'Alamat email tidak valid',
                        },
                      }}
                    />
                  </div>

                  <div className='flex flex-col space-y-4'>
                    <Button
                      type='submit'
                      variant='primary'
                      size='base'
                      className='py-3'
                      isLoading={requestForgotPasswordLoading}
                    >
                      Kirim
                    </Button>
                    <div className='flex flex-row justify-center space-x-2'>
                      <Typography variant='c1'>
                        Ingat kata sandi Anda?
                      </Typography>
                      <Typography variant='c1'>
                        <UnstyledLink
                          href='/login'
                          className='font-semibold text-primary-50 underline underline-offset-2 hover:text-primary-60'
                        >
                          Masuk
                        </UnstyledLink>
                      </Typography>
                    </div>
                  </div>
                </form>
              </FormProvider>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
