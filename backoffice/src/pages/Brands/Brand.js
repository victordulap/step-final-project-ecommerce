import React, { useEffect } from 'react';
import { Input, Typography, Form, Button, Divider, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import FormWrap from '../../components/FormWrap';
import { useNavigate, useParams } from 'react-router';
import WrappedSpinner from '../../components/WrappedSpinner';
import { getBrand, removeBrand } from '../../features/Brands/BrandsActions';
import { brandActions } from '../../features/Brands/BrandsSlice';
import { STATE_STATUSES } from '../../util/constants';

const Brand = () => {
  const { brand, isLoading, status } = useSelector(({ brands }) => brands);
  const dispatch = useDispatch();
  const { brandId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBrand(brandId));
  }, [dispatch, brandId]);

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

  const formFields = brand
    ? [
        {
          label: 'Id',
          component: <Input value={brand._id} disabled />,
        },
        {
          label: 'Name',
          component: <Input value={brand.name} disabled />,
        },
        {
          label: 'Image URL',
          component: (
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

        <Button onClick={deleteBrand} danger type="primary" loading={isLoading}>
          Delete brand
        </Button>
      </FormWrap>
    </>
  );
};

export default Brand;
