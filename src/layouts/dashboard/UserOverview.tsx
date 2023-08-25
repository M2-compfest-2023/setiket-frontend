import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import { BsPeopleFill } from 'react-icons/bs';

import Button from '@/components/buttons/Button';
import Table from '@/components/table/Table';
import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

type Props = React.ComponentPropsWithoutRef<'div'>;

export type UserOverviewColumn = {
  username: string;
  email: string;
  role: string;
  registrationTime: string;
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
      id: 'role',
      accessorKey: 'role',
      header: 'Role',
      size: 5,
    },
    {
      id: 'registrationTime',
      accessorKey: 'registrationTime',
      header: 'Registrated On',
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

  //static data, remove this
  const data = [
    {
      username: 'fachryanwar',
      email: 'fachryanwar2626@gmail.com',
      role: 'customer',
      registrationTime: 'dd/mm/yyyy',
    },
    {
      username: 'orang2',
      email: 'orang2@gmail.com',
      role: 'EO',
      registrationTime: 'dd/mm/yyyy',
    },
    {
      username: 'orang3',
      email: 'orang3@gmail.com',
      role: 'EO',
      registrationTime: 'dd/mm/yyyy',
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
        <BsPeopleFill className='inline-block mr-3' /> Users Overview
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
