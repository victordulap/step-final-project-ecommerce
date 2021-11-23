import React, { useEffect } from 'react';
import { Input, Typography, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import FormWrap from '../../components/FormWrap';
import { useParams } from 'react-router';
import WrappedSpinner from '../../components/WrappedSpinner';
import { getBrand } from '../../features/Brands/BrandsActions';

const Brand = () => {
  const { brand, isLoading } = useSelector(({ brands }) => brands);
  const dispatch = useDispatch();
  const { brandId } = useParams();

  useEffect(() => {
    dispatch(getBrand(brandId));
  }, [dispatch, brandId]);

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
      </FormWrap>
    </>
  );
};

export default Brand;
