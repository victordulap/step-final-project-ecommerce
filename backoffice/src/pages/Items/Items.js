import React, { useEffect } from 'react';
import { Table, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../features/Items/ItemsActions';
import { Link } from 'react-router-dom';

const Items = () => {
  const { value, isLoading } = useSelector(({ items }) => items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

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
      filters: value
        ? value
            .map((v) => v.brand)
            .filter((v, i, a) => a.findIndex((t) => t._id === v._id) === i)
            .map((res) => ({ text: res.name, value: res.name }))
        : [],
      onFilter: (value, record) => record.brand.name.indexOf(value) === 0,
      width: '23%',
    },
    {
      title: 'Category',
      dataIndex: 'categoryIds',
      key: 'categoryIds',
      render: (categoryIds, rec) => <Link to={`/categories/${categoryIds[0]}`}>{rec.category.name}</Link>,
      filters: value
        ? value
            .map((v) => v.category)
            .filter((v, i, a) => a.findIndex((t) => t._id === v._id) === i)
            .map((res) => ({ text: res.name, value: res.name }))
        : [],
      onFilter: (value, record) => record.category.name.indexOf(value) === 0,
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
