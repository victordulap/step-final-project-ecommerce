import React, { useEffect } from 'react';
import { Input, Table, Typography, Form, Checkbox, DatePicker, Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import FormWrap from '../../components/FormWrap';
import { useParams } from 'react-router';
import WrappedSpinner from '../../components/WrappedSpinner';
import { getOrder } from '../../features/Orders/OrdersActions';
import moment from 'moment';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Order = () => {
  const { order, isLoading } = useSelector(({ orders }) => orders);
  const dispatch = useDispatch();
  const { orderId } = useParams();

  useEffect(() => {
    dispatch(getOrder(orderId));
  }, [dispatch, orderId]);

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
          label: 'Shipped',
          component: (
            <Checkbox checked={order.isShipped} disabled>
              {`${!!order.isShipped}`}
            </Checkbox>
          ),
        },
        {
          label: 'Payment success',
          component: (
            <Checkbox checked={order.paymentStatusSuccess} disabled>
              {`${!!order.paymentStatusSuccess}`}
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

  return (
    <>
      <Title className="mt-1" level={1}>
        Order
      </Title>
      <FormWrap>
        <Form name="basic" labelCol={{ span: 2 }} wrapperCol={{ span: 10 }} initialValues={{ remember: true }} autoComplete="off">
          <Title className="mb-2" level={3}>
            Order details
          </Title>
          {formFields.map((f) => (
            <Form.Item key={`order-${f.label}`} label={f.label}>
              {f.component}
            </Form.Item>
          ))}

          <Divider />

          <Title className="mb-2" level={3}>
            Shipping details
          </Title>
          {shippingFormFields.map((f) => (
            <Form.Item key={`order-shipping-${f.label}`} label={f.label}>
              {f.component}
            </Form.Item>
          ))}

          <Divider />

          <Title className="mb-2" level={3}>
            Cart items
          </Title>
          <Table loading={isLoading} dataSource={order.cart} columns={cartColumns} />
        </Form>
      </FormWrap>
    </>
  );
};

export default Order;
