import React, { useEffect, useState } from 'react';
import { Input, Table, Typography, Form, Checkbox, DatePicker, Divider, Row, Col, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import FormWrap from '../../components/FormWrap';
import { useNavigate, useParams } from 'react-router';
import WrappedSpinner from '../../components/WrappedSpinner';
import { deleteOrder, getOrder, updateOrder } from '../../features/Orders/OrdersActions';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined, StopOutlined } from '@ant-design/icons';
import { STATE_STATUSES } from '../../util/constants';
import { resetStatus } from '../../features/Orders/OrdersSlice';

const { Title } = Typography;

const Order = () => {
  const { order, isLoading, status } = useSelector(({ orders }) => orders);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [isShippedState, setIsShippedState] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (order) {
      setIsShippedState(order.isShipped);
    }
  }, [order]);

  useEffect(() => {
    if (status === STATE_STATUSES.SUCCESS) {
      message.success(`order ${isEditingMode ? 'edited' : 'deleted'}!`);
      navigate('/orders');
      dispatch(resetStatus());
    } else if (status === STATE_STATUSES.ERROR) {
      message.error(`error occured ${isEditingMode ? 'editing' : 'deleting'} order!`);
      dispatch(resetStatus());
    }
  }, [dispatch, isEditingMode, navigate, status]);

  const formFields = order
    ? [
        {
          label: 'Id',
          component: <Input value={order._id} disabled />,
        },

        {
          label: 'Total',
          component: <Input value={order.total + '$'} disabled />,
        },
        {
          label: 'Order date',
          component: <DatePicker value={moment(order.createdAt)} showTime disabled />,
        },
        {
          label: 'Payment success',
          component: (
            <Checkbox checked={order.paymentStatusSuccess} disabled>
              {`${!!order.paymentStatusSuccess}`}
            </Checkbox>
          ),
        },
        {
          label: 'Shipped',
          component: (
            <Checkbox checked={isShippedState} onChange={(e) => setIsShippedState(e.target.checked)} disabled={!isEditingMode}>
              {`${!!isShippedState}`}
            </Checkbox>
          ),
        },
      ]
    : [];

  const shippingFormFields = order.shippingDetails
    ? [
        {
          label: 'Client Name',
          component: <Input value={order.shippingDetails.firstName + ' ' + order.shippingDetails.lastName} disabled />,
        },
        {
          label: 'Mobile nr',
          component: <Input value={order.shippingDetails.mobile} disabled />,
        },
        {
          label: 'Email',
          component: <Input value={order.shippingDetails.email} disabled />,
        },
        {
          label: 'Country',
          component: <Input value={order.shippingDetails.country} disabled />,
        },
        {
          label: 'City',
          component: <Input value={order.shippingDetails.city} disabled />,
        },
        {
          label: 'Postcode',
          component: <Input value={order.shippingDetails.postcode} disabled />,
        },
        {
          label: 'Address',
          component: <Input value={order.shippingDetails.address} disabled />,
        },
      ]
    : [];

  const cartColumns = order.cart
    ? [
        {
          title: 'Item id',
          dataIndex: 'itemId',
          key: 'itemId',
          render: (id) => <Link to={`/items/${id}`}>{id}</Link>,
        },
        {
          title: 'name',
          dataIndex: 'itemName',
          key: 'itemName',
          render: (text) => <>{text || 'N/A'}</>,
        },
        {
          title: 'count',
          dataIndex: 'count',
          key: 'count',
        },
        {
          title: 'Selected size',
          dataIndex: 'selectedSize',
          key: 'selectedSize',
        },
      ]
    : [];

  if (isLoading) {
    return <WrappedSpinner />;
  }

  const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 15,
    },
  };
  return (
    <>
      <Title className="mt-1" level={1}>
        Order
      </Title>
      <FormWrap>
        <Form name="basic" initialValues={{ remember: true }} autoComplete="off">
          <Row gutter={32}>
            <Col span={12}>
              <Title className="mb-2" level={3}>
                Order details
              </Title>
              {formFields.map((f) => (
                <Form.Item {...layout} key={`order-${f.label}`} label={f.label}>
                  {f.component}
                </Form.Item>
              ))}
            </Col>
            <Col span={12}>
              <Title className="mb-2" level={3}>
                Shipping details
              </Title>
              {shippingFormFields.map((f) => (
                <Form.Item {...layout} key={`order-shipping-${f.label}`} label={f.label}>
                  {f.component}
                </Form.Item>
              ))}
            </Col>
          </Row>

          <Divider />

          <Title className="mb-2" level={3}>
            Cart items
          </Title>
          <Table loading={isLoading} dataSource={order.cart} columns={cartColumns} />
        </Form>

        <Divider />

        <div className="flex-between">
          {isEditingMode ? (
            <>
              <Button
                onClick={() => {
                  setIsEditingMode(false);
                  setIsShippedState(order.isShipped);
                }}
                icon={<StopOutlined />}
                type="primary"
                loading={isLoading}
              >
                Cancel editing
              </Button>
              <Button onClick={() => dispatch(updateOrder({ id, order: { isShipped: isShippedState } }))} icon={<EditOutlined />} loading={isLoading}>
                Confirm edit
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsEditingMode(true)} icon={<EditOutlined />} type="primary" loading={isLoading}>
                Edit order
              </Button>
              <Button
                onClick={() => {
                  dispatch(deleteOrder(id));
                }}
                danger
                icon={<DeleteOutlined />}
                loading={isLoading}
              >
                Delete order
              </Button>
            </>
          )}
        </div>
      </FormWrap>
    </>
  );
};

export default Order;
