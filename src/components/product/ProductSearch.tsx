import { Select, Button, Divider, Typography } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { type Product } from '../../types/product';

const { Text } = Typography;

interface Props {
  products: Product[];
  onSelect: (product: Product) => void;
  onCreateNew: () => void;
}

const ProductSearch = ({ products, onSelect, onCreateNew }: Props) => {

  const selectOptions = products.map((product) => ({
    value: product.id,
    productData: product,
    label: (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '2px 0' }}>
        <span style={{ fontWeight: 500, color: '#262626', fontSize: '14px' }}>{product.name}</span>
        <Text type="secondary" style={{ fontSize: '12px' }}>{product.code}</Text>
      </div>
    ),
  }));

  return (
    <Select
      showSearch
      style={{ width: '100%', maxWidth: 500 }}
      placeholder={
        <span style={{ color: '#bfbfbf' }}>
          <SearchOutlined style={{ marginRight: 8 }} />
          Tìm kiếm sản phẩm theo tên, mã...
        </span>
      }
      size="large"
      value={null}
      options={selectOptions}
      optionRender={(option) => {
        const product = option.data.productData;
        return (
          <div style={{ display: 'flex', flexDirection: 'column', padding: '2px 0' }}>
            <span style={{ fontWeight: 500, color: '#262626', fontSize: '14px' }}>{product.name}</span>
            <Text type="secondary" style={{ fontSize: '12px' }}>{product.code}</Text>
          </div>
        );
      }}
      onChange={(value) => {
        const found = products.find((p) => p.id === value);
        if (found) onSelect(found);
      }}
      popupRender={(menu) => (
        <>
          <div style={{ padding: '4px 4px 0px 4px' }}>
            <Button
              type="primary"
              ghost
              icon={<PlusOutlined />}
              onClick={onCreateNew}
              style={{ width: '100%', textAlign: 'left', borderRadius: '4px' }}
            > 
              Thêm sản phẩm mới
            </Button>
          </div>
          <Divider style={{ margin: '4px 0' }} />
          {menu}
        </>
      )}
    />
  );
};

export default ProductSearch;
