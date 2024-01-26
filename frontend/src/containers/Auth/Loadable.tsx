import { Suspense, lazy } from 'react';

const Loadable = lazy(() => import('./index'));

const Auth = () => (
  <Suspense fallback={<>loading.....</>}>
    <Loadable />
  </Suspense>
);

export default Auth;
