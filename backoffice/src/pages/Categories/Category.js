import React, { useEffect } from 'react';
import { Input, Typography, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../features/Categories/CategoriesActions';
import FormWrap from '../../components/FormWrap';
import { useParams } from 'react-router';
import WrappedSpinner from '../../components/WrappedSpinner';

const Category = () => {
  const { category, isLoading } = useSelector(({ categories }) => categories);
  const dispatch = useDispatch();
  const { categoryId } = useParams();

  useEffect(() => {
    dispatch(getCategory(categoryId));
  }, [dispatch, categoryId]);

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
      </FormWrap>
    </>
  );
};

export default Category;
