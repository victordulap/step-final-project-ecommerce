import React, { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb, Button, Space } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import { useDispatch } from 'react-redux';
import { AuthActions } from '../features/Auth/AuthSlice';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const CustomLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(AuthActions.logout());
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: '0 1rem',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Space direction="horizontal">
            <Text style={{ color: '#fff' }}>{user.username}</Text>
            <Button
              onClick={handleLogout}
              style={{ color: '#fff' }}
              type="text"
            >
              logout
            </Button>
          </Space>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default CustomLayout;
