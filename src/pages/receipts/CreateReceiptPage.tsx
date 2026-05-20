import React, { useEffect, useMemo, useState } from 'react';
import { Form, Input, InputNumber, Button, Card, Typography, Space, Row, Col, message } from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { getProducts, createProduct } from '../../api/product.api';
import { createReceipt } from '../../api/receipt.api';

import { type Product } from '../../types/product';
import { type ReceiptItemForm } from '../../types/receipt';

import ProductSearch from '../../components/product/ProductSearch';
import AddProductModal from '../../components/product/AddProductModal';
import ReceiptItemsTable from '../../components/receipt/ReceiptItemsTable';

import { calculateAmount, calculateGrandTotal } from '../../utils/calculation';
import { formatCurrency } from '../../utils/currency';

const { Title, Text } = Typography;

const CreateReceiptPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [items, setItems] = useState<ReceiptItemForm[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      message.error('Failed to fetch products');
    }
  };

  const handleSelectProduct = (product: Product) => {
    const existedIndex = items.findIndex((item) => item.productId === product.id);

    if (existedIndex !== -1) {
      const cloned = [...items];
      cloned[existedIndex].actualQuantity += 1;
      cloned[existedIndex].amount = calculateAmount(
        cloned[existedIndex].actualQuantity,
        cloned[existedIndex].unitPrice
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

  const handleChangeItem = (index: number, field: keyof ReceiptItemForm, value: number) => {
    const cloned = [...items];
    cloned[index] = {
      ...cloned[index],
      [field]: value,
    };
    cloned[index].amount = calculateAmount(cloned[index].actualQuantity, cloned[index].unitPrice);
    setItems(cloned);
  };

  const grandTotal = useMemo(() => {
    return calculateGrandTotal(items);
  }, [items]);

  const handleCreateProduct = async (data: any) => {
    try {
      const created = await createProduct(data);
      setProducts((prev) => [created, ...prev]);
      handleSelectProduct(created);
      setOpenModal(false);
      message.success('Product created and added successfully');
    } catch (error) {
      message.error('Failed to create product');
    }
  };

  const onSubmit = async (values: any) => {
    if (items.length === 0) {
      message.warning('Please add at least one product to the receipt');
      return;
    }

    try {
      setSubmitting(true);
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
      message.success('Create receipt successfully');
      form.resetFields();
      setItems([]);
      navigate('/');
    } catch (error) {
      message.error('Failed to create receipt');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/')} />
        <div>
          <Title level={3} style={{ margin: 0 }}>Tạo đơn nhập kho</Title>
          <Text type="secondary">Điền thông tin để nhập sản phẩm vào kho</Text>
        </div>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Card title="Thông tin phiếu" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.02)', borderRadius: '8px', marginBottom: 24 }}>
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item name="receiptNo" label="Mã phiếu" rules={[{ required: true, message: 'Please input receipt number!' }]}>
                <Input placeholder="PNK-2026-001" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item name="department" label="Bộ phận">
                <Input placeholder="" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item name="unitName" label="Đơn vị">
                <Input placeholder="" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item name="deliveryPerson" label="Người giao hàng">
                <Input placeholder="Họ và tên người giao hàng" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item name="warehouseName" label="Tên kho" rules={[{ required: true, message: 'Please input warehouse name!' }]}>
                <Input placeholder="Kho A" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item name="location" label="Địa điểm kho">
                <Input placeholder="" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item name="attachedDocument" label="Số chứng từ gốc kèm theo">
                <Input placeholder="" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card title="Thông tin sản phẩm" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.02)', borderRadius: '8px' }}>
          <div style={{ marginBottom: 20 }}>
            <ProductSearch
              products={products}
              onSelect={handleSelectProduct}
              onCreateNew={() => setOpenModal(true)}
            />
          </div>

          <ReceiptItemsTable
            items={items}
            onChange={handleChangeItem}
            onRemove={(index: any) => {
              setItems((prev) => prev.filter((_, i) => i !== index));
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
            <div style={{ background: '#f5f5f5', padding: '12px 24px', borderRadius: '8px', textAlign: 'right' }}>
              <Text style={{ fontSize: '16px', marginRight: 12 }}>Tổng tiền:</Text>
              <Text style={{ fontSize: '22px', fontWeight: 'bold', color: '#1677ff' }}>
                {formatCurrency(grandTotal)}
              </Text>
            </div>
          </div>
        </Card>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24, gap: 12 }}>
          <Button size="large" onClick={() => navigate('/')}>Hủy bỏ</Button>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />} size="large" loading={submitting} >
            Tạo phiếu nhập kho
          </Button>
        </div>
      </Form>

      <AddProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleCreateProduct}
      />
    </Space>
  );
};

export default CreateReceiptPage;
