import React, { useEffect } from 'react';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import WrappedSpinner from '../../components/WrappedSpinner';
import { editBrand, getBrand, removeBrand } from '../../features/Brands/BrandsActions';
import { brandActions } from '../../features/Brands/BrandsSlice';
import ModelPage from '../../components/ModelPage';

const Brand = () => {
  const { brand, isLoading, status, message } = useSelector(({ brands }) => brands);
  const { brandId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrand(brandId));
  }, [brandId, dispatch]);

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

  if (isLoading) {
    return <WrappedSpinner />;
  }

  return (
    // <></>
    <ModelPage
      model={brand}
      isLoading={isLoading}
      status={status}
      stateMessage={message}
      deleteAction={removeBrand}
      navUrl="/brands"
      resetStatus={brandActions.resetStatus}
      editAction={editBrand}
      title="brand"
      modelObject={{
        name: '',
        imgUrl: '',
      }}
      formFieldsArr={formFields}
    />
  );
};

export default Brand;
