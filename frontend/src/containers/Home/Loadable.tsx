import { Suspense, lazy } from 'react';

const Loadable = lazy(() => import('./index'));

const Home = () => (
  <Suspense fallback={<>loading.....</>}>
    <Loadable />
  </Suspense>
);

export default Home;
