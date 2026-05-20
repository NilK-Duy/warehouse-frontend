import React from 'react';
import { Table, InputNumber, Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { type ReceiptItemForm } from '../../types/receipt';
import { formatCurrency } from '../../utils/currency';

interface ReceiptItemsTableProps {
  items: ReceiptItemForm[];
  onChange: (index: number, field: keyof ReceiptItemForm, value: number) => void;
  onRemove: (index: number) => void;
}

const ReceiptItemsTable: React.FC<ReceiptItemsTableProps> = ({ items, onChange, onRemove }) => {
  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: ['product', 'name'],
      key: 'name',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 130,
      render: (value: number, _: any, index: number) => (
        <InputNumber
          min={1}
          value={value}
          onChange={(val) => onChange(index, 'quantity', val || 0)}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: 'Số lượng thực nhập',
      dataIndex: 'actualQuantity',
      key: 'actualQuantity',
      width: 130,
      render: (value: number, _: any, index: number) => (
        <InputNumber
          min={0}
          value={value}
          onChange={(val) => onChange(index, 'actualQuantity', val || 0)}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: 'Đơn giá',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      width: 160,
      render: (value: number, _: any, index: number) => (
        <InputNumber
          min={0}
          formatter={(val) => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          value={value}
          onChange={(val) => onChange(index, 'unitPrice', val || 0)}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'amount',
      key: 'amount',
      width: 150,
      render: (amount: number) => (
        <span style={{ fontWeight: 'bold' }}>{formatCurrency(amount)}</span>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 80,
      render: (_: any, __: any, index: number) => (
        <Popconfirm
          title="Loại bỏ sản phẩm này?"
          onConfirm={() => onRemove(index)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger ghost icon={<DeleteOutlined />} size="small" />
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table
      dataSource={items}
      columns={columns}
      rowKey={(record) => record.productId}
      pagination={false}
      locale={{ emptyText: 'Đơn của bạn chưa có sản phẩm nào' }}
    />
  );
};

export default ReceiptItemsTable;
