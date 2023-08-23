import { useState } from 'react';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import Chips from '@/components/Chips';
import Typography from '@/components/Typography';
import Layout from '@/layouts/Layout';

import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { BsFillCalendarFill } from 'react-icons/bs';
import { FaClock, FaRegMap } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';

export default function Detail() {
  const [ticketAmount, setTicketAmount] = useState(1);
  const ticketPrice = 150000;

  return (
    <Layout withNavbar={true} withFooter={true}>
      <div className='flex px-10 py-4 min-h-screen gap-5'>
        <div className='w-[70%] bg-white rounded-2xl shadow-2xl p-5 h-auto'>
          <Typography variant='h3' font='ubuntu' color='primary'>
            Van Gogh Alive Immersive Show in Bangkok
          </Typography>

          <div className='flex my-4 gap-5 items-center'>
            <Chips>Exhibition</Chips>

            <Typography variant='p2' color='secondary'>
              <FaRegMap className='inline-block' /> Province, City
            </Typography>
          </div>

          <div className='flex flex-col gap-5'>
            <Typography variant='p2'>
              <IoIosPeople className='inline-block mr-3' /> Event Organization
            </Typography>
            <Typography variant='p2'>
              <BsFillCalendarFill className='inline-block mr-3' /> dd/mm/yyyy -
              dd/mm/yyyy
            </Typography>
            <Typography variant='p2'>
              <FaClock className='inline-block mr-3' /> 00:00 - 24:00
            </Typography>
            <Typography variant='p2'>
              Experience Van Gogh is art like never before at the immersive show
              in Bangkok. State-of-the-art technology brings his masterpieces to
              life, offering a captivating journey through the mind of a
              legendary artist. Explore Van Goh is work and life from 1880 to
              1890, and experience his time in Arles, Saint Rémy, and
              Auvers-sur-Oise. View his masterpieces in hyper-fine detail, with
              special attention to color and technique. Discover the sources of
              his inspiration through augmented photographs and videos
            </Typography>
          </div>
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
            <Button>Book Now</Button>
          </div>
        </div>

        {/* role EO */}
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
          <Button>See detail</Button>
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
          <Button size='sm' variant='primary' disabled>
            Approved
          </Button>
        </div>
      </div>
    </Layout>
  );
}
