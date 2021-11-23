import React, { useEffect } from 'react';
import { Table, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrands } from '../../features/Brands/BrandsActions';

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

const Brands = () => {
  const { value, isLoading } = useSelector(({ brands }) => brands);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  return (
    <div>
      <Typography.Title className="mt-1" level={1}>
        Brands
      </Typography.Title>
      <Table columns={columns} loading={isLoading} dataSource={value} />
    </div>
  );
};

export default Brands;
