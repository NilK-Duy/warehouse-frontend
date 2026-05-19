import { formatCurrency } from '../../utils/currency';

interface Props {
  total: number;
  totalQuantity: number;
}

const ReceiptSummary = ({
  total,
  totalQuantity,
}: Props) => {
  return (
    <div className='mt-6 flex justify-end'>
      <div className='w-[350px] rounded-xl border bg-white p-5 shadow-sm'>
        <div className='flex items-center justify-between border-b pb-3'>
          <span className='text-slate-500'>
            Total Quantity
          </span>

          <span className='font-semibold'>
            {totalQuantity}
          </span>
        </div>

        <div className='mt-4 flex items-center justify-between'>
          <span className='text-lg font-semibold'>
            Grand Total
          </span>

          <span className='text-2xl font-bold text-blue-600'>
            {formatCurrency(total)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReceiptSummary;
