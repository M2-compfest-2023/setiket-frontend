import 'aos/dist/aos.css';

import AOS from 'aos';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { AiOutlineHome } from 'react-icons/ai';

import ButtonLink from '@/components/links/ButtonLink';
import SEO from '@/components/SEO';
import Typography from '@/components/Typography';
import Layout from '@/layouts/Layout';

export default function Custom404() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Layout>
      <SEO title='404' description='Halaman tidak ditemukan' />
      <main
        id='#404'
        className='relative overflow-y-hidden w-full min-h-[680px] h-screen grid grid-rows-2'
      >
        <div className='absolute flex justify-center w-full h-2/5 md:h-1/2'>
          <div className='relative flex justify-center w-full'>
            <div className='absolute bottom-0 translate-y-[22%] w-1/2 md:w-full max-w-[400px]'>
              <Image
                src='/images/404/404.png'
                alt='404-box'
                width={400}
                height={400}
                data-aos='fade-down'
                data-aos-duration='500'
                className='w-full'
              />
            </div>
          </div>
        </div>

        <div
          className='flex flex-col justify-center text-center px-5 row-start-2 h-full'
          data-aos='fade-up'
          data-aos-delay='200'
          data-aos-duration='500'
        >
          <Typography
            variant='h4'
            font='ubuntu'
            className='font-bold text-2xl bg-gradient-to-r from-gradient-500 to-gradient-600 bg-clip-text text-transparent'
          >
            404 - Page not found
          </Typography>

          <Typography
            variant='h4'
            font='ubuntu'
            className='text-base mt-2 bg-gradient-to-r from-gradient-500 to-gradient-600 bg-clip-text text-transparent'
          >
            Please double-check the URL or return to our homepage.
          </Typography>
          <div className='mt-5 justify-center'>
            <ButtonLink
              href='/'
              variant='primary'
              leftIcon={AiOutlineHome}
              data-aos-delay='100'
              data-aos='zoom-in-up'
              data-aos-duration='1000'
              className='text-white border-0'
              data-aos-anchor='#main'
            >
              Homepage
            </ButtonLink>
          </div>
        </div>
      </main>
    </Layout>
  );
}
