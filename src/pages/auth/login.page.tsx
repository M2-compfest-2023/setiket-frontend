import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineHome } from 'react-icons/ai';

import Button from '@/components/buttons/Button';
import Input from '@/components/form/Input';
import withAuth from '@/components/hoc/withAuth';
import PrimaryLink from '@/components/links/PrimaryLink';
import SEO from '@/components/SEO';
import Typography from '@/components/Typography';
import { REG_EMAIL } from '@/constants/regex';
import useMutationToast from '@/hooks/useMutationToast';
import Layout from '@/layouts/Layout';
import api from '@/lib/api';
import { setToken } from '@/lib/cookies';
import useAuthStore from '@/store/useAuthStore';
import { ApiReturn } from '@/types/api';
import { User } from '@/types/entities/user';

type LoginForm = {
  email: string;
  password: string;
};
export default withAuth(LoginPage, 'public');
function LoginPage() {
  const methods = useForm<LoginForm>({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;
  const router = useRouter();
  const login = useAuthStore.useLogin();

  const { mutate: loginMutation, isLoading } = useMutationToast<
    void,
    LoginForm
  >(
    useMutation(async (data) => {
      const res = await api.post('/login_user', data);
      const { token } = res.data.data;
      setToken(token);

      const user = await api.get<ApiReturn<User>>('/me');

      if (!user.data.data) {
        throw new Error('Sesi login tidak valid');
      }
      login({ ...user.data.data, token });
      router.push('/dashboard');
    })
  );

  const onSubmit = (data: LoginForm) => {
    loginMutation({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <Layout>
      <SEO title='Login' description='Login Page' />
      <main className='flex'>
        <section className='hidden lg:block w-7/12'>
          {/* <AuthIllustration /> */}
        </section>
        <section className='w-screen lg:w-5/12 h-screen flex'>
          <div className='w-10/12 m-auto h-fit'>
            <PrimaryLink href='/' size='medium' variant='primary'>
              <AiOutlineHome className='mr-2 fill-primary-50 w-6 h-6' />
              Kembali ke halaman awal
            </PrimaryLink>
            <div className='mt-12'>
              <Typography variant='h4' font='ubuntu'>
                LOGIN
              </Typography>
              <Typography>Silakan login dengan akun Anda</Typography>
            </div>
            <div className='mt-12'>
              <FormProvider {...methods}>
                <form action='' onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <Input
                      id='email'
                      label='Email'
                      placeholder='Email'
                      validation={{
                        required: 'Email tidak boleh kosong',
                        pattern: {
                          value: REG_EMAIL,
                          message: 'Email tidak valid',
                        },
                      }}
                    />
                  </div>
                  <div className='mt-5'>
                    <Input
                      id='password'
                      label='Password'
                      type='password'
                      placeholder='Password'
                      validation={{
                        required: 'Password tidak boleh kosong',
                      }}
                    />
                  </div>
                  <PrimaryLink
                    href='/forgot-password'
                    variant='primary'
                    size='medium'
                    type='button'
                  >
                    Lupa kata sandi?
                  </PrimaryLink>
                  <Button
                    variant='primary'
                    size='base'
                    className='w-full mt-12'
                    type='submit'
                    isLoading={isLoading}
                  >
                    Masuk
                  </Button>
                  <Typography
                    variant='c1'
                    weight='medium'
                    font='inter'
                    className='mt-4 text-center'
                  >
                    Belum punya akun?{' '}
                    <PrimaryLink
                      href='/register'
                      variant='primary'
                      size='medium'
                      type='button'
                    >
                      Daftar
                    </PrimaryLink>
                  </Typography>
                </form>
              </FormProvider>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
