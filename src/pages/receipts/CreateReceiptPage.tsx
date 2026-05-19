import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { getProducts, createProduct } from '../../api/product.api';
import { createReceipt } from '../../api/receipt.api';

import { type Product } from '../../types/product';
import { type ReceiptItemForm } from '../../types/receipt';

import ProductSearch from '../../components/product/ProductSearch';
import AddProductModal from '../../components/product/AddProductModal';
import ReceiptItemsTable from '../../components/receipt/ReceiptItemsTable';

import {
  calculateAmount,
  calculateGrandTotal,
} from '../../utils/calculation';

import { formatCurrency } from '../../utils/currency';

const CreateReceiptPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [items, setItems] = useState<ReceiptItemForm[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      receiptNo: '',
      department: '',
      unitName: '',
      deliveryPerson: '',
      importReason: '',
      warehouseName: '',
      location: '',
      documentCount: 1,
    },
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleSelectProduct = (product: Product) => {
    const existedIndex = items.findIndex(
      (item) => item.productId === product.id,
    );

    if (existedIndex !== -1) {
      const cloned = [...items];

      cloned[existedIndex].quantity += 1;

      cloned[existedIndex].amount =
        calculateAmount(
          cloned[existedIndex].quantity,
          cloned[existedIndex].unitPrice,
        );

      setItems(cloned);
      return;
    }

    setItems((prev) => [
      ...prev,
      {
        productId: product.id,
        product,
        quantity: 1,
        actualQuantity: 1,
        unitPrice: 0,
        amount: 0,
      },
    ]);
  };

  const handleChangeItem = (
    index: number,
    field: keyof ReceiptItemForm,
    value: number,
  ) => {
    const cloned = [...items];

    cloned[index] = {
      ...cloned[index],
      [field]: value,
    };

    cloned[index].amount = calculateAmount(
      cloned[index].quantity,
      cloned[index].unitPrice,
    );

    setItems(cloned);
  };

  const grandTotal = useMemo(() => {
    return calculateGrandTotal(items);
  }, [items]);

  const handleCreateProduct = async (
    data: any,
  ) => {
    const created = await createProduct(data);

    setProducts((prev) => [created, ...prev]);

    handleSelectProduct(created);

    setOpenModal(false);
  };

  const onSubmit = async (values: any) => {
    if (items.length === 0) {
      alert('Please add products');
      return;
    }

    const payload = {
      ...values,
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        actualQuantity: item.actualQuantity,
        unitPrice: item.unitPrice,
      })),
    };

    await createReceipt(payload);

    alert('Create receipt successfully');

    reset();

    setItems([]);
  };

  return (
    <div className='mx-auto max-w-7xl p-6'>
      <h1 className='mb-6 text-3xl font-bold'>
        Create Warehouse Receipt
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
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

        <div className='mt-8 rounded-xl bg-white p-6 shadow-sm'>
          <div className='mb-5'>
            <ProductSearch
              products={products}
              onSelect={handleSelectProduct}
              onCreateNew={() =>
                setOpenModal(true)
              }
            />
          </div>

          <ReceiptItemsTable
            items={items}
            onChange={handleChangeItem}
            onRemove={(index) => {
              setItems((prev) =>
                prev.filter((_, i) => i !== index),
              );
            }}
          />

          <div className='mt-6 flex justify-end'>
            <div className='rounded-xl bg-slate-100 px-5 py-4'>
              <span className='text-lg font-semibold'>
                Total:
              </span>

              <span className='ml-3 text-2xl font-bold text-blue-600'>
                {formatCurrency(grandTotal)}
              </span>
            </div>
          </div>
        </div>

        <div className='mt-6 flex justify-end'>
          <button
            type='submit'
            className='rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700'
          >
            Create Receipt
          </button>
        </div>
      </form>

      <AddProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleCreateProduct}
      />
    </div>
  );
};

export default CreateReceiptPage;
