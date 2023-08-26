import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import { BsGraphUp } from 'react-icons/bs';
import { IoMdArrowRoundBack } from 'react-icons/io';

import Button from '@/components/buttons/Button';
import Table from '@/components/table/Table';
import Typography from '@/components/Typography';
import Layout from '@/layouts/Layout';
import { ApiReturn } from '@/types/api';

type SalesDataColumn = {
  id: number;
  customer: string;
  quantity: number;
  created_at: string;
};

export default function SalesData() {
  const router = useRouter();

  const eventId = router.query.id as string;

  const eventSales = useQuery<ApiReturn<SalesDataColumn[]>>([
    `/events/${eventId}/sales`,
  ]);

  const columns: ColumnDef<SalesDataColumn>[] = [
    {
      id: 'customer',
      accessorKey: 'customer',
      header: 'Customer',
      size: 50,
    },
    {
      id: 'created_at',
      accessorKey: 'created_at',
      header: 'Purchase Time',
      size: 40,
    },
    {
      id: 'quantity',
      accessorKey: 'quantity',
      header: 'Purchase Amount',
      size: 10,
    },
  ];

  return (
    <Layout withFooter withNavbar>
      <div className='min-h-screen px-10 py-5'>
        <Button
          leftIcon={IoMdArrowRoundBack}
          onClick={() => router.back()}
          variant='secondary'
          size='sm'
          className='mb-5'
        >
          Back
        </Button>

        <div className='w-[90%] flex flex-col justify-center md:px-10 md:py-5 rounded-3xl bg-gradient-to-br from-gradient-500 to-gradient-600 shadow-xl'>
          <Typography
            variant='h4'
            font='ubuntu'
            color='white'
            className='flex items-center'
          >
            <BsGraphUp className=' mr-3' /> Sales Data: Event Name
          </Typography>
          <hr className='h-px my-3 border-0 bg-white' />

          {/* <div className='flex gap-5'>
            <Typography
              variant='p2'
              color='white'
              className='flex items-center'
            >
              <BsTicketPerforated className='mr-3' /> 50 tickets sold
            </Typography>
            <Typography
              variant='p2'
              color='white'
              className='flex items-center'
            >
              <BiMoneyWithdraw className='mr-3' /> Rp 50,000,000
            </Typography>
          </div> */}

          <Table
            data={eventSales.data?.data || []}
            columns={columns}
            withFilter
            className='text-center text-typo-primary font-primary'
            filterClassName='bg-transparent text-white'
          />
        </div>
      </div>
    </Layout>
  );
}
