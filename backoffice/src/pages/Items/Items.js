import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../features/Items/ItemsSlice';

const columns = [
  {
    title: 'Id',
    dataIndex: '_id',
    key: '_id',
    render: (text) => <a href="#">{text}</a>,
    width: '23%',
  },
  {
    title: 'Name',
    dataIndex: 'title',
    key: 'title',
    width: '23%',
  },
  {
    title: 'Brand id',
    dataIndex: 'brandId',
    key: 'brandId',
    render: (text) => <a href="#">{text}</a>,
    width: '23%',
  },
  {
    title: 'Category id',
    dataIndex: 'categoryIds',
    key: 'categoryIds',
    render: (categoryIds) => <a href="#">{categoryIds[0]}</a>,
    width: '23%',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (price) => <span>{price} $</span>,
    width: '8%',
  },
];

const Items = () => {
  const { value, isLoading } = useSelector(({ items }) => items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <div>
      <Table columns={columns} loading={isLoading} dataSource={value} />
    </div>
  );
};

export default Items;
