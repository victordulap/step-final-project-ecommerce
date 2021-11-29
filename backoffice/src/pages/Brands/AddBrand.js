import React, { useEffect } from 'react';
import { Input, Typography, Form, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import FormWrap from '../../components/FormWrap';
import { addBrand } from '../../features/Brands/BrandsActions';
import { STATE_STATUSES } from '../../util/constants';
import { Navigate, useNavigate } from 'react-router';
import { brandActions } from '../../features/Brands/BrandsSlice';

const AddBrand = () => {
  const { isLoading, status } = useSelector(({ brands }) => brands);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === STATE_STATUSES.SUCCESS) {
      message.success('brand added!');
      dispatch(brandActions.resetStatus());
      navigate('/brands');
    } else if (status === STATE_STATUSES.ERROR) message.error('brand not added!');
  }, [dispatch, navigate, status]);

  const formFields = [
    {
      label: 'Name',
      name: 'name',
      component: <Input placeholder="Nike" />,
    },
    {
      label: 'Image URL',
      name: 'imgUrl',
      component: <Input placeholder="http://www.yoururltoimg.com/nike.png" />,
    },
  ];
  const onSubmit = (values) => {
    dispatch(addBrand(values));
  };

  return (
    <>
      <Typography.Title className="mt-1" level={1}>
        Add Brand
      </Typography.Title>
      <FormWrap>
        <Form onFinish={onSubmit} name="basic" labelCol={{ span: 2 }} wrapperCol={{ span: 10 }} autoComplete="off">
          {formFields.map((f) => (
            <Form.Item rules={[{ required: true, message: 'Enter value!' }]} name={f.name} key={`brand-add-${f.label}`} label={f.label}>
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

export default AddBrand;
