import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

import Filter from '@/components/table/Filter';
import TBody from '@/components/table/TBody';
import THead from '@/components/table/THead';
import clsxm from '@/lib/clsxm';

type TableProps<T extends object> = {
  data: T[];
  columns: ColumnDef<T>[];
  omitSort?: boolean;
  withFilter?: boolean;
  filterClassName?: string;
} & React.ComponentPropsWithoutRef<'div'>;

export default function Table<T extends object>({
  className,
  columns,
  data,
  omitSort = false,
  withFilter = false,
  filterClassName,
  ...rest
}: TableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <div className={clsxm('flex flex-col', className)} {...rest}>
      <div className='flex justify-end'>
        {withFilter && <Filter table={table} className={filterClassName} />}
      </div>
      <div className='-my-2 -mx-4 mt-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle px-6 lg:px-8'>
          <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-xl'>
            <table className='min-w-full divide-y divide-gray-300'>
              <THead table={table} omitSort={omitSort} />
              <TBody table={table} />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
