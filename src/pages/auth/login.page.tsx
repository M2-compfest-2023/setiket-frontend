import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineHome } from 'react-icons/ai';

import Button from '@/components/buttons/Button';
import Input from '@/components/form/Input';
import withAuth from '@/components/hoc/withAuth';
import PrimaryLink from '@/components/links/PrimaryLink';
import SEO from '@/components/SEO';
import { showToast, SUCCESS_TOAST } from '@/components/Toast';
import Typography from '@/components/Typography';
import { REG_EMAIL } from '@/constants/regex';
import useMutationToast from '@/hooks/useMutationToast';
import Layout from '@/layouts/Layout';
import api from '@/lib/api';
import { setToken } from '@/lib/cookies';
import AuthIllustration from '@/pages/auth/AuthIllustration';
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
      const res = await api.post('/auth/login', data);
      const token = res.data.data.access_token;
      setToken(token);

      const user = await api.get<ApiReturn<User>>('/auth/me');
      if (!user.data.data) {
        throw new Error('Sesi login tidak valid');
      }
      login({ ...user.data.data, token });

      showToast('Berhasil login', SUCCESS_TOAST);
      if (user.data.data.role === 'ADMIN') {
        router.push('/dashboard');
      }
      router.push('/');
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
      <main className='flex bg-gradient-to-b from-gradient-500 to-gradient-600'>
        <section className='hidden lg:block w-7/12'>
          <AuthIllustration />
        </section>
        <section className='w-screen lg:w-5/12 h-screen flex bg-white lg:rounded-l-3xl'>
          <div className='w-10/12 m-auto h-fit'>
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
                Login
              </Typography>
            </div>
            <div className='mt-6'>
              <FormProvider {...methods}>
                <form action='' onSubmit={handleSubmit(onSubmit)}>
                  <div>
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
                  <div className='mt-5'>
                    <Input
                      id='password'
                      label='Password'
                      type='password'
                      placeholder='Masukkan Password'
                      helperText='The password must contain a minimum of 8 characters consisting of a combination of uppercase letters, lowercase letters, and numbers.'
                      validation={{
                        required: 'Password shouldn`t be empty',
                      }}
                    />
                  </div>
                  <PrimaryLink
                    href='/forgot-password'
                    size='medium'
                    type='button'
                    className='mt-3'
                  >
                    Forgot password?
                  </PrimaryLink>
                  <Button
                    variant='primary'
                    size='base'
                    className='w-full mt-10'
                    type='submit'
                    isLoading={isLoading}
                  >
                    Submit
                  </Button>
                  <Typography
                    variant='p2'
                    weight='medium'
                    font='inter'
                    className='mt-4 text-center'
                  >
                    Doesn`t have account?{' '}
                    <PrimaryLink href='/register' size='medium' type='button'>
                      Sign Up
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
