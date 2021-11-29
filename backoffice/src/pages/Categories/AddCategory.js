import React, { useEffect } from 'react';
import { Input, Typography, Form, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import FormWrap from '../../components/FormWrap';
import { STATE_STATUSES } from '../../util/constants';
import { useNavigate } from 'react-router';
import { addCategory } from '../../features/Categories/CategoriesActions';
import { categoryActions } from '../../features/Categories/CategoriesSlice';

const AddCategory = () => {
  const { isLoading, status } = useSelector(({ categories }) => categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === STATE_STATUSES.SUCCESS) {
      message.success('category added!');
      dispatch(categoryActions.resetStatus());
      navigate('/categories');
    } else if (status === STATE_STATUSES.ERROR) message.error('category not added!');
  }, [dispatch, navigate, status]);

  const formFields = [
    {
      label: 'Name',
      name: 'name',
      component: <Input placeholder="T-Shirts" />,
    },
    {
      label: 'Image URL',
      name: 'imgUrl',
      component: <Input placeholder="http://www.yoururltoimg.com/t-shirts.png" />,
    },
  ];
  const onSubmit = (values) => {
    dispatch(addCategory(values));
  };

  return (
    <>
      <Typography.Title className="mt-1" level={1}>
        Add Category
      </Typography.Title>
      <FormWrap>
        <Form onFinish={onSubmit} name="basic" labelCol={{ span: 2 }} wrapperCol={{ span: 10 }} autoComplete="off">
          {formFields.map((f) => (
            <Form.Item rules={[{ required: true, message: 'Enter value!' }]} name={f.name} key={`category-add-${f.label}`} label={f.label}>
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

export default AddCategory;
