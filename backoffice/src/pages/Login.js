import React, { useEffect } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../features/Auth/AuthActions';
import { useNavigate } from 'react-router-dom';
import { STATE_STATUSES } from '../util/constants';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(({ auth }) => auth.token);
  const authStatus = useSelector(({ auth }) => auth.status);

  useEffect(() => {
    if (isAuth) navigate('/');
  });

  useEffect(() => {
    if (authStatus === STATE_STATUSES.ERROR) message.error('login or password incorrect');
  });

  const onFinish = (values) => {
    dispatch(authAction(values));
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Card title="Login" bordered={true} style={{ width: 500 }}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={authStatus === STATE_STATUSES.LOADING}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
