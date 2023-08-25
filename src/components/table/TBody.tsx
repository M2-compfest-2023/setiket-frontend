import { flexRender, RowData, Table } from '@tanstack/react-table';
import * as React from 'react';

import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

type TBodyProps<T extends RowData> = {
  table: Table<T>;
  isLoading?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

export default function TBody<T extends RowData>({
  className,
  isLoading,
  table,
  ...rest
}: TBodyProps<T>) {
  return (
    <tbody className={clsxm(className)} {...rest}>
      {isLoading ? (
        <tr>
          <td
            className='truncate whitespace-nowrap py-4 px-3 col-span-full text-white text-center'
            colSpan={table.getAllColumns().length}
          >
            Loading...
          </td>
        </tr>
      ) : table.getRowModel().rows.length == 0 ? (
        <tr>
          <td
            className='truncate whitespace-nowrap py-4 px-3 col-span-full text-white text-center'
            colSpan={table.getAllColumns().length}
          >
            No Data
          </td>
        </tr>
      ) : (
        table.getRowModel().rows.map((row) => (
          <tr key={row.id} className={clsxm('bg-black/20')}>
            {row.getVisibleCells().map((cell) => {
              return (
                <Typography
                  key={cell.id}
                  as='td'
                  title={cell.getValue() as string}
                  className='truncate whitespace-nowrap py-4 px-3'
                  style={{ maxWidth: cell.column.getSize() }}
                  variant='p3'
                  color='white'
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Typography>
              );
            })}
          </tr>
        ))
      )}
    </tbody>
  );
}
