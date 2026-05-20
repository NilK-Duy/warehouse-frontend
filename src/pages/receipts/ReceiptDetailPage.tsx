import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Table, Button, Descriptions, Typography, Space, Spin, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getReceiptDetail } from '../../api/receipt.api';
import { formatCurrency } from '../../utils/currency';

const { Title, Text } = Typography;

const ReceiptDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      fetchReceipt();
    }
  }, [id]);

  const fetchReceipt = async () => {
    try {
      setLoading(true);
      const response = await getReceiptDetail(id!);
      setReceipt(response);
    } catch (error) {
      message.error('Không thể kết nối lấy dữ liệu chi tiết');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Mã hàng hóa',
      dataIndex: ['product', 'code'],
      key: 'productCode',
      width: 150,
    },
    {
      title: 'Tên sản phẩm / Vật tư',
      dataIndex: ['product', 'name'],
      key: 'productName',
    },
    {
      title: 'Đơn vị',
      dataIndex: ['product', 'unit'],
      key: 'productUnit',
      width: 100,
    },
    {
      title: 'SL Yêu cầu',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 120,
    },
    {
      title: 'SL Thực nhập',
      dataIndex: 'actualQuantity',
      key: 'actualQuantity',
      width: 120,
    },
    {
      title: 'Đơn giá',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      width: 160,
      render: (price: string) => <span>{formatCurrency(Number(price))}</span>,
    },
    {
      title: 'Thành tiền',
      dataIndex: 'amount',
      key: 'amount',
      width: 180,
      render: (amount: string) => (
        <span style={{ fontWeight: 'bold', color: '#1677ff' }}>
          {formatCurrency(Number(amount))}
        </span>
      ),
    },
  ];

  if (loading || !receipt) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', gap: '12px' }}>
        <Spin size="large" />
        <div style={{ color: '#1677ff', fontSize: '14px', fontWeight: 500 }}>
          Đang tải dữ liệu chi tiết phiếu nhập...
        </div>
      </div>
    );
  }

  return (
    <Space orientation="vertical" size="large" style={{ width: '100%' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/')} />
        <div>
          <Title level={3} style={{ margin: 0 }}>Receipt: {receipt.receiptNo}</Title>
          <Text type="secondary">Thông tin chi tiết về biên nhận kho hàng</Text>
        </div>
      </div>

      <Card title="Thông tin phiếu nhập kho" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.02)', borderRadius: '8px' }}>
        <Descriptions bordered column={{ xs: 1, sm: 2, md: 2 }} size="middle">
          <Descriptions.Item label="Mã số phiếu"><strong>{receipt.receiptNo}</strong></Descriptions.Item>
          <Descriptions.Item label="Bộ phận áp dụng">{receipt.department}</Descriptions.Item>
          <Descriptions.Item label="Tên đơn vị / Chi nhánh">{receipt.unitName}</Descriptions.Item>
          <Descriptions.Item label="Người giao nhận">{receipt.deliveryPerson}</Descriptions.Item>
          <Descriptions.Item label="Tên kho chứa hàng">{receipt.warehouseName}</Descriptions.Item>
          <Descriptions.Item label="Vị trí sắp xếp kho">{receipt.location || 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Chứng từ kèm theo">{receipt.attachedDocument || 'Không có'}</Descriptions.Item>
          <Descriptions.Item label="Ngày lập phiếu">{new Date(receipt.createdAt).toLocaleString('vi-VN')}</Descriptions.Item>
          <Descriptions.Item label="Tổng giá trị thành tiền" span={2}>
            <span style={{ color: '#52c41a', fontWeight: 'bold', fontSize: '18px' }}>
              {formatCurrency(Number(receipt.totalAmount))}
            </span>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Danh sách hàng hóa / Vật tư chi tiết" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.02)', borderRadius: '8px' }}>
        <Table
          dataSource={receipt.items}
          columns={columns}
          rowKey="id"
          pagination={false}
          bordered
        />
      </Card>
    </Space>
  );
};

export default ReceiptDetailPage;
