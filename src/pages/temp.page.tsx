import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/router';

import Button from '@/components/buttons/Button';
import Table from '@/components/table/Table';
import PaymentTag from '@/components/tag/PaymentTag';
import Layout from '@/layouts/Layout';

export type AdminBstColumn = {
  bst_id: string;
  nik: string;
  asal_instansi: string;
  status_pembayaran: string;
};

// temporary page for slicing design
export default function Temp() {
  const router = useRouter();

  const columns: ColumnDef<AdminBstColumn>[] = [
    {
      id: 'index',
      cell: (info) => info.row.index + 1,
      header: 'No.',
      size: 10,
    },
    {
      id: 'nik',
      accessorKey: 'nik',
      header: 'NIK',
      size: 25,
    },
    {
      id: 'asal_instansi',
      accessorKey: 'asal_instansi',
      header: 'Asal Instansi',
      size: 30,
    },
    {
      id: 'status_pembayaran',
      header: 'Status Pembayaran',
      cell: () => (
        <PaymentTag color='need_revision' />
      ),
      size: 15,
    },
    {
      id: 'detail',
      cell: (info) => {
        return (
          <div className='flex flex-row justify-center'>
            <Button
              variant='label'
              size='sm'
              onClick={() =>
                router.push(`/admin/bst/${info.row.original.bst_id}`)
              }
            >
              Lihat Detail
            </Button>
          </div>
        );
      },
      header: 'Detail',
      size: 20,
    },
  ];


  return (
    <Layout withNavbar withFooter>
      <div className='min-h-screen'>
        <Table
          data={[]}
          columns={columns}
          withFilter
          className='text-center text-typo-primary font-primary'
        />
      </div>
    </Layout>
  );
}
