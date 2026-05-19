import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '../../schemas/product.schema';
import { z } from 'zod';
import Button from '../common/Button';
import Input from '../common/Input';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormValues) => Promise<void>;
}

type FormValues = z.infer<typeof productSchema>;

const AddProductModal = ({
  open,
  onClose,
  onSubmit,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(productSchema),
  });

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
      <div className='w-full max-w-md rounded-xl bg-white p-6'>
        <h2 className='mb-5 text-xl font-semibold'>
          Add Product
        </h2>

        <form
          className='space-y-4'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Input
              placeholder='Product Code'
              {...register('code')}
            />
            <p className='text-sm text-red-500'>
              {errors.code?.message}
            </p>
          </div>

          <div>
            <Input
              placeholder='Product Name'
              {...register('name')}
            />
          </div>

          <div>
            <Input
              placeholder='Unit'
              {...register('unit')}
            />
          </div>

          <div className='flex justify-end gap-3'>
            <Button
              type='button'
              variant='secondary'
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type='submit'>Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;