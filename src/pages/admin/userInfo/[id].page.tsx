import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IconType } from 'react-icons';
import { AiFillEdit, AiOutlineCheckCircle } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { MdOutlineEventNote } from 'react-icons/md';
import { RxActivityLog } from 'react-icons/rx';

import Button from '@/components/buttons/Button';
import Chips from '@/components/Chips';
import Table from '@/components/table/Table';
import TextLine from '@/components/TextLine';
import Typography from '@/components/Typography';
import Modal from '@/layouts/Modal';

type EventCreatedColumn = {
  eventName: string;
  location: string;
  status: string;
};

export default function UserInfo() {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const columns: ColumnDef<EventCreatedColumn>[] = [
    {
      id: 'eventName',
      accessorKey: 'eventName',
      header: 'Event Name',
      size: 40,
    },
    {
      id: 'location',
      accessorKey: 'location',
      header: 'Location',
      size: 5,
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: 'Status',
      size: 10,
    },
    {
      id: 'action',
      accessorKey: 'action',
      header: 'Action',
      size: 15,
      cell: () => {
        return (
          <div className='flex flex-row justify-center'>
            <Button
              variant='secondary'
              size='sm'
              onClick={
                () => router.push(`/events/detail/1`) // ini 1 diganti id atau pk
              }
            >
              See Detail
            </Button>
          </div>
        );
      },
    },
  ];

  //static data, remove this
  const data = [
    {
      eventName: 'Event 1',
      location: 'Province, City',
      status: 'waiting confirmation',
    },
    {
      eventName: 'Event 2',
      location: 'Province, City',
      status: 'approved',
    },
    {
      eventName: 'Event 3',
      location: 'Province, City',
      status: 'waiting confirmation',
    },
  ];

  return (
    <div className='flex flex-col gap-8 items-center min-h-screen md:p-10'>
      <div className='w-[90%] flex items-start'>
        <Button
          leftIcon={IoMdArrowRoundBack}
          onClick={() => router.back()}
          variant='secondary'
        >
          Back
        </Button>
      </div>

      <Container title='User Information' Icon={FaUserAlt}>
        <div className='flex gap-5 items-center'>
          <Chips>Customer</Chips>
          {/* role EO sebelum approve */}
          <Chips variant='secondary'>Event Organizer</Chips>
          <Chips
            variant='yellow'
            clickAble
            Icon={AiFillEdit}
            onClick={toggleVisibility}
          >
            Waiting Confirmation
          </Chips>
          <Chips
            variant='blue'
            Icon={AiOutlineCheckCircle}
          >
            Approved
          </Chips>
        </div>

        <div className='flex justify-between gap-8 mt-3'>
          <div className='w-[50%] flex justify-between'>
            <Typography color='white-2' variant='b2'>
              Username
            </Typography>
            <Typography color='white-2' variant='p2'>
              fachryanwar
            </Typography>
          </div>
          <div className='w-[50%] flex justify-between'>
            <Typography color='white-2' variant='b2'>
              Registrated on
            </Typography>
            <Typography color='white-2' variant='p2'>
              dd/mm/yyyy - 24:00
            </Typography>
          </div>
        </div>
        <div className='flex justify-between gap-8 mt-3'>
          <div className='w-[50%] flex justify-between'>
            <Typography color='white-2' variant='b2'>
              Email
            </Typography>
            <Typography color='white-2' variant='p2'>
              fachryanwar@gmail.com
            </Typography>
          </div>
          <div className='w-[50%] flex justify-between'>
            {/* role EO */}
            <Typography color='white-2' variant='b2'>
              Organization
            </Typography>
            <Typography color='white-2' variant='p2'>
              PT Suya Tbk
            </Typography>
          </div>
        </div>
      </Container>

      <Container title='Activities' Icon={RxActivityLog}>
        <TextLine className='my-2'>
          Bought ticket for the Van Gogh Festival
        </TextLine>
        <TextLine className='my-2'>
          Bought ticket for the Van Gogh Festival
        </TextLine>
        <TextLine className='my-2'>
          Bought ticket for the Van Gogh Festival
        </TextLine>
      </Container>

      {/* role EO */}
      <Container title='Events Created' Icon={MdOutlineEventNote}>
        <Table
          data={data}
          columns={columns}
          withFilter
          className='text-center text-typo-primary font-primary'
          filterClassName='bg-transparent text-white'
        />
      </Container>

      <div className='relative z-[110]'>
        {isVisible && (
          <Modal className='flex flex-col'>
            <div className='md:w-[30%] bg-white rounded-xl px-8 py-5'>
              <Typography className='h5 text-center' font='ubuntu' color='cyan'>
                User Approval
              </Typography>
              <div className='flex justify-around mt-5'>
                <Button variant='danger' onClick={toggleVisibility}>
                  Cancel
                </Button>
                <Button>Approve</Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

function Container({
  title,
  Icon,
  children,
}: {
  title?: string;
  Icon: IconType;
  children?: React.ReactNode;
}) {
  return (
    <div className='w-[90%] flex flex-col justify-center md:px-10 md:py-5 rounded-3xl bg-gradient-to-br from-gradient-500 to-gradient-600 shadow-xl'>
      <Typography
        variant='h4'
        font='ubuntu'
        color='white'
        className='flex items-center'
      >
        <Icon className='inline- mr-3' /> {title}
      </Typography>
      <hr className='h-px my-3 border-0 bg-white' />
      {children}
    </div>
  );
}
