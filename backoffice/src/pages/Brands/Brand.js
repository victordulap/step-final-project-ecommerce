import React, { useCallback, useEffect, useState } from 'react';
import { Input, Typography, Form, Button, Divider, message, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import FormWrap from '../../components/FormWrap';
import { useNavigate, useParams } from 'react-router';
import WrappedSpinner from '../../components/WrappedSpinner';
import { getBrand, removeBrand } from '../../features/Brands/BrandsActions';
import { brandActions } from '../../features/Brands/BrandsSlice';
import { STATE_STATUSES } from '../../util/constants';
import { DeleteOutlined, EditOutlined, StopOutlined } from '@ant-design/icons';

const Brand = () => {
  const { brand, isLoading, status } = useSelector(({ brands }) => brands);
  const dispatch = useDispatch();
  const { brandId } = useParams();
  const navigate = useNavigate();
  const [isEditingMode, setIsEditingMode] = useState(false);

  const [editValues, setEditValues] = useState({
    name: '',
    imgUrl: '',
  });

  useEffect(() => {
    dispatch(getBrand(brandId));
  }, [dispatch, brandId]);

  const resetEditValues = useCallback(() => {
    if (brand) {
      setEditValues({
        name: brand.name,
        imgUrl: brand.imgUrl,
      });
    }
  }, [brand]);

  useEffect(() => {
    resetEditValues();
  }, [resetEditValues]);

  useEffect(() => {
    if (status === STATE_STATUSES.SUCCESS) {
      message.success('brand removed!');
      dispatch(brandActions.resetStatus());
      navigate('/brands');
    } else if (status === STATE_STATUSES.ERROR) message.error('brand not removed!');
  }, [dispatch, navigate, status]);

  const deleteBrand = () => {
    if (brand) {
      dispatch(removeBrand(brand._id));
    }
  };

  const handleEdit = (key, newValue) => {
    setEditValues((old) => ({ ...old, [key]: newValue }));
  };

  const formFields = brand
    ? [
        {
          label: 'Id',
          component: <Input defaultValue={brand._id} disabled />,
        },
        {
          label: 'Name',
          component: <Input value={editValues.name} onChange={(e) => handleEdit('name', e.target.value)} disabled={!isEditingMode} />,
        },
        {
          label: 'Image URL',
          component: isEditingMode ? (
            <Input onChange={(e) => handleEdit('imgUrl', e.target.value)} value={editValues.imgUrl} />
          ) : (
            <a href={brand.imgUrl} target="_blank" rel="noreferrer">
              {brand.imgUrl}
            </a>
          ),
        },
      ]
    : [];

  if (isLoading) {
    return <WrappedSpinner />;
  }

  return (
    <>
      <Typography.Title className="mt-1" level={1}>
        Brand
      </Typography.Title>
      <FormWrap>
        <Form name="basic" labelCol={{ span: 2 }} wrapperCol={{ span: 10 }} initialValues={{ remember: true }} autoComplete="off">
          {formFields.map((f) => (
            <Form.Item key={`brand-${f.label}`} label={f.label}>
              {f.component}
            </Form.Item>
          ))}
        </Form>

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
              <Button onClick={() => {}} icon={<EditOutlined />} loading={isLoading}>
                Confirm edit
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsEditingMode(true)} icon={<EditOutlined />} type="primary" loading={isLoading}>
                Edit brand
              </Button>
              <Button onClick={deleteBrand} danger icon={<DeleteOutlined />} loading={isLoading}>
                Delete brand
              </Button>
            </>
          )}
        </div>
      </FormWrap>
    </>
  );
};

export default Brand;
