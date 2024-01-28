import { ReactNode } from 'react';
import { getToken } from '../../utils';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../Auth/slice/selector';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const userToken = useSelector(selectUserToken);

  return userToken || getToken() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
