import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { type ReceiptItemForm } from '../../types/receipt';
import { formatCurrency } from '../../utils/currency';

interface Props {
  items: ReceiptItemForm[];
  onChange: (
    index: number,
    field: keyof ReceiptItemForm,
    value: number,
  ) => void;
  onRemove: (index: number) => void;
}

const ReceiptItemsTable = ({
  items,
  onChange,
  onRemove,
}: Props) => {
  const columns: ColumnDef<ReceiptItemForm>[] = [
    {
      header: 'Product',
      accessorFn: (row) => row.product.name,
    },

    {
      header: 'Code',
      accessorFn: (row) => row.product.code,
    },

    {
      header: 'Unit',
      accessorFn: (row) => row.product.unit,
    },

    {
      header: 'Quantity',
      cell: ({ row }) => (
        <input
          type='number'
          min={1}
          value={row.original.quantity}
          onChange={(e) =>
            onChange(
              row.index,
              'quantity',
              Number(e.target.value),
            )
          }
          className='w-24 rounded-lg border px-3 py-2'
        />
      ),
    },

    {
      header: 'Actual Quantity',
      cell: ({ row }) => (
        <input
          type='number'
          min={1}
          value={row.original.actualQuantity}
          onChange={(e) =>
            onChange(
              row.index,
              'actualQuantity',
              Number(e.target.value),
            )
          }
          className='w-24 rounded-lg border px-3 py-2'
        />
      ),
    },

    {
      header: 'Unit Price',
      cell: ({ row }) => (
        <input
          type='number'
          min={0}
          value={row.original.unitPrice}
          onChange={(e) =>
            onChange(
              row.index,
              'unitPrice',
              Number(e.target.value),
            )
          }
          className='w-40 rounded-lg border px-3 py-2'
        />
      ),
    },

    {
      header: 'Amount',
      cell: ({ row }) => (
        <span className='font-semibold text-blue-600'>
          {formatCurrency(row.original.amount)}
        </span>
      ),
    },

    {
      header: 'Action',
      cell: ({ row }) => (
        <button
          type='button'
          onClick={() => onRemove(row.index)}
          className='rounded-lg bg-red-500 px-3 py-2 text-white hover:bg-red-600'
        >
          Delete
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='overflow-hidden rounded-xl border'>
      <table className='w-full'>
        <thead className='bg-slate-100'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className='px-4 py-3 text-left'
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className='border-t'
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className='px-4 py-4'
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext(),
                  )}
                </td>
              ))}
            </tr>
          ))}

          {items.length === 0 && (
            <tr>
              <td
                colSpan={8}
                className='py-10 text-center text-slate-500'
              >
                No products selected
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReceiptItemsTable;
