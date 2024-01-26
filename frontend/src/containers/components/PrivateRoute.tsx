import { ReactNode } from 'react';
import Auth from '../Auth/Loadable';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const value: boolean = false;
  return value ? children : <Auth />;
};

export default PrivateRoute;
