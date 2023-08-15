import 'aos/dist/aos.css';

import AOS from 'aos';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BiGlobe } from 'react-icons/bi';

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
        <div className='absolute flex justify-center w-full h-2/5 md:h-1/2 bg-typo-light'>
          <div className='relative flex justify-center w-full'>
            <div className='absolute bottom-0 translate-y-[22%] w-1/2 md:w-full max-w-[400px]'>
              <Image
                src='/images/404/404.png'
                alt='404-box'
                width='420'
                height='420'
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
          <Typography variant='h4' font='inter' className='font-bold text-2xl'>
            yahhh... <br className='md:hidden' /> yang kamu cari gaada nih :(
          </Typography>
          <Typography
            variant='p'
            font='inter'
            className='text-typo-secondary text-base mt-2'
          >
            Mohon maaf, halaman yang sedang kamu cari tidak ditemukan.
            <br className='hidden md:block' />
            &nbsp; Coba kembali ke halaman utama, atau cek instagram SeTicket
            2023!
          </Typography>
          <div className='flex flex-col md:flex-row gap-5 mt-10 justify-center'>
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
              href='https://www.instagram.com/seticke/'
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
