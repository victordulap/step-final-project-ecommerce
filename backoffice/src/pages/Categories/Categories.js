import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../features/Categories/CategoriesActions';

const columns = [
  {
    title: 'Id',
    dataIndex: '_id',
    key: '_id',
    render: (text) => <a href="#">{text}</a>,
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
      <Table columns={columns} loading={isLoading} dataSource={value} />
    </div>
  );
};

export default Categories;
