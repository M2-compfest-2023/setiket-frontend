import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import { MdOutlineEventNote } from 'react-icons/md';

import Button from '@/components/buttons/Button';
import Table from '@/components/table/Table';
import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

type Props = React.ComponentPropsWithoutRef<'div'>;

export type EventOverviewColumn = {
  eventName: string;
  eoUsername: string;
  location: string;
  status: string;
};

export default function EventOverview({ className }: Props) {
  const router = useRouter();

  const columns: ColumnDef<EventOverviewColumn>[] = [
    {
      id: 'eventName',
      accessorKey: 'eventName',
      header: 'Event Name',
      size: 40,
    },
    {
      id: 'eoUsername',
      accessorKey: 'eoUsername',
      header: 'EO Username',
      size: 30,
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
              onClick={() =>
                router.push(`/events/detail/1`) // ini 1 diganti id atau pk
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
      eoUsername: 'fachryanwar',
      location: 'Province, City',
      status: 'waiting confirmation',
    },
    {
      eventName: 'Event 2',
      eoUsername: 'orang2',
      location: 'Province, City',
      status: 'approved',
    },
    {
      eventName: 'Event 3',
      eoUsername: 'orang3',
      location: 'Province, City',
      status: 'waiting confirmation',
    },
  ];

  return (
    <div
      className={clsxm(
        'flex flex-col justify-center md:px-10 md:py-5 w-full rounded-3xl bg-gradient-to-br from-gradient-500 to-gradient-600',
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
          data={data}
          columns={columns}
          withFilter
          className='text-center text-typo-primary font-primary'
          filterClassName='bg-transparent text-white'
        />
      </div>
    </div>
  );
}
