import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import { BsPeopleFill } from 'react-icons/bs';

import Button from '@/components/buttons/Button';
import Table from '@/components/table/Table';
import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';
import { ApiReturn } from '@/types/api';

type Props = React.ComponentPropsWithoutRef<'div'>;

export type UserOverviewColumn = {
  username: string;
  email: string;
  name: string;
  // registrationTime: string;
};

export default function UsersOverview({ className }: Props) {
  const router = useRouter();

  const columns: ColumnDef<UserOverviewColumn>[] = [
    {
      id: 'username',
      accessorKey: 'username',
      header: 'Username',
      size: 30,
    },
    {
      id: 'email',
      accessorKey: 'email',
      header: 'Email',
      size: 40,
    },
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Name',
      size: 5,
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
              onClick={() =>
                router.push(`/admin/userInfo/${info.row.original.username}`)
              }
            >
              See Detail
            </Button>
          </div>
        );
      },
    },
  ];

  const users = useQuery<ApiReturn<UserOverviewColumn[]>>(['/users']);

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
        <BsPeopleFill className='inline-block mr-3' /> Users Overview
      </Typography>

      <hr className='h-px my-3 border-0 bg-white' />

      <div>
        <Table
          data={users.data?.data || []}
          columns={columns}
          withFilter
          className='text-center text-typo-primary font-primary'
          filterClassName='bg-transparent text-white'
        />
      </div>
    </div>
  );
}
