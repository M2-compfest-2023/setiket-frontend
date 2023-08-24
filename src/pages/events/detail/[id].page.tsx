import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import Typography from '@/components/Typography';
import EventDetail from '@/layouts/EventDetail';
import Layout from '@/layouts/Layout';
import Modal from '@/layouts/Modal';

export default function Detail() {
  const router = useRouter();

  const [ticketAmount, setTicketAmount] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  const ticketPrice = 150000;
  const eventProps = {
    eventName: 'Van Gogh Alive Immersive Show in Bangkok',
    eventCategory: 'Exhibition',
    province: 'Province',
    city: 'City',
    eventOrganization: 'Event Organization',
    startDate: 'dd/mm/yyyy',
    endDate: 'dd/mm/yyyy',
    startTime: '00:00',
    endTime: '24:00',
    description:
      'Experience Van Gogh is art like never before at the immersive show in Bangkok. State-of-the-art technology brings his masterpieces to life, offering a captivating journey through the mind of a legendary artist. Explore Van Goh is work and life from 1880 to 1890, and experience his time in Arles, Saint Rémy, and Auvers-sur-Oise. View his masterpieces in hyper-fine detail, with special attention to color and technique. Discover the sources of his inspiration through augmented photographs and videos',
  };

  return (
    <Layout withNavbar={true} withFooter={true}>
      <div className='flex px-10 py-4 min-h-screen gap-5'>
        <div className='w-[70%]'>
          <EventDetail content={eventProps} />
        </div>

        {/* role customer */}
        <div className='flex flex-col w-[30%] items-center bg-white rounded-2xl shadow-xl h-[200px] p-5'>
          <Typography variant='b2' weight='semibold' className='mx-auto'>
            Buy Ticket
          </Typography>
          <div className='flex items-center gap-3 w-full justify-center my-4'>
            <IconButton
              variant='secondary'
              size='base'
              className='rounded-full border-0'
              iconClassName='font-bold text-white'
              icon={AiOutlineMinus}
              onClick={() => setTicketAmount(ticketAmount - 1)}
              disabled={ticketAmount <= 1}
            />
            <Typography variant='p1' color='cyan'>
              {ticketAmount}
            </Typography>
            <IconButton
              variant='secondary'
              size='base'
              className='rounded-full border-0'
              iconClassName='font-bold text-white'
              icon={AiOutlinePlus}
              onClick={() => setTicketAmount(ticketAmount + 1)}
            />
          </div>
          <div className='flex items-center gap-3 w-full justify-between my-4'>
            <Typography variant='b1' color='cyan'>
              Rp {ticketPrice}
            </Typography>
            <Button onClick={() => setIsVisible(!isVisible)}>Book Now</Button>
          </div>
        </div>

        {/* role EVENTORGANIZER */}
        <div className='flex flex-col gap-3 w-[30%] items-center justify-center bg-white rounded-2xl shadow-xl h-[160px] p-5'>
          <Typography variant='b2' weight='semibold' className='mx-auto'>
            Sales Data
          </Typography>
          <Typography
            variant='p2'
            weight='semibold'
            className='mx-auto'
            color='cyan'
          >
            50 tickets sold
          </Typography>
          <Button onClick={() => router.push('/events/salesData/1')}>
            See detail
          </Button>
        </div>

        {/* role admin */}
        <div className='flex flex-col w-[30%] items-center justify-center bg-white rounded-2xl shadow-xl h-[120px] p-5'>
          <Typography variant='p2' weight='semibold' className='mx-auto'>
            Event Approval
          </Typography>
          <div className='flex items-center gap-3 w-full justify-center my-4'>
            <Button size='sm' variant='secondary'>
              Reject
            </Button>
            <Button size='sm'>Approve</Button>
          </div>
          {/* <Button size='sm' variant='primary' disabled>
                Approved
              </Button> */}
        </div>

        <div className='relative z-[110]'>
          {isVisible && (
            <Modal className='flex flex-col'>
              <div className='md:w-[40%] bg-white rounded-xl px-8 py-5'>
                <Typography
                  className='text-center'
                  variant='p1'
                  weight='semibold'
                  font='inter'
                  color='cyan'
                >
                  Do you want to proceed with purchasing the event tickets?
                </Typography>
                <div className='flex justify-evenly mt-5'>
                  <Button
                    variant='danger'
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    No
                  </Button>
                  <Button>Yes</Button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </Layout>
  );
}
