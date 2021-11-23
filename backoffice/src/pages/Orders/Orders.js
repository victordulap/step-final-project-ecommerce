import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../features/Orders/OrdersActions';
import { formatToDateTime } from '../../util/date';

const columns = [
  {
    title: 'Id',
    dataIndex: '_id',
    key: '_id',
    render: (text) => <a href="#">{text}</a>,
    width: '20%',
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    width: '10%',
  },
  {
    title: 'Total items',
    dataIndex: 'cart',
    key: 'total_items',
    render: (cart) => cart.length,
    width: '10%',
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
  },
  {
    title: 'Shipped',
    dataIndex: 'isShipped',
    key: 'isShipped',
    render: (isShipped) => `${isShipped}`,
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
      <Table columns={columns} loading={isLoading} dataSource={value} />
    </div>
  );
};

export default Orders;
