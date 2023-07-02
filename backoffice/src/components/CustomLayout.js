import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, Space } from 'antd';
import {
  DatabaseOutlined,
  ThunderboltOutlined,
  PieChartOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import { useDispatch, useSelector } from 'react-redux';
import { AuthActions } from '../features/Auth/AuthSlice';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const CustomLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const token = useSelector(({ auth }) => auth.token);

  useEffect(() => {
    (() => {
      if (!token) {
        dispatch(AuthActions.logout());
        return;
      }

      const payload = jwt_decode(token);

      if (!payload.username) {
        dispatch(AuthActions.logout());
        return;
      }

      localStorage.setItem('username', payload.username);
      setUser(payload.username);
    })();
  }, [dispatch, token]);

  const handleLogout = () => {
    dispatch(AuthActions.logout());
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div
          style={{
            padding: '1rem',
            color: '#fff',
            fontWeight: 700,
            textAlign: 'center',
            fontSize: collapsed ? '.85rem' : '1.5rem',
            transition: 'font-size .25s ease',
          }}
          className="logo"
        >
          <Link style={{ color: 'inherit' }} to="/">
            VD Clothes
          </Link>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <SubMenu key="sub1" icon={<DatabaseOutlined />} title="Items">
            <Menu.Item key="sub1.1">
              <Link to="/items">All items</Link>
            </Menu.Item>
            <Menu.Item key="sub1.2">
              <Link to="/items/add">Add item</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<ThunderboltOutlined />} title="Brands">
            <Menu.Item key="sub2.1">
              <Link to="/brands">All brands</Link>
            </Menu.Item>
            <Menu.Item key="sub2.2">
              <Link to="/brands/add">Add brand</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<PieChartOutlined />} title="Categories">
            <Menu.Item key="sub3.1">
              <Link to="/categories">All categories</Link>
            </Menu.Item>
            <Menu.Item key="sub3.2">
              <Link to="/categories/add">Add category</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item icon={<DollarCircleOutlined />} key="sub4">
            <Link to="/orders">Orders</Link>
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
            <Text style={{ color: '#fff' }}>{user}</Text>
            <Button
              onClick={handleLogout}
              style={{ color: '#fff' }}
              type="text"
            >
              logout
            </Button>
          </Space>
        </Header>
        <Content style={{ margin: '0 16px' }}>{children}</Content>
        <Footer style={{ textAlign: 'center' }}>
          ©2021 Created by Victor Dulap
        </Footer>
      </Layout>
    </Layout>
  );
};

export default CustomLayout;
