import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '../../schemas/product.schema';
import { z } from 'zod';
import { Modal, Input, Button, Typography } from 'antd';

const { Text } = Typography;

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormValues) => Promise<void>;
}

type FormValues = z.infer<typeof productSchema>;

const AddProductModal = ({ open, onClose, onSubmit }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      code: '',
      name: '',
      unit: '',
    },
  });

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      title={<span style={{ fontSize: '18px', fontWeight: 600 }}>Thêm sản phẩm mới</span>}
      open={open}
      onCancel={handleCancel}
      footer={null} 
      centered
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}
      >
        <div>
          <label htmlFor='product-code' style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Mã sản phẩm *</label>
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <Input 
                {...field}
                id='product-code'
                placeholder="Mã sản phẩm là duy nhất" 
                size="large"
                status={errors.code ? 'error' : ''}
              />
            )}
          />
          {errors.code?.message && (
            <Text type="danger" style={{ fontSize: '13px', marginTop: 4, display: 'block' }}>
              {errors.code.message}
            </Text>
          )}
        </div>

        <div>
          <label htmlFor='product-name' style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Tên sản phẩm</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input 
                {...field}
                id='product-name'
                placeholder="" 
                size="large"
              />
            )}
          />
        </div>

        <div>
          <label htmlFor='product-unit' style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Đơn vị</label>
          <Controller
            name="unit"
            control={control}
            render={({ field }) => (
              <Input 
                {...field}
                id='product-unit'
                placeholder="e.g. Cái, Hộp, Kg,..." 
                size="large"
              />
            )}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
          <Button size="large" onClick={handleCancel}>
            Hủy bỏ
          </Button>
          <Button type="primary" htmlType="submit" size="large">
            Lưu sản phẩm
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddProductModal;
