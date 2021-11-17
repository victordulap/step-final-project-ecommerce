import React from 'react';
import { Navigate } from 'react-router-dom';
import LayoutComponent from '../components/CustomLayout';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const isAuth = useSelector(({ auth }) => auth.token);

  return isAuth ? (
    <LayoutComponent>{children}</LayoutComponent>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
