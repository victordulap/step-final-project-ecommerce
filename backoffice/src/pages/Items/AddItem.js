import React, { useEffect, useState } from 'react';
import { Input, Typography, Form, Button, message, InputNumber, Checkbox, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import FormWrap from '../../components/FormWrap';
import { STATE_STATUSES } from '../../util/constants';
import { useNavigate } from 'react-router';
import { getAllCategories } from '../../features/Categories/CategoriesActions';
import SizesTable from './components/SizesTable';
import { getAllBrands } from '../../features/Brands/BrandsActions';
import WrappedSpinner from '../../components/WrappedSpinner';
import { resetStatus } from '../../features/Items/ItemsSlice';
import { addItem } from '../../features/Items/ItemsActions';

const AddItem = () => {
  const { isLoading: isLoadingCategories, value: categories } = useSelector(({ categories }) => categories);
  const { isLoading: isLoadingBrands, value: brands } = useSelector(({ brands }) => brands);
  const { isLoading, status } = useSelector(({ items }) => items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sizeValues, setSizeValues] = useState([]);
  const [isSizesValid, setIsSizesValid] = useState(false);

  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (status === STATE_STATUSES.SUCCESS) {
      message.success('item added!');
      dispatch(resetStatus());
      navigate('/items');
    } else if (status === STATE_STATUSES.ERROR) message.error('item not added!');
  }, [dispatch, navigate, status]);

  if (isLoadingBrands || isLoadingCategories) return <WrappedSpinner />;

  const handleSizeChange = (e) => {
    setSizeValues(e);
  };

  const formFields = [
    {
      label: 'Name',
      name: 'title',
      component: <Input placeholder="Air force 1" />,
    },
    {
      label: 'Brand',
      name: 'brandId',
      component: (
        <Select placeholder="Nike" showSearch filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
          {brands.map((brand) => (
            <Select.Option key={`item-brand-${brand._id}`} value={brand._id}>
              {brand.name}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      label: 'Category',
      name: 'categoryIds',
      component: (
        <Select placeholder="Shoes" showSearch filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
          {categories.map((category) => (
            <Select.Option key={`item-category-${category._id}`} value={category._id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      label: 'Color',
      name: 'color',
      component: <Input placeholder="white" />,
    },
    {
      label: 'Image URL',
      name: 'imgUrl',
      component: <Input placeholder="https://linktoimg.com/img-name.png" />,
    },
    {
      label: 'Description',
      name: 'description',
      component: <Input.TextArea placeholder="Matte leather upper" />,
    },
    {
      label: 'Sizes',
      name: 'sizes',
      component: <SizesTable onChange={handleSizeChange} />,
    },
    {
      label: 'Price',
      name: 'price',
      component: <InputNumber addonAfter="$" min={1} placeholder="100" />,
    },
    {
      label: 'Available',
      name: 'available',
      valuePropName: 'checked',
      component: <Checkbox />,
    },
  ];

  const onSubmit = (values) => {
    const newItem = { ...values };
    newItem.categoryIds = [newItem.categoryIds];
    newItem.available = !!newItem.available;
    console.log(newItem);
    dispatch(addItem(newItem));
  };

  return (
    <>
      <Typography.Title className="mt-1" level={1}>
        Add Item
      </Typography.Title>
      <FormWrap>
        <Form onFinish={onSubmit} name="basic" labelCol={{ span: 2 }} wrapperCol={{ span: 10 }} autoComplete="off">
          {formFields.map((f) => (
            <Form.Item
              rules={
                f.name === 'sizes'
                  ? [{ required: !isSizesValid, message: 'Select sizes!' }]
                  : f.name === 'available'
                  ? []
                  : [{ required: true, message: 'Enter value!' }]
              }
              name={f.name}
              key={`category-add-${f.label}`}
              label={f.label}
              valuePropName={f.valuePropName}
            >
              {f.component}
            </Form.Item>
          ))}
          <Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </FormWrap>
    </>
  );
};

export default AddItem;
