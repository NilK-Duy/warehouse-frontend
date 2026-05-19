import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { getReceiptDetail } from '../../api/receipt.api';

import Loading from '../../components/common/Loading';
import PageHeader from '../../components/common/PageHeader';

import { formatCurrency } from '../../utils/currency';

const ReceiptDetailPage = () => {
  const { id } = useParams();

  const [receipt, setReceipt] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchReceipt();
    }
  }, [id]);

  const fetchReceipt = async () => {
    try {
      setLoading(true);

      const response =
        await getReceiptDetail(id!);

      setReceipt(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !receipt) {
    return <Loading />;
  }

  return (
    <div>
      <PageHeader
        title={`Receipt ${receipt.receiptNo}`}
        description='Warehouse receipt detail'
      />

      <div className='rounded-xl bg-white p-6 shadow-sm'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <p className='text-sm text-slate-500'>
              Department
            </p>

            <p className='font-semibold'>
              {receipt.department}
            </p>
          </div>

          <div>
            <p className='text-sm text-slate-500'>
              Warehouse
            </p>

            <p className='font-semibold'>
              {receipt.warehouseName}
            </p>
          </div>

          <div>
            <p className='text-sm text-slate-500'>
              Delivery Person
            </p>

            <p className='font-semibold'>
              {receipt.deliveryPerson}
            </p>
          </div>

          <div>
            <p className='text-sm text-slate-500'>
              Total Amount
            </p>

            <p className='font-semibold text-blue-600'>
              {formatCurrency(
                Number(receipt.totalAmount),
              )}
            </p>
          </div>
        </div>

        <div className='mt-8 overflow-hidden rounded-xl border'>
          <table className='w-full'>
            <thead className='bg-slate-100'>
              <tr>
                <th className='px-4 py-3 text-left'>
                  Product
                </th>

                <th className='px-4 py-3 text-left'>
                  Quantity
                </th>

                <th className='px-4 py-3 text-left'>
                  Unit Price
                </th>

                <th className='px-4 py-3 text-left'>
                  Amount
                </th>
              </tr>
            </thead>

            <tbody>
              {receipt.items.map(
                (item: any) => (
                  <tr
                    key={item.id}
                    className='border-t'
                  >
                    <td className='px-4 py-3'>
                      {item.product.name}
                    </td>

                    <td className='px-4 py-3'>
                      {item.quantity}
                    </td>

                    <td className='px-4 py-3'>
                      {formatCurrency(
                        Number(item.unitPrice),
                      )}
                    </td>

                    <td className='px-4 py-3 font-semibold'>
                      {formatCurrency(
                        Number(item.amount),
                      )}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReceiptDetailPage;
