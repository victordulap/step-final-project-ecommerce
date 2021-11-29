import React, { useEffect } from 'react';
import { Table, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../features/Items/ItemsActions';
import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'Id',
    dataIndex: '_id',
    key: '_id',
    render: (id) => <Link to={`/items/${id}`}>{id}</Link>,
    width: '23%',
  },
  {
    title: 'Name',
    dataIndex: 'title',
    key: 'title',
    width: '23%',
  },
  {
    title: 'Brand',
    dataIndex: 'brandId',
    key: 'brandId',
    render: (id, rec) => <Link to={`/brands/${id}`}>{rec.brand.name}</Link>,
    width: '23%',
  },
  {
    title: 'Category id',
    dataIndex: 'categoryIds',
    key: 'categoryIds',
    render: (categoryIds, rec) => <Link to={`/categories/${categoryIds[0]}`}>{rec.category.name}</Link>,
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
      <Typography.Title className="mt-1" level={1}>
        Items
      </Typography.Title>{' '}
      <Table columns={columns} loading={isLoading} dataSource={value} />
    </div>
  );
};

export default Items;
