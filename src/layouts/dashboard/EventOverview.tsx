import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import { MdOutlineEventNote } from 'react-icons/md';

import Button from '@/components/buttons/Button';
import Table from '@/components/table/Table';
import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';
import { ApiReturn } from '@/types/api';

type Props = React.ComponentPropsWithoutRef<'div'>;

export type EventOverviewColumn = {
  id: number;
  title: string;
  ticket_total: string;
  location: string;
  verified: string;
};

export default function EventOverview({ className }: Props) {
  const router = useRouter();

  const columns: ColumnDef<EventOverviewColumn>[] = [
    {
      id: 'title',
      accessorKey: 'title',
      header: 'Event Name',
      size: 40,
    },
    {
      id: 'ticket_total',
      accessorKey: 'ticket_total',
      header: 'Ticket Total',
      size: 30,
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
      cell: (info) => {
        return (
          <div className='flex flex-row justify-center'>
            <Button
              variant='secondary'
              size='sm'
              onClick={
                () => router.push(`/events/detail/${info.row.original.id}`) // ini 1 diganti id atau pk
              }
            >
              See Detail
            </Button>
          </div>
        );
      },
    },
  ];

  const events = useQuery<ApiReturn<EventOverviewColumn[]>>(['/events']);

  return (
    <div
      className={clsxm(
        'flex flex-col justify-center px-10 py-5 w-full rounded-3xl bg-gradient-to-br from-gradient-500 to-gradient-600',
        className
      )}
    >
      <Typography
        variant='h4'
        font='ubuntu'
        color='white'
        className='flex items-center'
      >
        <MdOutlineEventNote className='inline-block mr-3' /> Events Overview
      </Typography>

      <hr className='h-px my-3 border-0 bg-white' />

      <div>
        <Table
          data={events.data?.data || []}
          columns={columns}
          withFilter
          className='text-center text-typo-primary font-primary'
          filterClassName='bg-transparent text-white'
        />
      </div>
    </div>
  );
}
