import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Space, Table, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../features/Items/ItemsActions';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import { DATE_TIME_FORMAT, DEFAULT_DATE } from '../../util/constants';

const Items = () => {
  const { value, isLoading } = useSelector(({ items }) => items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef('');

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => (record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : ''),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#C0E1E8', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: '_id',
      key: '_id',
      render: (id) => <Link to={`/items/${id}`}>{id}</Link>,
      width: '15%',
    },
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
      // width: '23%',
      ...getColumnSearchProps('title'),
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
      // width: '23%',
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
      // width: '23%',
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => <span>{createdAt ? moment(createdAt).format(DATE_TIME_FORMAT) : moment(DEFAULT_DATE).format(DATE_TIME_FORMAT)}</span>,
      // width: '8%',
      sorter: (a, b) => moment(a.createdAt || DEFAULT_DATE) - moment(b.createdAt || DEFAULT_DATE),
      defaultSortOrder: 'descend',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => <span>{price} $</span>,
      // width: '8%',
      sorter: (a, b) => a.price - b.price,
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
