import React, { useEffect } from 'react';
import { Input, Typography, Form, Button, message, Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, removeCategory, updateCategory } from '../../features/Categories/CategoriesActions';
import FormWrap from '../../components/FormWrap';
import { useNavigate, useParams } from 'react-router';
import WrappedSpinner from '../../components/WrappedSpinner';
import { STATE_STATUSES } from '../../util/constants';
import { categoryActions } from '../../features/Categories/CategoriesSlice';
import ModelPage from '../../components/ModelPage';

const Category = () => {
  const { category, isLoading, status } = useSelector(({ categories }) => categories);
  const dispatch = useDispatch();
  const { categoryId } = useParams();

  useEffect(() => {
    dispatch(getCategory(categoryId));
  }, [dispatch, categoryId]);

  const formFields = [
    {
      label: 'Id',
      name: 'id',
      component: Input,
      isId: true,
    },
    {
      label: 'Name',
      name: 'name',
      component: Input,
    },
    {
      label: 'Image URL',
      name: 'imgUrl',
      component: Input,
    },
  ];

  return (
    <ModelPage
      model={category}
      isLoading={isLoading}
      status={status}
      deleteAction={removeCategory}
      navUrl="/categories"
      resetStatus={categoryActions.resetStatus}
      editAction={updateCategory}
      title="category"
      modelObject={{
        name: '',
        imgUrl: '',
      }}
      formFieldsArr={formFields}
    />
  );
};

export default Category;
