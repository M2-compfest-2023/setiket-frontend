import 'swiper/css';

import AOS from 'aos';
import React, { useEffect } from 'react';
import { FaChevronCircleRight } from 'react-icons/fa';

import CategoryCard from '@/components/cards/CategoryCard';
import EventCard from '@/components/cards/EventCard';
import IconCard from '@/components/cards/IconCard';
import ButtonLink from '@/components/links/ButtonLink';
import NextImage from '@/components/NextImage';
import SEO from '@/components/SEO';
import Typography from '@/components/Typography';
import { categories } from '@/contents/categories';
import Layout from '@/layouts/Layout';

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Layout withNavbar={true} withFooter={true}>
      <SEO title='Home' description='Home Page' />

      <div className='flex w-full min-h-[90vh] px-20 py-17 justify-between'>
        <div className='w-[60%] flex flex-col justify-center pr-5'>
          <Typography
            className='mt-2'
            color='violet'
            variant='h2'
            font='pattaya'
          >
            Empowering Experiences, One Click at a Time!
          </Typography>
          <Typography className='mt-2' color='cyan' variant='h4' font='ubuntu'>
            Where Innovation Meets Event Excellence.
          </Typography>
          <Typography
            className='mt-2 text-cyan-700'
            variant='p3'
            font='inter'
            weight='medium'
          >
            Unlock the Door to Unforgettable Experiences! At SEA Tickets, we are
            not just selling tickets, we are crafting memories. Seamlessly
            navigating between innovation and simplicity, we have created a
            seamless ticketing experience that puts you at the heart of every
            event. Whether you are a passionate organizer or an eager attendee,
            our platform redefines convenience. Embark on a new era of event
            excitement with SEA Tickets – Where Every Ticket Unfolds a Story.
          </Typography>
          <div className='flex'>
            <ButtonLink
              href='#events'
              size='base'
              variant='secondary'
              className='text-white border-0 my-5'
            >
              Book tickets
            </ButtonLink>
            <ButtonLink
              href='/'
              size='base'
              variant='primary'
              className='text-white border-0 m-5'
            >
              Learn more
            </ButtonLink>
          </div>
        </div>

        <NextImage
          src='/images/home/man-with-gadget.png'
          alt='man-with-gadget.png'
          width={400}
          height={400}
          className='w-[40%]'
        />
      </div>

      <div
        className='sm:min-h-screen bg-background-violet px-4 sm:px-20 py-4 flex flex-col justify-center'
        id='events'
      >
        <Typography
          className='my-1 sm:my-5'
          variant='h5'
          font='inter'
          color='white'
        >
          Latest events
        </Typography>

        <div className='flex overflow-x-auto no-scrollbar gap-7 py-5'>
          <EventCard
            city='Bekasi'
            province='Jawa Barat'
            eventName='Festival Kota'
            ticketPrice='50,000'
            startdate='dd/mm/yyyy'
            starttime='00:00 - 24:00'
            eventId='1'
            className='hover:shadow-xl hover:scale-105 duration-150'
          />
          <EventCard
            city='Bekasi'
            province='Jawa Barat'
            eventName='Festival Kota'
            ticketPrice='50,000'
            startdate='dd/mm/yyyy'
            starttime='00:00 - 24:00'
            eventId='1'
            className='hover:shadow-xl hover:scale-105 duration-150'
          />
          <EventCard
            city='Bekasi'
            province='Jawa Barat'
            eventName='Festival Kota'
            ticketPrice='50,000'
            startdate='dd/mm/yyyy'
            starttime='00:00 - 24:00'
            eventId='1'
            className='hover:shadow-xl hover:scale-105 duration-150'
          />
          <EventCard
            city='Bekasi'
            province='Jawa Barat'
            eventName='Festival Kota'
            ticketPrice='50,000'
            startdate='dd/mm/yyyy'
            starttime='00:00 - 24:00'
            eventId='1'
            className='hover:shadow-xl hover:scale-105 duration-150'
          />
          <IconCard
            Icon={FaChevronCircleRight}
            link='/events'
            className='hover:shadow-xl hover:scale-105 duration-150'
            text='See More'
          />
        </div>

        <Typography
          className='my-1 sm:my-5'
          variant='h5'
          font='inter'
          color='white'
        >
          Categories
        </Typography>

        <div className='flex overflow-x-auto no-scrollbar gap-7 py-5'>
          {categories.map((category) => (
            <CategoryCard
              link={category.href}
              category={''}
              src={category.image}
              key={category.name}
            ></CategoryCard>
          ))}
        </div>
      </div>

      <div className='min-h-screen p-5 sm:p-10'>
        <Typography
          className='my-1 sm:my-5 text-center mx-auto'
          variant='h3'
          font='inter'
          color='cyan'
        >
          How to order tickets at Setiket ?
        </Typography>

        <div className='grid grid-cols-3'></div>
      </div>
    </Layout>
  );
}
