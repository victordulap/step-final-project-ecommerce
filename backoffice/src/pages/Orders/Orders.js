import React, { useEffect } from 'react';
import { Table, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../features/Orders/OrdersActions';
import { formatToDateTime } from '../../util/date';
import { Link } from 'react-router-dom';
import moment from 'moment';

const columns = [
  {
    title: 'Id',
    dataIndex: '_id',
    key: '_id',
    render: (id) => <Link to={`/orders/${id}`}>{id}</Link>,
    width: '20%',
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    width: '10%',
    render: (text) => <>{text} $</>,
    sorter: (a, b) => a.total - b.total,
  },
  {
    title: 'Total items',
    dataIndex: 'cart',
    key: 'total_items',
    render: (cart) => cart.length,
    width: '10%',
    sorter: (a, b) => a.cart.length - b.cart.length,
  },
  {
    title: 'Shipping country',
    dataIndex: 'shippingDetails',
    key: 'total_items',
    render: (shippingDetails) => `${shippingDetails.country}, ${shippingDetails.city}`,
  },
  {
    title: 'Order date',
    dataIndex: 'createdAt',
    key: 'order_date',
    render: (createdAt) => formatToDateTime(createdAt),
    sorter: (a, b) => moment(a.createdAt) - moment(b.createdAt),
    defaultSortOrder: 'descend',
  },
  {
    title: 'Shipped',
    dataIndex: 'isShipped',
    key: 'isShipped',
    render: (key) => <span>{key ? 'Yes' : 'No'}</span>,
    filters: [
      {
        text: 'Yes',
        value: true,
      },
      {
        text: 'No',
        value: false,
      },
    ],
    onFilter: (value, record) => record.isShipped === value,
  },
];

const Orders = () => {
  const { value, isLoading } = useSelector(({ orders }) => orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <div>
      <Typography.Title className="mt-1" level={1}>
        Orders
      </Typography.Title>
      <Table rowKey="_id" columns={columns} loading={isLoading} dataSource={value} />
    </div>
  );
};

export default Orders;
