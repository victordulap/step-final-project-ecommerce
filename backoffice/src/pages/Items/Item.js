import React, { useCallback, useEffect, useState } from 'react';
import { Input, Typography, Form, Checkbox, Row, Col, Image, Button, Divider, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import FormWrap from '../../components/FormWrap';
import { useParams, useNavigate } from 'react-router-dom';
import WrappedSpinner from '../../components/WrappedSpinner';
import { deleteItem, getItemById } from '../../features/Items/ItemsActions';
import SizesTable from './components/SizesTable';
import { DeleteOutlined, EditOutlined, StopOutlined } from '@ant-design/icons';
import { getAllBrands } from '../../features/Brands/BrandsActions';
import { getAllCategories } from '../../features/Categories/CategoriesActions';
import { STATE_STATUSES } from '../../util/constants';
import { resetStatus } from '../../features/Items/ItemsSlice';

const Item = () => {
  const { isLoading: isLoadingCategories, value: categories } = useSelector(({ categories }) => categories);
  const { isLoading: isLoadingBrands, value: brands } = useSelector(({ brands }) => brands);
  const { item, isLoading, status } = useSelector(({ items }) => items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [editValues, setEditValues] = useState({
    title: '',
    brandId: '',
    categoryIds: [''],
    color: '',
    price: 0,
    sizes: [''],
    description: '',
    available: false,
    imgUrl: '',
  });

  useEffect(() => {
    dispatch(getItemById(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getAllCategories());
  }, [dispatch]);

  const resetEditValues = useCallback(() => {
    if (item) {
      setEditValues(item);
    }
  }, [item]);

  useEffect(() => {
    resetEditValues();
  }, [resetEditValues]);

  const handleEdit = (key, newValue) => {
    setEditValues((old) => ({ ...old, [key]: newValue }));
  };

  useEffect(() => {
    if (status === STATE_STATUSES.SUCCESS) {
      message.success(`item ${isEditingMode ? 'edited' : 'deleted'}!`);
      navigate('/items');
      dispatch(resetStatus());
    } else if (status === STATE_STATUSES.ERROR) message.error(`error occured ${isEditingMode ? 'editing' : 'deleting'} item!`);
  }, [dispatch, isEditingMode, navigate, status]);

  const formFields =
    item && item.brand
      ? [
          {
            label: 'Id',
            component: <Input value={item._id} disabled />,
          },
          {
            label: 'Name',
            component: <Input value={editValues['title']} onChange={(e) => handleEdit('title', e.target.value)} disabled={!isEditingMode} />,
          },
          {
            label: 'Brand',
            component: (
              <Select
                disabled={!isEditingMode}
                value={editValues['brandId']}
                onChange={(e) => handleEdit('brandId', e)}
                showSearch
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
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
            component: (
              <Select
                showSearch
                value={editValues['categoryIds']}
                onChange={(e) => handleEdit('categoryIds', e)}
                disabled={!isEditingMode}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
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
            component: <Input value={editValues['color']} onChange={(e) => handleEdit('color', e.target.value)} disabled={!isEditingMode} />,
          },
          {
            label: 'Price',
            component: <Input value={editValues['price']} onChange={(e) => handleEdit('price', e.target.value)} disabled={!isEditingMode} />,
          },
          {
            label: 'Description',
            component: (
              <Input.TextArea
                value={editValues['description']}
                onChange={(e) => handleEdit('description', e.target.value)}
                disabled={!isEditingMode}
              />
            ),
          },
          {
            label: 'Available',
            component: (
              <Checkbox checked={editValues['available']} onChange={(e) => handleEdit('available', e.target.checked)} disabled={!isEditingMode} />
            ),
          },
          {
            label: 'Image URL',
            component: <Input value={editValues['imgUrl']} onChange={(e) => handleEdit('imgUrl', e.target.value)} disabled={!isEditingMode} />,
          },
          {
            label: 'Sizes',
            component: <SizesTable onChange={(e) => handleEdit('sizes', e)} sizesState={editValues['sizes']} disabled={!isEditingMode} />,
          },
        ]
      : [];

  if (isLoading || isLoadingBrands || isLoadingCategories) {
    return <WrappedSpinner />;
  }

  return (
    <>
      <Typography.Title className="mt-1" level={1}>
        Item
      </Typography.Title>
      <FormWrap>
        <Row gutter={16}>
          <Col span={12}>
            <Form name="basic" labelCol={{ span: 4 }} initialValues={{ remember: true }} autoComplete="off">
              {formFields.map((f) => (
                <Form.Item key={`item-${f.label}`} label={f.label}>
                  {f.component}
                </Form.Item>
              ))}
            </Form>
          </Col>
          <Col span={12}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Image
                src={item.imgUrl || 'error'}
                fallback="data:image/png;base64,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"
              />
            </div>
          </Col>
        </Row>
        <Divider />

        <div className="flex-between">
          {isEditingMode ? (
            <>
              <Button
                onClick={() => {
                  setIsEditingMode(false);
                  resetEditValues();
                }}
                icon={<StopOutlined />}
                type="primary"
                loading={isLoading}
              >
                Cancel editing
              </Button>
              <Button
                onClick={() => {
                  // editModel();
                  // dispatch edit item
                }}
                icon={<EditOutlined />}
                loading={isLoading}
              >
                Confirm edit
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsEditingMode(true)} icon={<EditOutlined />} type="primary" loading={isLoading}>
                Edit item
              </Button>
              <Button
                onClick={() => {
                  dispatch(deleteItem(id));
                }}
                danger
                icon={<DeleteOutlined />}
                loading={isLoading}
              >
                Delete item
              </Button>
            </>
          )}
        </div>
      </FormWrap>
    </>
  );
};

export default Item;
