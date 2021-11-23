import { Spin } from 'antd';
import React from 'react';
import FormWrap from './FormWrap';

const WrappedSpinner = () => {
  return (
    <FormWrap fullHeight center>
      <Spin />
    </FormWrap>
  );
};

export default WrappedSpinner;
