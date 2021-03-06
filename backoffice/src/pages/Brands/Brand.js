import React, { useEffect } from 'react';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { editBrand, getBrand, removeBrand } from '../../features/Brands/BrandsActions';
import { brandActions } from '../../features/Brands/BrandsSlice';
import ModelPage from '../../components/ModelPage';

const Brand = () => {
  const { brand, isLoading, status } = useSelector(({ brands }) => brands);
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

  return (
    <ModelPage
      model={brand}
      isLoading={isLoading}
      status={status}
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
