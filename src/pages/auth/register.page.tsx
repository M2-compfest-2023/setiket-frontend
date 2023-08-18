import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineHome } from 'react-icons/ai';

import Button from '@/components/buttons/Button';
import Input from '@/components/form/Input';
import PrimaryLink from '@/components/links/PrimaryLink';
import SEO from '@/components/SEO';
import Typography from '@/components/Typography';
import { REG_EMAIL, REG_PASSWORD, REG_PHONE } from '@/constants/regex';
import useMutationToast from '@/hooks/useMutationToast';
import Layout from '@/layouts/Layout';
import api from '@/lib/api';

type RegisterForm = {
  name: string;
  email: string;
  no_telp: string;
  password: string;
};

export default function RegisterPage() {
  const methods = useForm<RegisterForm>({
    mode: 'onTouched',
  });
  const router = useRouter();
  const { handleSubmit } = methods;

  const { mutate: handleRegister, isLoading } = useMutationToast<
    void,
    RegisterForm
  >(
    useMutation(async (data) => {
      await api.post('/create_user', data);

      router.push('/login');
    })
  );

  const onSubmit = (data: RegisterForm) => {
    handleRegister({
      name: data.name,
      email: data.email,
      password: data.password,
      no_telp: data.no_telp,
    });
  };

  return (
    <Layout>
      <SEO title='Register' description='Register Page' />
      <main>
        <section className='flex'>
          <section className='hidden lg:block md:w-1/2 lg:w-7/12'>
            {/* <AuthIllustration /> */}
          </section>
          <section className='w-screen lg:w-5/12 min-h-screen flex'>
            <div className='w-10/12 mx-auto py-16'>
              <PrimaryLink href='/' size='medium' variant='primary'>
                <AiOutlineHome className='mr-2 fill-primary-50 w-6 h-6' />
                Kembali ke halaman awal
              </PrimaryLink>
              <div className='mt-12'>
                <Typography variant='h4' font='ubuntu' className='text-3xl'>
                  REGISTER
                </Typography>
              </div>
              <div className='mt-12'>
                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <Input
                        id='name'
                        label='Nama Lengkap'
                        placeholder='Masukkan Nama'
                        validation={{ required: 'Isi nama lengkap' }}
                      />
                    </div>
                    <div className='mt-5'>
                      <Input
                        id='email'
                        label='Email'
                        placeholder='Masukkan Email'
                        helperText='Email harus berformat example@mail.com'
                        validation={{
                          required: 'Email harus diisi',
                          pattern: {
                            value: REG_EMAIL,
                            message: 'Email tidak sesuai format',
                          },
                        }}
                      />
                    </div>
                    <div className='mt-5'>
                      <Input
                        id='password'
                        label='Kata Sandi'
                        type='password'
                        placeholder='Masukkan Kata Sandi'
                        helperText='Kata sandi harus mengandung minimal 8 karakter yang terdiri atas kombinasi huruf besar, huruf kecil, dan angka'
                        validation={{
                          required: 'Kata sandi harus diisi',
                          pattern: {
                            value: REG_PASSWORD,
                            message:
                              'Kata sandi harus mengandung minimal 8 karakter yang terdiri atas kombinasi huruf besar, huruf kecil, dan angka',
                          },
                        }}
                      />
                    </div>
                    <div className='mt-5'>
                      <Input
                        id='no_telp'
                        label='Nomor Telepon'
                        placeholder='Masukkan Nomor Telepon'
                        helperText='Nomor telepon harus diawali +62'
                        validation={{
                          required: 'Nomor telepon harus diisi',
                          pattern: {
                            value: REG_PHONE,
                            message: 'Nomor telepon harus diawali +62',
                          },
                        }}
                      />
                    </div>
                    <Button
                      variant='primary'
                      size='base'
                      className='w-full mt-12'
                      type='submit'
                      isLoading={isLoading}
                    >
                      Daftar
                    </Button>
                    <Typography
                      variant='c1'
                      weight='medium'
                      font='inter'
                      className='mt-4 text-center'
                    >
                      Sudah punya akun?{' '}
                      <PrimaryLink
                        href='/login'
                        variant='primary'
                        size='medium'
                      >
                        Masuk
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
