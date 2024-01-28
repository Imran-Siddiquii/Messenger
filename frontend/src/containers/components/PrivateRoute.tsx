import React, { ReactNode } from 'react';
import { getToken } from '../../utils';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!getToken()) {
      navigate('/login');
    }
  },[]);

  return <>{children}</>;
};

export default PrivateRoute;
