import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

const { Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <FileTextOutlined />,
      label: 'Nhập hàng',
    },
  ];

  const getSelectedMenuKey = () => {
    const path = location.pathname;
    if (path === '/create-receipt' || path.startsWith('/receipts/')) {
      return ['/'];
    }
    return [path];
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        theme="light"
        style={{
          boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
        }}
        width={240}
      >
        <div style={{ height: 64, margin: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f0f0f0', cursor: 'pointer' }}>
          <h2 style={{ margin: 0, color: '#1677ff', fontSize: '18px', fontWeight: 'bold' }}>WMS MANAGER</h2>
        </div>
        <Menu
          mode="inline"
          selectedKeys={getSelectedMenuKey()}
          items={menuItems}
          onClick={(e) => navigate(e.key)}
        />
      </Sider>

      <Layout style={{ marginLeft: 240, transition: 'all 0.2s' }}>
        <Content style={{ margin: '24px 0', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '1200px', padding: '0 24px' }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
