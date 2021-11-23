import React, { useEffect } from 'react';
import { Input, Typography, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../features/Categories/CategoriesActions';
import FormWrap from '../../components/FormWrap';
import { useParams } from 'react-router';
import WrappedSpinner from '../../components/WrappedSpinner';

const Category = () => {
  const { value, isLoading } = useSelector(({ categories }) => categories);
  const dispatch = useDispatch();
  const { categoryId } = useParams();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const formFields = [
    {
      label: 'Id',
      component: <Input value={1} disabled />,
    },
    {
      label: 'Name',
      component: <Input value={1} disabled />,
    },
    {
      label: 'Image URL',
      component: (
        <a
          href="https://images.asos-media.com/products/selected-homme-smart-trousers-in-slim-tapered-fit-with-elasticated-waist-in-black/24337648-1-black?$n_640w$&wid=513&fit=constrain"
          target="_blank"
          rel="noreferrer"
        >
          https://images.asos-media.com/products/selected-homme-smart-trousers-in-slim-tapered-fit-with-elasticated-waist-in-black/24337648-1-black?$n_640w$&wid=513&fit=constrain
        </a>
      ),
    },
  ];

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
