import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { getReceipts } from '../../api/receipt.api';

import Loading from '../../components/common/Loading';
import PageHeader from '../../components/common/PageHeader';

import Button from '../../components/common/Button';

import { formatCurrency } from '../../utils/currency';

interface Receipt {
  id: string;
  receiptNo: string;
  department: string;
  warehouseName: string;
  totalAmount: string;
  createdAt: string;
}

const ReceiptListPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [receipts, setReceipts] = useState<
    Receipt[]
  >([]);

  useEffect(() => {
    fetchReceipts();
  }, []);

  const fetchReceipts = async () => {
    try {
      setLoading(true);

      const response = await getReceipts();

      setReceipts(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnDef<Receipt>[] = [
    {
      header: 'Receipt No',
      accessorKey: 'receiptNo',
    },

    {
      header: 'Department',
      accessorKey: 'department',
    },

    {
      header: 'Warehouse',
      accessorKey: 'warehouseName',
    },

    {
      header: 'Total Amount',
      cell: ({ row }) => (
        <span className='font-semibold'>
          {formatCurrency(
            Number(row.original.totalAmount),
          )}
        </span>
      ),
    },

    {
      header: 'Created At',
      cell: ({ row }) => (
        <span>
          {new Date(
            row.original.createdAt,
          ).toLocaleDateString('vi-VN')}
        </span>
      ),
    },

    {
      header: 'Action',
      cell: ({ row }) => (
        <Button
          onClick={() =>
            navigate(
              `/receipts/${row.original.id}`,
            )
          }
        >
          Detail
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: receipts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <PageHeader
        title='Warehouse Receipts'
        description='Manage warehouse import receipts'
        action={
          <Button
            onClick={() =>
              navigate('/create')
            }
          >
            Create Receipt
          </Button>
        }
      />

      <div className='overflow-hidden rounded-xl border bg-white'>
        <table className='w-full'>
          <thead className='bg-slate-100'>
            {table
              .getHeaderGroups()
              .map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(
                    (header) => (
                      <th
                        key={header.id}
                        className='px-4 py-3 text-left'
                      >
                        {flexRender(
                          header.column.columnDef
                            .header,
                          header.getContext(),
                        )}
                      </th>
                    ),
                  )}
                </tr>
              ))}
          </thead>

          <tbody>
            {table
              .getRowModel()
              .rows.map((row) => (
                <tr
                  key={row.id}
                  className='border-t'
                >
                  {row
                    .getVisibleCells()
                    .map((cell) => (
                      <td
                        key={cell.id}
                        className='px-4 py-4'
                      >
                        {flexRender(
                          cell.column.columnDef
                            .cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReceiptListPage;
