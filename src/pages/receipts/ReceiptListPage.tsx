import React, { useEffect, useState } from 'react';
import { Table, Button, Card, Typography, Space, Modal, Descriptions, Spin, message } from 'antd';
import { PlusOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getReceipts, getReceiptDetail } from '../../api/receipt.api';
import { formatCurrency } from '../../utils/currency';

const { Title, Paragraph } = Typography;

interface Receipt {
  id: string;
  receiptNo: string;
  department: string;
  warehouseName: string;
  totalAmount: string;
  createdAt: string;
}

const ReceiptListPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [detailLoading, setDetailLoading] = useState<boolean>(false);
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);

  useEffect(() => {
    fetchReceipts();
  }, []);

  const fetchReceipts = async () => {
    try {
      setLoading(true);
      const response = await getReceipts();
      setReceipts(response);
    } catch (error) {
      message.error('Không thể tải danh sách phiếu nhập kho');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDetail = async (id: string) => {
    try {
      setIsDetailOpen(true);
      setDetailLoading(true);
      setSelectedReceipt(null);
      
      const response = await getReceiptDetail(id);
      setSelectedReceipt(response);
    } catch (error) {
      message.error('Không thể tải thông tin chi tiết phiếu');
      setIsDetailOpen(false);
    } finally {
      setDetailLoading(false);
    }
  };

  const modalProductColumns = [
    {
      title: 'Mã SP',
      dataIndex: ['product', 'code'],
      key: 'productCode',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: ['product', 'name'],
      key: 'productName',
    },
    {
      title: 'SL Yêu cầu',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
    },
    {
      title: 'SL Thực nhập',
      dataIndex: 'actualQuantity',
      key: 'actualQuantity',
      width: 110,
    },
    {
      title: 'Đơn giá',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (price: string) => formatCurrency(Number(price)),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: string) => (
        <span style={{ fontWeight: 'bold', color: '#1677ff' }}>{formatCurrency(Number(amount))}</span>
      ),
    },
  ];

  const columns = [
    {
      title: 'Mã phiếu',
      dataIndex: 'receiptNo',
      key: 'receiptNo',
      render: (text: string) => <span style={{ fontWeight: 500, color: '#1677ff' }}>{text}</span>,
    },
    {
      title: 'Bộ phận',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Tên kho',
      dataIndex: 'warehouseName',
      key: 'warehouseName',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: string) => (
        <span style={{ fontWeight: 'bold', color: '#52c41a' }}>{formatCurrency(Number(amount))}</span>
      ),
    },
    {
      title: 'Ngày nhập',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => <span>{new Date(date).toLocaleDateString('vi-VN')}</span>,
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 120,
      render: (_: any, record: Receipt) => (
        <Button
          type="primary"
          ghost
          icon={<EyeOutlined />}
          onClick={() => handleOpenDetail(record.id)}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  return (
    <Space orientation="vertical" size="large" style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ cursor: 'pointer' }}>
          <Title level={3} style={{ margin: 0 }}>Phiếu nhập hàng</Title>
          <Paragraph type="secondary" style={{ margin: 0 }}>Quản lý biên lai nhập kho</Paragraph>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => navigate('/create-receipt')}
        >
          Tạo đơn nhập kho
        </Button>
      </div>

      <Card bordered={false} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.02)', borderRadius: '8px' }}>
        <Table
          dataSource={receipts}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10, showTotal: (total) => `Tổng ${total} phiếu` }}
        />
      </Card>

      {/* Pop-up receipt detail */}
      <Modal
        title={<Title level={4} style={{ margin: 0 }}>Thông Tin Chi Tiết Phiếu Nhập</Title>}
        open={isDetailOpen}
        onCancel={() => setIsDetailOpen(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setIsDetailOpen(false)}>
            Đóng
          </Button>
        ]}
        width={850}
        centered
      >
        {detailLoading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 0', gap: '12px' }}>
            <Spin size="large" />
            <div style={{ color: '#1677ff', fontSize: '14px' }}>Đang tải dữ liệu chi tiết...</div>
          </div>
        )}

        {!detailLoading && selectedReceipt && (
          <Space orientation="vertical" size="middle" style={{ width: '100%', marginTop: 16 }}>
            <Descriptions 
              bordered 
              column={2}
              size="small"
              styles={{
                label: {
                  fontWeight: 'bold', 
                  color: '#262626', 
                  background: '#eceeed'
                },
                content: {
                  background: '#ffffff'
                }
              }}
            >
              <Descriptions.Item label="Mã phiếu">{selectedReceipt.receiptNo}</Descriptions.Item>
              <Descriptions.Item label="Bộ phận">{selectedReceipt.department}</Descriptions.Item>
              <Descriptions.Item label="Đơn vị">{selectedReceipt.unitName}</Descriptions.Item>
              <Descriptions.Item label="Người giao hàng">{selectedReceipt.deliveryPerson}</Descriptions.Item>
              <Descriptions.Item label="Tên kho nhận">{selectedReceipt.warehouseName}</Descriptions.Item>
              <Descriptions.Item label="Vị trí lưu kho">{selectedReceipt.location || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Chứng từ kèm theo">{selectedReceipt.attachedDocument || 'Không có'}</Descriptions.Item>
              <Descriptions.Item label="Tổng tiền phiếu">
                <span style={{ color: '#52c41a', fontWeight: 'bold' }}>
                  {formatCurrency(Number(selectedReceipt.totalAmount))}
                </span>
              </Descriptions.Item>
            </Descriptions>

            <div style={{ fontWeight: 600, fontSize: '14px', marginTop: 8 }}>Danh sách sản phẩm:</div>
            <Table
              dataSource={selectedReceipt.items}
              columns={modalProductColumns}
              rowKey="id"
              pagination={false}
              size="small"
              bordered
            />
          </Space>
        )}
      </Modal>
    </Space>
  );
};

export default ReceiptListPage;
