import 'aos/dist/aos.css';

import AOS from 'aos';
import { useEffect } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BiGlobe } from 'react-icons/bi';

import ButtonLink from '@/components/links/ButtonLink';
import NextImage from '@/components/NextImage';
import SEO from '@/components/SEO';
import Typography from '@/components/Typography';
import Layout from '@/layouts/Layout';

export default function Custom500() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Layout>
      <SEO title='500' description='Internal server error' />
      <main
        id='#main'
        className='flex flex-col justify-center items-center min-h-screen overflow-hidden relative gap-20'
      >
        <div
          className='flex justify-center items-center w-1/2'
          data-aos='fade-down'
          data-aos-duration='500'
        >
          <NextImage
            src='/images/500/500.png'
            alt='500'
            width='807'
            height='300'
          />
        </div>

        <div
          className='flex flex-col text-center px-4'
          data-aos='fade-up'
          data-aos-duration='500'
          data-aos-delay='200'
        >
          <Typography variant='h4' font='inter' className='font-bold'>
            Internal Server Error
          </Typography>
          <Typography
            variant='p'
            font='inter'
            color='secondary'
            className='mt-2'
          >
            Mohon maaf, terdapat masalah pada server kami.
            <br className='hidden md:block' />
            &nbsp;Coba kembali ke halaman utama, atau cek instagram SeTicket
            2023! au cek instagram SeTicket 2023!
          </Typography>
          <div className='flex flex-col md:flex-row justify-center mt-10 gap-4'>
            <ButtonLink
              href='/'
              variant='netral'
              leftIcon={AiOutlineHome}
              data-aos-delay='100'
              data-aos='zoom-in-up'
              data-aos-duration='1000'
              data-aos-anchor='#main'
            >
              Homepage
            </ButtonLink>
            <ButtonLink
              href='https://www.instagram.com/seticket/'
              variant='netral'
              leftIcon={BiGlobe}
              data-aos-delay='100'
              data-aos='zoom-in-up'
              data-aos-duration='1000'
              data-aos-anchor='#main'
            >
              Instagram SeTicket 2023
            </ButtonLink>
          </div>
        </div>
      </main>
    </Layout>
  );
}
