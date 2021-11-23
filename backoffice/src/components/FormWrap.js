import React from 'react';
import './FormWrap.css';

const FormWrap = ({ children, fullHeight, center }) => {
  return <section className={`form-wrap ${center ? 'form-wrap-center' : ''} ${fullHeight ? 'form-wrap-full-height' : ''}`}>{children}</section>;
};

export default FormWrap;
