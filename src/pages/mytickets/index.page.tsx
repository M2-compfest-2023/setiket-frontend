import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BsSearch, BsXCircleFill } from 'react-icons/bs';

import EventCard from '@/components/cards/EventCard';
import Input from '@/components/form/Input';
import EventDetail from '@/layouts/EventDetail';
import Layout from '@/layouts/Layout';
import Modal from '@/layouts/Modal';

type SearchForm = {
  keyword: string;
};

export default function MyTickets() {
  // search bar
  const searchMethod = useForm<SearchForm>({
    mode: 'onTouched',
  });

  const [isVisible, setIsVisible] = useState(false);
  const [eventContent, setEventContent] = useState({});

  // Function to toggle visibility
  const toggleVisibility = (eventName?: string) => {
    setEventContent({
      eventName: eventName,
      eventCategory: 'Exhibition',
      province: 'Province',
      city: 'City',
      eventOrganization: 'Event Organization',
      startDate: 'dd/mm/yyyy',
      endDate: 'dd/mm/yyyy',
      startTime: '00:00',
      endTime: '24:00',
      description: `Experience Van Gogh is art like never before at the immersive show in
      Bangkok. State-of-the-art technology brings his masterpieces to life,
      offering a captivating journey through the mind of a legendary artist.
      Explore Van Goh is work and life from 1880 to 1890, and experience his
      time in Arles, Saint Rémy, and Auvers-sur-Oise. View his masterpieces
      in hyper-fine detail, with special attention to color and technique.
      Discover the sources of his inspiration through augmented photographs
      and videos`,
      purchaseTime: 'dd/mm/yyyy',
      totalTickets: 3,
      totalPrice: '150000',
    });
    setIsVisible(!isVisible);
  };

  return (
    <Layout withNavbar={true} withFooter={true}>
      <div className='min-h-screen'>
        <div className='flex justify-end px-10 py-5 w-full'>
          <FormProvider {...searchMethod}>
            <form action='' className='flex gap-5 items-center'>
              <Input
                id='keyword'
                placeholder='search event name'
                leftIcon={BsSearch}
              />
            </form>
          </FormProvider>
        </div>

        <div
          className='px-4 sm:px-10 grid grid-cols-4 gap-x-3 gap-y-5 place-content-start'
          id='events'
        >
          <EventCard
            eventName='Festival Kota'
            startdate='dd/mm/yyyy'
            starttime='00:00 - 24:00'
            eventId='1'
            size='sm'
            buttonText='See detail'
            buttonOnClik={() => toggleVisibility('Festival Kota 1')}
          />
          <EventCard
            eventName='Festival Kota'
            startdate='dd/mm/yyyy'
            starttime='00:00 - 24:00'
            eventId='1'
            size='sm'
            buttonText='See detail'
            buttonOnClik={() => toggleVisibility('Festival Kota 2')}
          />
          <EventCard
            eventName='Festival Kota'
            startdate='dd/mm/yyyy'
            starttime='00:00 - 24:00'
            eventId='1'
            size='sm'
            buttonText='See detail'
            buttonOnClik={() => toggleVisibility('Festival Kota 3')}
          />
        </div>
      </div>

      <div className='relative z-[110]'>
        {isVisible && (
          <Modal>
            <EventDetail
              className='w-[70%] h-[80vh] overflow-y-scroll no-scrollbar'
              content={eventContent}
              iconButton={BsXCircleFill}
              iconButtonOnClick={() => toggleVisibility()}
            />
          </Modal>
        )}
      </div>
    </Layout>
  );
}
