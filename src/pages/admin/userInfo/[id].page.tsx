import { useMutation, useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
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
import { showToast, SUCCESS_TOAST } from '@/components/Toast';
import Typography from '@/components/Typography';
import useMutationToast from '@/hooks/useMutationToast';
import Modal from '@/layouts/Modal';
import api from '@/lib/api';
import { ApiReturn } from '@/types/api';

type ActivityUser = {
  eventName: string;
  timeStamp: string;
};

type UserOverviewColumn = {
  id: string;
  username: string;
  email: string;
  user_type: string;
  verified: boolean;
  // registrationTime: string;
};

type EventCreated = {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  ticket_total: number;
  location: string;
  category_id: number;
  organizer_id: number;
  verified: boolean;
  city_id: number;
  price: number;
  created_at: string;
  updated_at: string;
};

export default function UserInfo() {
  const router = useRouter();
  const { id } = router.query;

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const user = useQuery<ApiReturn<UserOverviewColumn>>([`/users/${id}`]);

  const events = useQuery<ApiReturn<EventCreated[]>>([`/events/eo/${id}`]);

  const activity = useQuery<ApiReturn<ActivityUser[]>>([
    `/users/activity/${id}`,
  ]);

  const columns: ColumnDef<EventCreated>[] = [
    {
      id: 'title',
      accessorKey: 'title',
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
      id: 'verified',
      accessorKey: 'verified',
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

  const methods = useForm<{
    approve: true;
  }>({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;

  const { mutate: handleVerified, isLoading } = useMutationToast<
    void,
    {
      approve: true;
    }
  >(
    useMutation(async (data) => {
      await api.put(`/users/eo/${id}`, data);

      showToast('Berhasil Mengubah Status Event Organizer', SUCCESS_TOAST);
      router.reload();
    })
  );

  const onSubmit = () => {
    handleVerified({ approve: true });
  };

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
          {user.data?.data.user_type == 'CUSTOMER' && <Chips>Customer</Chips>}
          {user.data?.data.user_type == 'EVENTORGANIZER' && (
            <Chips variant='secondary'>Event Organizer</Chips>
          )}
          {!user.data?.data.verified && (
            <Chips
              variant='yellow'
              clickAble
              Icon={AiFillEdit}
              onClick={toggleVisibility}
            >
              Waiting Confirmation
            </Chips>
          )}
          {user.data?.data.verified && (
            <Chips variant='blue' Icon={AiOutlineCheckCircle}>
              Approved
            </Chips>
          )}
        </div>

        <div className='flex justify-between gap-8 mt-3'>
          <div className='w-[50%] flex justify-between'>
            <Typography color='white-2' variant='b2'>
              Username
            </Typography>
            <Typography color='white-2' variant='p2'>
              {user.data?.data.username}
            </Typography>
          </div>
          <div className='w-[50%] flex justify-between'>
            <Typography color='white-2' variant='b2'>
              Role
            </Typography>
            <Typography color='white-2' variant='p2'>
              {user.data?.data.user_type}
            </Typography>
          </div>
        </div>
        <div className='flex justify-between gap-8 mt-3'>
          <div className='w-[50%] flex justify-between'>
            <Typography color='white-2' variant='b2'>
              Email
            </Typography>
            <Typography color='white-2' variant='p2'>
              {user.data?.data.email}
            </Typography>
          </div>
        </div>
      </Container>

      {user.data?.data.user_type == 'CUSTOMER' && (
        <Container title='Activities' Icon={RxActivityLog}>
          {activity.data?.data.map((res) => (
            <TextLine key={res.eventName} className='my-2'>
              Bought event <span className='font-bold'> {res.eventName} </span>{' '}
              ticket at {res.timeStamp}
            </TextLine>
          ))}
        </Container>
      )}

      {user.data?.data.user_type == 'EVENTORGANIZER' && (
        <Container title='Events Created' Icon={MdOutlineEventNote}>
          <Table
            data={events.data?.data || []}
            columns={columns}
            withFilter
            className='text-center text-typo-primary font-primary'
            filterClassName='bg-transparent text-white'
          />
        </Container>
      )}

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='relative z-[110]'>
            {isVisible && (
              <Modal className='flex flex-col'>
                <div className='md:w-[30%] bg-white rounded-xl px-8 py-5'>
                  <Typography
                    className='h5 text-center'
                    font='ubuntu'
                    color='cyan'
                  >
                    User Approval
                  </Typography>
                  <div className='flex justify-around mt-5'>
                    <Button variant='danger' onClick={toggleVisibility}>
                      Cancel
                    </Button>
                    <Button type='submit' isLoading={isLoading}>
                      Approve
                    </Button>
                  </div>
                </div>
              </Modal>
            )}
          </div>
        </form>
      </FormProvider>
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
