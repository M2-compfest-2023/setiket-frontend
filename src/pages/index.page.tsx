import 'swiper/css';

import AOS from 'aos';
import React, { useEffect } from 'react';

import SEO from '@/components/SEO';
import Layout from '@/layouts/Layout';

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Layout withNavbar={true} withFooter={true}>
      <SEO />
      <main className='flex flex-col scroll-smooth overflow-hidden'>
        {/* Hero Section */}
        <section
          id='hero'
          className='relative flex flex-col min-h-[600px] h-screen justify-center items-center w-full'
        ></section>
      </main>
    </Layout>
  );
}
