import React, { useEffect } from 'react';
import { Table, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../features/Categories/CategoriesActions';
import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'Id',
    dataIndex: '_id',
    key: '_id',
    render: (id) => <Link to={`/categories/${id}`}>{id}</Link>,
    width: '30%',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
];

const Categories = () => {
  const { value, isLoading } = useSelector(({ categories }) => categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div>
      <Typography.Title className="mt-1" level={1}>
        Categories
      </Typography.Title>
      <Table columns={columns} loading={isLoading} dataSource={value} />
    </div>
  );
};

export default Categories;
