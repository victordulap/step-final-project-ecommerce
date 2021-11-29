import React, { useEffect } from 'react';
import { Input, Typography, Form, Button, message, Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, removeCategory } from '../../features/Categories/CategoriesActions';
import FormWrap from '../../components/FormWrap';
import { useNavigate, useParams } from 'react-router';
import WrappedSpinner from '../../components/WrappedSpinner';
import { STATE_STATUSES } from '../../util/constants';
import { categoryActions } from '../../features/Categories/CategoriesSlice';

const Category = () => {
  const { category, isLoading, status } = useSelector(({ categories }) => categories);
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategory(categoryId));
  }, [dispatch, categoryId]);

  useEffect(() => {
    if (status === STATE_STATUSES.SUCCESS) {
      message.success('category removed!');
      dispatch(categoryActions.resetStatus());
      navigate('/categories');
    } else if (status === STATE_STATUSES.ERROR) message.error('category not removed!');
  }, [dispatch, navigate, status]);

  const deleteCategory = () => {
    if (category) {
      dispatch(removeCategory(category._id));
    }
  };

  const formFields = category
    ? [
        {
          label: 'Id',
          component: <Input value={category._id} disabled />,
        },
        {
          label: 'Name',
          component: <Input value={category.name} disabled />,
        },
        {
          label: 'Image URL',
          component: (
            <a href={category.imgUrl} target="_blank" rel="noreferrer">
              {category.imgUrl}
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
        Category
      </Typography.Title>
      <FormWrap>
        <Form name="basic" labelCol={{ span: 2 }} wrapperCol={{ span: 10 }} initialValues={{ remember: true }} autoComplete="off">
          {formFields.map((f) => (
            <Form.Item key={`category-${f.label}`} label={f.label}>
              {f.component}
            </Form.Item>
          ))}
        </Form>

        <Divider />
        <Button onClick={deleteCategory} danger type="primary" loading={isLoading}>
          Delete brand
        </Button>
      </FormWrap>
    </>
  );
};

export default Category;
