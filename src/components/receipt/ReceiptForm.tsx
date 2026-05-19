import { type UseFormRegister } from 'react-hook-form';

interface Props {
  register: UseFormRegister<any>;
}

const ReceiptForm = ({
  register,
}: Props) => {
  return (
    <div className='grid grid-cols-3 gap-4 rounded-xl bg-white p-6 shadow-sm'>
      <input
        placeholder='Receipt No'
        {...register('receiptNo')}
        className='rounded-lg border px-3 py-2'
      />

      <input
        placeholder='Department'
        {...register('department')}
        className='rounded-lg border px-3 py-2'
      />

      <input
        placeholder='Unit Name'
        {...register('unitName')}
        className='rounded-lg border px-3 py-2'
      />

      <input
        placeholder='Delivery Person'
        {...register('deliveryPerson')}
        className='rounded-lg border px-3 py-2'
      />

      <input
        placeholder='Warehouse Name'
        {...register('warehouseName')}
        className='rounded-lg border px-3 py-2'
      />

      <input
        placeholder='Location'
        {...register('location')}
        className='rounded-lg border px-3 py-2'
      />

      <input
        placeholder='Import Reason'
        {...register('importReason')}
        className='rounded-lg border px-3 py-2'
      />

      <input
        type='number'
        placeholder='Document Count'
        {...register('documentCount', {
          valueAsNumber: true,
        })}
        className='rounded-lg border px-3 py-2'
      />
    </div>
  );
};

export default ReceiptForm;
