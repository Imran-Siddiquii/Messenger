import { Suspense, lazy } from 'react';

const Loadable = lazy(() => import('./index'));

const Header = () => (
  <Suspense fallback={<>loading.....</>}>
    <Loadable />
  </Suspense>
);

export default Header;
